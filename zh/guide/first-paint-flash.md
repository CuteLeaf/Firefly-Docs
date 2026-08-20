# 首屏闪烁问题诊断指南

> 开发者排查文档：记录"刷新/切换壁纸模式时首屏闪烁"这一类问题的根因、诊断方法与修复模式。

## 问题现象

刷新页面时出现各种瞬时闪烁，常见现象：

- 壁纸先按**横幅尺寸**渲染，闪烁后变成**全屏**
- 水波纹先出现在视口底部，闪烁后回到横幅位置
- 内容区先出现在横幅中间/顶部，闪烁后下移到正确位置
- 导航栏先闪白色（不透明），再变成透明
- 壁纸图片先靠左显示（图片比视口宽），再闪到居中
- 壁纸/水波纹**延迟出现**（页面先显示纯背景，几百 ms 后才弹出壁纸）

这类问题通常发生在**默认壁纸模式（config）与用户运行时模式（localStorage）不一致**时，例如：默认 fullscreen + 用户切到横幅后刷新。

## 根因

SSR 按 **config 的壁纸模式**渲染 HTML，但用户可能通过视图设置面板切换了模式（存储在 `localStorage.wallpaperMode`）。SSR 无法知道运行时模式，导致：

1. **SSR 渲染了 config 模式的布局**：wrapper 尺寸/类、body 类、导航栏 `data-transparent-mode`、内容区定位等，全部按 config 模式输出。
2. **运行时模式通过 head 内联脚本同步设置** `data-wallpaper-mode`（html 属性）——这一步是同步的、早于首帧。
3. **但大量模式相关样式依赖"晚应用的类"**：`wallpaper-fullscreen`、`wallpaper-overlay`、`enable-banner`/`no-banner-layout`（body 类）、`data-transparent-mode`（navbar 属性）等，由 `requestAnimationFrame` 或 `DOMContentLoaded` 才应用，**晚于首帧**。
4. 首帧按错误状态渲染 → 纠正时产生闪烁。

## 诊断方法论

### 第 1 步：确认运行时状态（settled state）

在控制台执行，确认模式、存储值、body 类、wrapper 类是否正确：

```js
console.log("mode:", document.documentElement.getAttribute("data-wallpaper-mode"));
console.log("stored:", localStorage.getItem("wallpaperMode"));
console.log("body:", document.body.className);
console.log("wrapper:", document.getElementById("wallpaper-wrapper")?.className, document.getElementById("wallpaper-wrapper")?.style.display);
```

如果 **settled 状态正确**（mode/stored/body 类都对），说明闪烁是**加载过程的瞬时状态**，需要第 2 步采样。

### 第 2 步：多点时间采样（捕捉瞬时闪烁）

在 head 脚本加采样日志，对比各时间点确定哪个元素何时处于错误状态。

> ⚠️ 生产构建会剥离 `console.log`/`console.debug`，诊断日志必须用 **`console.warn`**（`astro.config.mjs` 的 esbuild `pure` 选项只剥离 log/debug）。

```js
[30, 100, 300, 700, 1500].forEach((t) =>
  setTimeout(() => {
    const w = document.getElementById("wallpaper-wrapper");
    const g = document.getElementById("main-grid");
    console.warn(
      `[wm@${t}]`,
      "mode:", document.documentElement.getAttribute("data-wallpaper-mode"),
      "wrapper:", w ? `${w.style.display}/${w.getBoundingClientRect().height}px/${w.className.match(/wallpaper-\w+/)?.[0] ?? "-"}` : "null",
      "gridT:", g ? getComputedStyle(g).transform : "null",
      "enableBanner:", document.body.classList.contains("enable-banner"),
    );
  }, t),
);
```

**判读要点**：
- `wrapper` 从 `none/0px` 到 `block/66xpx` → 壁纸延迟出现（rAF 早于 wrapper 解析触发，wrapper 处理被跳过）
- `wrapper` 出现 `block/1000px+`（100vh）→ wrapper 短暂全屏
- `gridT` 为 `none` → `#main-grid` 的 `translateY(var(--banner-height-extend))` 未生效（内容定位错误）
- `enableBanner` 为 false → body 类未应用

### 第 3 步：关键时序检查点

| 检查点 | 位置 | 说明 |
|---|---|---|
| head 脚本 | Layout.astro（`<head>` 内 `is:inline`） | 同步设置 `data-wallpaper-mode`。**但脚本在 `<head>` 中，`document.body` 为 null**，不能同步设置 body 类 |
| body 起始脚本 | Layout.astro（`<body>` 后紧跟的 `is:inline`） | body 创建后、内容解析前运行，可同步设置 body 类 |
| applyWallpaperMode rAF | Layout.astro head 脚本内 | wrapper 在 body 内容中（晚于 head 解析），**慢速加载时 rAF 可能早于 wrapper 解析触发，wrapper 处理被跳过**，导致壁纸晚显示 |

