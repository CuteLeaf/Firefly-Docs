# 背景壁纸

背景壁纸配置控制站点的背景图片显示模式和相关效果。

## 配置文件

`src/config/backgroundWallpaper.ts`

## 壁纸模式

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `mode` | `string` | `"banner"` | 壁纸模式：`"banner"` 横幅、`"fullscreen"` 全屏、`"overlay"` 全屏透明、`"none"` 纯色背景 |
| `switchable` | `boolean` | `true` | 是否允许用户通过导航栏切换壁纸模式 |

::: tip
设为 `false` 可提升性能（只渲染当前模式）。推荐只选择自己喜欢的模式并关闭切换功能。
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
| `common.homeText.switchable` | `boolean` | `true` | 是否允许用户通过控制面板切换显示 |
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

### 导航栏透明模式

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `common.navbar.transparentMode` | `string` | `"semi"` | 透明模式：`"semi"` 半透明、`"full"` 完全透明、`"semifull"` 动态透明 |
| `common.navbar.enableBlur` | `boolean` | `true` | 是否开启毛玻璃模糊效果 |
| `common.navbar.blur` | `number` | `5` | 毛玻璃模糊度 |

### 水波纹动画

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `common.waves.enable` | `boolean \| { desktop, mobile }` | `{ desktop: true, mobile: true }` | 是否启用水波纹动画 |
| `common.waves.switchable` | `boolean` | `true` | 是否允许用户通过控制面板切换 |

::: warning
水波纹动画会影响页面性能，请根据需要开启。
:::

### 渐变过渡

当水波纹关闭时自动启用，在壁纸底部提供到背景色的平滑渐变过渡效果。

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `common.gradient.enable` | `boolean \| { desktop, mobile }` | `{ desktop: true, mobile: true }` | 是否启用渐变过渡 |
| `common.gradient.height` | `string` | `"15vh"` | 渐变高度 |
| `common.gradient.switchable` | `boolean` | `true` | 是否允许用户通过控制面板切换 |

::: info
渐变过渡与水波纹互斥：水波纹开启时渐变自动隐藏，水波纹关闭时渐变自动显示。两者都可通过控制面板独立切换。
:::

## Banner 模式配置

### 图片位置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `banner.position` | `string` | `"0% 20%"` | CSS `object-position` 值。支持 `'center'`、`'top'`、`'bottom'`、`'left'`、`'right'`、百分比等 |

### 横幅图片轮播

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `banner.carousel.enable` | `boolean` | `false` | 是否启用横幅图片轮播；关闭时保持每次刷新随机显示一张 |
| `banner.carousel.interval` | `number` | `5000` | 轮播切换间隔（毫秒） |
| `banner.carousel.switchable` | `boolean` | `false` | 是否允许用户通过控制面板切换横幅轮播 |

::: tip
横幅轮播仅在 `src.desktop` 或 `src.mobile` 配置多张图片时生效。

开启轮播时，为了图片之间的切换自然，图片会在下一张加载完成后当前图片才会消失，过渡时可能有重影。如果觉得效果不理想，可以关闭轮播保持每次刷新随机显示。
:::

## Fullscreen 模式配置

全屏壁纸模式将背景图片铺满整个屏幕。

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `fullscreen.position` | `string` | `"center"` | CSS `object-position` 值 |

## Overlay 模式配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `overlay.switchable` | `boolean \| { opacity, blur, cardOpacity }` | - | 是否允许访客在显示设置面板中调整透明模式参数。支持总开关或分项开关 |
| `overlay.zIndex` | `number` | `-1` | 层级，确保壁纸在背景层 |
| `overlay.opacity` | `number` | `0.8` | 壁纸透明度（0-1） |
| `overlay.blur` | `number` | `10` | 背景模糊度（px） |
| `overlay.cardOpacity` | `number` | `0.5` | 卡片背景透明度（0-1），值越小卡片越透明 |

`overlay.switchable` 支持两种写法：

```ts
overlay: {
  // 方式1：整体开关，控制所有透明设置项
  switchable: true,

  // 方式2：分项开关，分别控制每个设置项
  // switchable: {
  //   opacity: true,
  //   blur: true,
  //   cardOpacity: true,
  // },
}
```
