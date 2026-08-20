# 背景壁纸

背景壁纸配置控制站点的背景图片显示模式和相关效果。

## 配置文件

`src/config/backgroundWallpaper.ts`

## 壁纸模式

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `mode` | `string` | `"banner"` | 壁纸模式：`"banner"` 横幅、`"fullscreen"` 全屏、`"overlay"` 覆盖透明、`"none"` 纯色背景 |

::: tip
壁纸模式的切换开关已移至 `displaySettingsConfig.wallpaperModeSwitchable`，详见 [显示设置面板](./site.md#显示设置面板)。
:::

## 图片配置

`src` 属性支持多种格式：

### 分别设置桌面端和移动端

```ts
src: {
  desktop: "assets/images/DesktopWallpaper/d1.avif",
  mobile: "assets/images/MobileWallpaper/m1.avif",
},
```

### 多张图片随机显示

```ts
src: {
  desktop: [
    "assets/images/DesktopWallpaper/d1.avif",
    "assets/images/DesktopWallpaper/d2.avif",
    "assets/images/DesktopWallpaper/d3.avif",
  ],
  mobile: [
    "assets/images/MobileWallpaper/m1.avif",
    "assets/images/MobileWallpaper/m2.avif",
    "assets/images/MobileWallpaper/m3.avif",
  ],
},
```

### 使用随机图 API

```ts
src: {
  desktop: "https://t.alcy.cc/pc",
  mobile: "https://t.alcy.cc/mp",
},
```

::: tip
图片路径支持三种格式：
1. **public 目录**（以 `/` 开头）：不会被优化
2. **src 目录**（不以 `/` 开头）：自动优化（推荐）
3. **远程 URL**：不会被优化，请确保图片体积足够小

建议不要替换 `d1-d6`、`m1-m6` 这些默认示例图片的名称。使用自己的图片时请命名为其他名称，避免以后更新时被覆盖。
:::

## 背景视频播放器

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `playerEnable` | `boolean` | `false` | 是否启用背景视频播放，启用后导航栏会显示播放按钮 |
| `src.playerUrl` | `string \| string[]` | - | 视频地址，支持单个视频路径或数组（多视频列表循环） |
| `common.playerMode` | `"order" \| "random"` | `"order"` | 多视频播放模式：`"order"` 顺序循环，`"random"` 随机切换 |

```ts
export const backgroundWallpaper = {
  playerEnable: true,
  src: {
    desktop: [...],
    mobile: [...],
    // 单个视频
    // playerUrl: "/assets/videos/firefly.mp4",
    // 多个视频
    playerUrl: [
      "/assets/videos/video1.mp4",
      "/assets/videos/video2.mp4",
    ],
  },
  common: {
    playerMode: "random",
  },
};
```

::: tip
- 本地视频请放在 `public/assets/videos/` 目录下
- 纯色背景模式（`mode: "none"`）下播放按钮会自动隐藏
- 多视频模式下，如果某个视频加载失败会自动尝试播放下一个，全部失败时会显示加载失败提示
:::

## 通用配置（Banner 和 Fullscreen 共享）

`common` 下的配置在横幅壁纸和全屏壁纸模式下共享。

### 文字遮罩暗度

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `common.dimOpacity` | `number` | `0.2` | 横幅文字遮罩暗度，0-1 之间，值越大越暗 |

### 首页横幅文字

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `common.homeText.enable` | `boolean` | `true` | 是否启用横幅文字 |
| `common.homeText.title` | `string` | `"Lovely firefly!"` | 主标题 |
| `common.homeText.titleSize` | `string` | `"3.8rem"` | 主标题字体大小 |
| `common.homeText.subtitle` | `string \| string[]` | - | 副标题，支持单个或多个 |
| `common.homeText.subtitleSize` | `string` | `"1.5rem"` | 副标题字体大小 |

### 打字机效果

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `common.homeText.typewriter.enable` | `boolean` | `true` | 是否启用打字机效果 |
| `common.homeText.typewriter.speed` | `number` | `100` | 打字速度（毫秒） |
| `common.homeText.typewriter.deleteSpeed` | `number` | `50` | 删除速度（毫秒） |
| `common.homeText.typewriter.pauseTime` | `number` | `2000` | 完全显示后的暂停时间（毫秒） |

::: info
- 打字机**开启** → 循环显示所有副标题
- 打字机**关闭** → 每次刷新随机显示一条副标题
:::

### 标题下方的链接图标

在首页横幅标题下方显示一排可自定义的链接图标（半透明圆按钮）。

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `common.homeText.linksEnable` | `boolean` | `true` | 是否显示标题下方的链接图标 |
| `common.homeText.links` | `{ name; url; icon; showName? }[]` | - | 链接图标列表，为空则不显示 |

- `name`：链接名称（用于 `aria-label` / `title` / 可选 `showName` 显示）
- `url`：链接地址（`http(s)://` 外链自动新窗口打开）
- `icon`：Iconify 图标，如 `fa7-brands:github`、`fa7-solid:envelope`、`fa7-solid:rss`、`mdi:rss` 等
- `showName`：可选，`true` 时在图标旁显示文字

```ts
homeText: {
  ...
  links: [
    { name: "GitHub", icon: "fa7-brands:github", url: "https://github.com/CuteLeaf" },
    { name: "Email", icon: "fa7-solid:envelope", url: "mailto:xiaye@msn.com" },
    { name: "RSS", icon: "fa7-solid:rss", url: "/rss/" },
    // 可选显示文字
    { name: "Blog", icon: "mdi:rss", url: "/rss/", showName: true },
  ],
},
```

### 壁纸轮播

横幅壁纸和全屏壁纸共享的轮播配置，仅在配置多张图片时生效。

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `common.carousel.enable` | `boolean` | `false` | 是否启用壁纸轮播；关闭时保持每次刷新随机显示一张 |
| `common.carousel.interval` | `number` | `5000` | 轮播切换间隔（毫秒） |
| `common.carousel.transitionEffect` | `string` | `"fade"` | 过渡效果：`"fade"` 渐变、`"zoom"` 缩放、`"slide"` 滑动、`"kenburns"` 旋转木马 |

```ts
common: {
  carousel: {
    enable: true,
    interval: 5000,
    transitionEffect: "kenburns", // "fade" | "zoom" | "slide" | "kenburns"
  },
},
```

::: tip
壁纸轮播的用户切换开关已移至 `displaySettingsConfig.bannerCarouselSwitchable`，详见 [显示设置面板](./site.md#显示设置面板)。
:::

**过渡效果说明：**

| 效果 | 说明 |
|------|------|
| `fade` | 交叉渐变，两张图片淡入淡出过渡 |
| `zoom` | 缩放切换，新图从小到大出现 |
| `slide` | 滑动切换，新图从右侧滑入 |
| `kenburns` | 旋转木马（推荐），图片缓慢放大的同时通过 LQIP 模糊预览桥接切换，效果最自然 |

## Banner 模式配置

### 图片位置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `banner.position` | `string` | `"0% 20%"` | CSS `object-position` 值。支持 `'center'`、`'top'`、`'bottom'`、`'left'`、`'right'`、百分比等 |

### 文章横幅信息

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `banner.postInfo.mode` | `"description" \| "meta"` | `"description"` | 文章详情页横幅信息模式：`"description"` 显示文章描述，`"meta"` 显示发布日期、更新日期、字数和阅读时长 |

### 导航栏透明模式

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `banner.navbar.transparentMode` | `string` | `"semi"` | 透明模式：`"semi"` 半透明、`"full"` 完全透明、`"semifull"` 动态透明 |
| `banner.navbar.blur` | `number` | `5` | 毛玻璃模糊度，`0` 即关闭导航栏毛玻璃 |

::: info
导航栏的子菜单与浮动面板（搜索、显示设置、亮暗色、音乐、移动端菜单）始终保留毛玻璃，模糊度跟随 `banner.navbar.blur`，但有 `2px` 的最小值。

所以把 `blur` 设为 `0` 只会关闭导航栏自身的毛玻璃，面板不受影响；纯色背景模式（`mode: "none"`）下面板保持不透明。

全屏壁纸模式的导航栏不受此配置影响（由 `fullscreen.navbar.dynamicTransparent` 单独控制，见下文）。
:::

### 水波纹动画

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `banner.waves.enable` | `boolean \| { desktop, mobile }` | `{ desktop: true, mobile: true }` | 是否启用水波纹动画 |

::: warning
水波纹动画会影响页面性能，请根据需要开启。
:::

::: tip
水波纹的用户切换开关已移至 `displaySettingsConfig.wavesSwitchable`，详见 [显示设置面板](./site.md#显示设置面板)。
:::

### 渐变过渡

当水波纹关闭时自动启用，在壁纸底部提供到背景色的平滑渐变过渡效果。

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `banner.gradient.enable` | `boolean \| { desktop, mobile }` | `{ desktop: true, mobile: true }` | 是否启用渐变过渡 |
| `banner.gradient.height` | `string` | `"15vh"` | 渐变高度 |

::: info
渐变过渡与水波纹互斥：水波纹开启时渐变自动隐藏，水波纹关闭时渐变自动显示。两者的用户切换开关已移至 `displaySettingsConfig`，详见 [显示设置面板](./site.md#显示设置面板)。
:::

## Fullscreen 模式配置

全屏壁纸模式将背景图片**固定**铺满整个屏幕：

- **首页**：首屏只显示壁纸与居中的首页标题，内容区位于首屏之下；下滑时内容区从底部滑上来覆盖壁纸，标题随滚动平滑上移并渐变消失，壁纸从首屏的清晰逐渐过渡到模糊
- **其他页面**：与覆盖透明模式一致——壁纸固定模糊显示，内容在最上方
- 壁纸**不透明**（背景透明度 `overlay.opacity` 不适用），模糊度（`blur`）、卡片透明度（`cardOpacity`）、层级（`zIndex`）均复用下方 `overlay` 模式的配置
- 不显示水波纹与渐变过渡

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `fullscreen.position` | `string` | `"center"` | CSS `object-position` 值 |
| `fullscreen.navbar.dynamicTransparent` | `boolean` | `true` | 是否开启动态透明导航栏：开启后**首页顶部**导航栏透明，下滑后变不透明（仅首页生效） |

```ts
fullscreen: {
  position: "center",
  navbar: {
    dynamicTransparent: true,
  },
},
```

::: info
全屏壁纸模式下导航栏默认完全透明（透明度由 `overlay.cardOpacity` 控制）。开启 `fullscreen.navbar.dynamicTransparent` 后，首页顶部导航栏变为透明、下滑后显示卡片底色。
:::

## Overlay 模式配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `overlay.zIndex` | `number` | `-1` | 层级，确保壁纸在背景层 |
| `overlay.opacity` | `number` | `0.8` | 壁纸透明度（0-1） |
| `overlay.blur` | `number` | `10` | 背景模糊度（px） |
| `overlay.cardOpacity` | `number` | `0.5` | 卡片背景透明度（0-1），值越小卡片越透明 |

::: tip
透明模式参数的用户调节开关已移至 `displaySettingsConfig.overlaySwitchable`，支持总开关或分项开关，详见 [显示设置面板](./site.md#显示设置面板)。
:::