### 第 4 步：排除浏览器缓存

首屏闪烁问题极易被缓存干扰。**测试时务必用无痕窗口或 Ctrl+F5**，并确认加载的是最新构建（检查 CSS 文件 hash 或控制台诊断日志是否出现）。

## 修复模式

所有修复的统一思路：**把依赖"晚应用的类"（rAF/DOMContentLoaded）的样式，改为依赖"同步设置的 `data-wallpaper-mode` 属性"（head 脚本解析期同步设置，早于首帧）**。

### 模式 1：`data-wallpaper-mode` 属性 CSS 规则

把类驱动的规则（如 `#wallpaper-wrapper.wallpaper-fullscreen`、`#wallpaper-wrapper.wallpaper-overlay`）镜像为属性规则：

```css
/* fullscreen：wrapper 与图片首帧即全屏居中 */
html[data-wallpaper-mode="fullscreen"] #wallpaper-wrapper {
  position: fixed !important;
  inset: 0 !important;
  height: 100vh !important;
  height: 100lvh !important;
  ...
}
html[data-wallpaper-mode="fullscreen"] #wallpaper-wrapper img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: center !important;
}
/* overlay：同理 */
html[data-wallpaper-mode="overlay"] #wallpaper-wrapper { ... }
```

**注意作用域**：桌面与移动端差异（如移动端横幅 wrapper 是 `top:0; transform:none`，桌面才有 `translateY(extend)` 补偿），属性规则要用 `@media(min-width:641px)` 等限定。

### 模式 2：body 起始脚本

head 脚本中 `document.body` 为 null，body 类必须在 `<body>` 后紧跟的同步脚本中设置：

```html
<body ...>
  <script is:inline>
    (function () {
      const wm = document.documentElement.getAttribute("data-wallpaper-mode");
      if (!wm) return;
      const banner = wm === "banner";
      document.body.classList.toggle("enable-banner", banner);
      document.body.classList.toggle("no-banner-layout", !banner);
      document.body.classList.toggle("wallpaper-transparent", wm === "overlay" || wm === "fullscreen");
    })();
  </script>
```

### 模式 3：初始化期间禁用过渡

`transition` 会把加载期的尺寸/位置变化变成动画（放大闪烁感）。用 `data-layout-init` 属性在初始化期间禁用关键元素过渡：

```css
html[data-layout-init] #main-grid,
html[data-layout-init] #wallpaper-wrapper {
  transition: none !important;
}
```

head 脚本设置 `data-layout-init`，`window load` 后移除（用 `window.__fireflyLayoutTransitionGuard` 保证 swup 切页重跑脚本时不重复设置）。

### 模式 4：组件内首帧修正

navbar 等组件的 SSR 属性（如 `data-transparent-mode`）按 config 设置，运行时模式不同会导致首帧错误。在组件内加同步脚本，按运行时 `data-wallpaper-mode` 首帧修正：

```html
<div id="navbar" ...>
  <script is:inline define:vars={{ bannerTMode: ..., bannerBlur: ..., fsDynamic: ... }}>
    (function () {
      const wm = document.documentElement.getAttribute("data-wallpaper-mode");
      const navbar = document.getElementById("navbar");
      if (!wm || !navbar) return;
      // 按运行时模式计算 data-transparent-mode 与 blur，首帧设置
      navbar.setAttribute("data-transparent-mode", mode);
      navbar.style.setProperty("--navbar-glass-blur", `${blur}px`);
    })();
  </script>
```

## 排查清单

1. **确认运行时模式正确**（`stored`/`mode`）——如果 stored 不是预期值，先排查设置面板的存储逻辑
2. **确认 body 类正确**（body 起始脚本是否生效）
3. **多点采样**确定错误状态出现的时机
4. **检查是否有类依赖 rAF/DOMContentLoaded 晚应用**（`wallpaper-fullscreen`/`wallpaper-overlay`/`enable-banner`/`data-transparent-mode`）
5. 用 `data-wallpaper-mode` **属性规则**镜像，让样式首帧生效
6. **注意移动端/桌面端差异**（媒体查询作用域）
7. **无痕测试排除缓存**，确认加载的是最新构建

## 已修复场景（2025-08）

- 默认 fullscreen + 存储 banner → 刷新：壁纸/水波纹/内容区闪烁
- 默认 banner + 存储 fullscreen → 刷新
- 默认 overlay + 存储 banner → 刷新
- overlay/fullscreen 壁纸首帧尺寸、全屏图片居中（移动端靠左→居中位移）
- 导航栏刷新时先闪白色再变透明
- 壁纸/水波纹延迟出现（rAF 早于 wrapper 解析）
