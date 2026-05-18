# Live2D / Spine 模型

Firefly 支持在页面上显示 Live2D 或 Spine 看板娘模型，两者可以二选一使用。

## 配置文件

`src/config/pioConfig.ts`

## Spine 模型配置

### 基础配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `enable` | `boolean` | `false` | 是否启用 Spine 看板娘 |

### 模型配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `model.path` | `string` | - | Spine 模型文件路径（.json） |
| `model.scale` | `number` | `1.0` | 模型缩放比例 |
| `model.x` | `number` | `0` | X 轴偏移 |
| `model.y` | `number` | `0` | Y 轴偏移 |

### 位置配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `position.corner` | `string` | `"bottom-left"` | 显示位置：`"bottom-left"` `"bottom-right"` `"top-left"` `"top-right"` |
| `position.offsetX` | `number` | `0` | 水平偏移量 |
| `position.offsetY` | `number` | `0` | 垂直偏移量 |

### 尺寸配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `size.width` | `number` | `135` | 容器宽度 |
| `size.height` | `number` | `165` | 容器高度 |

### 交互配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `interactive.enabled` | `boolean` | `true` | 是否启用交互功能 |
| `interactive.clickAnimations` | `string[]` | - | 点击时随机播放的动画列表 |
| `interactive.clickMessages` | `string[]` | - | 点击时随机显示的文字消息 |
| `interactive.messageDisplayTime` | `number` | `3000` | 文字显示时间（毫秒） |
| `interactive.idleAnimations` | `string[]` | - | 待机动画列表 |
| `interactive.idleInterval` | `number` | `8000` | 待机动画切换间隔（毫秒） |

### 响应式配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `responsive.hideOnMobile` | `boolean` | `true` | 是否在移动端隐藏 |
| `responsive.mobileBreakpoint` | `number` | `768` | 移动端断点（px） |

### 其他

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `zIndex` | `number` | `1000` | 层级 |
| `opacity` | `number` | `1.0` | 透明度（0-1） |

## Live2D 模型配置

Live2D 使用 [l2d-widget](https://github.com/hacxy/l2d-widget) 组件实现，支持 Cubism 2 和 Cubism 6 格式。

### 基础配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `enable` | `boolean` | `false` | 是否启用 Live2D 看板娘 |

### 模型配置

| 属性 | 类型 | 说明 |
|------|------|------|
| `model.path` | `string` | Live2D 模型文件路径（model.json 或 model3.json） |

支持传入数组配置多个模型，菜单会自动出现切换按钮：

```ts
model: [
  { path: "/models/cat-black/model.json" },
  { path: "/models/cat-white/model.json" },
]
```

### 位置配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `position` | `string` | `"bottom-left"` | 显示位置：`"bottom-left"` `"bottom-right"` |

### 尺寸配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `size` | `number \| { width, height }` | `300` | 画布尺寸（px），可传数字或对象分别指定宽高 |

### 主题色

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `primaryColor` | `string` | `"rgba(96,165,250,0.9)"` | 主题色，用于菜单、状态条等 UI 元素。支持 CSS 变量如 `"var(--primary)"` |

### 动画配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `transitionDuration` | `number` | `1500` | 入场/退场动画时长（ms） |
| `transitionType` | `"slide" \| "fade"` | `"slide"` | 入场/退场动画类型 |

### 菜单配置

| 属性 | 类型 | 说明 |
|------|------|------|
| `menus.items` | `MenuItem[]` | 完全替换默认菜单项 |
| `menus.extraItems` | `MenuItem[]` | 追加到默认菜单末尾 |
| `menus.align` | `"left" \| "right"` | 菜单对齐方式 |

`MenuItem` 结构：

| 属性 | 类型 | 说明 |
|------|------|------|
| `icon` | `string` | Iconify 图标名称，如 `"mdi:home"` |
| `label` | `string` | 菜单项文本 |
| `action` | `string` | 动作标识，支持：`"home"` `"scrollToTop"` `"sleep"` `"github"` |

### 提示气泡配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `tips.welcomeMessage` | `string[]` | - | 欢迎语，模型首次入场后随机取一条显示 |
| `tips.messages` | `string[]` | - | 循环提示内容 |
| `tips.duration` | `number` | `3000` | 每条提示展示时长（ms） |
| `tips.interval` | `number` | `5000` | 提示循环间隔（ms） |

### 响应式配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `responsive.hideOnMobile` | `boolean` | `true` | 是否在移动端隐藏 |
| `responsive.mobileBreakpoint` | `number` | `768` | 移动端断点（px） |

## Spine 完整示例

```ts
export const spineModelConfig: SpineModelConfig = {
  enable: true,
  model: {
    path: "/pio/models/spine/firefly/1310.json",
    scale: 1.0,
    x: 0,
    y: 0,
  },
  position: {
    corner: "bottom-left",
    offsetX: 0,
    offsetY: 0,
  },
  size: { width: 135, height: 165 },
  interactive: {
    enabled: true,
    clickAnimations: ["emoji_0", "emoji_1", "emoji_2"],
    clickMessages: ["你好呀！", "今天也要加油哦！"],
    messageDisplayTime: 3000,
    idleAnimations: ["idle", "emoji_0"],
    idleInterval: 8000,
  },
  responsive: { hideOnMobile: true, mobileBreakpoint: 768 },
  zIndex: 1000,
  opacity: 1.0,
};
```

## Live2D 完整示例

```ts
export const live2dWidgetConfig = {
  enable: true,
  model: {
    path: "/pio/models/live2d/snow_miku/model.json",
  },
  position: "bottom-left",
  size: { width: 200, height: 200 },
  primaryColor: "var(--primary)",
  transitionDuration: 1500,
  transitionType: "slide",
  menus: {
    items: [
      { icon: "mdi:home", label: "返回主页", action: "home" },
      { icon: "mdi:arrow-up", label: "返回顶部", action: "scrollToTop" },
      { icon: "mdi:sleep", label: "休眠", action: "sleep" },
      { icon: "mdi:github", label: "GitHub", action: "github" },
    ],
    align: "right",
  },
  tips: {
    welcomeMessage: ["你好！我是Miku~", "欢迎来到我的世界！"],
    messages: ["有什么需要帮助的吗？", "今天天气真不错呢！"],
    duration: 3000,
    interval: 6000,
  },
  responsive: { hideOnMobile: true, mobileBreakpoint: 768 },
};
```

::: warning
在右下角放置模型可能会遮挡返回顶部按钮，建议使用 `"bottom-left"` 位置。
:::
