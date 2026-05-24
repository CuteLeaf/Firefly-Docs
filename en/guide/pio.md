# Live2D / Spine Model

Firefly supports displaying Live2D or Spine mascot models on the page. Choose one of the two.

## Config File

`src/config/pioConfig.ts`

## Spine Model

### Basic

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enable` | `boolean` | `false` | Enable Spine mascot |

### Model

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `model.path` | `string` | - | Spine model file path (.json) |
| `model.scale` | `number` | `1.0` | Scale |
| `model.x` | `number` | `0` | X offset |
| `model.y` | `number` | `0` | Y offset |

### Position

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `position.corner` | `string` | `"bottom-left"` | Position: `"bottom-left"` `"bottom-right"` `"top-left"` `"top-right"` |
| `position.offsetX` | `number` | `0` | Horizontal offset |
| `position.offsetY` | `number` | `0` | Vertical offset |

### Size

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `size.width` | `number` | `135` | Container width |
| `size.height` | `number` | `165` | Container height |

### Interaction

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `interactive.enabled` | `boolean` | `true` | Enable interaction |
| `interactive.clickAnimations` | `string[]` | - | Click animations |
| `interactive.clickMessages` | `string[]` | - | Click messages |
| `interactive.messageDisplayTime` | `number` | `3000` | Message display time (ms) |
| `interactive.idleAnimations` | `string[]` | - | Idle animations |
| `interactive.idleInterval` | `number` | `8000` | Idle animation interval (ms) |

### Responsive

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `responsive.hideOnMobile` | `boolean` | `true` | Hide on mobile |
| `responsive.mobileBreakpoint` | `number` | `768` | Mobile breakpoint (px) |

### Other

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `zIndex` | `number` | `1000` | Z-index |
| `opacity` | `number` | `1.0` | Opacity (0-1) |

## Live2D Model

Live2D is implemented using [l2d-widget](https://github.com/hacxy/l2d-widget), supporting both Cubism 2 and Cubism 6 formats.

### Basic

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enable` | `boolean` | `false` | Enable Live2D mascot |

### Model

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `model.path` | `string` | - | Live2D model file path (model.json or model3.json), supports external URLs |
| `model.volume` | `number` | `0` | Action sound volume (0-1), default 0 (muted) |
| `model.scale` | `number` | `1` | Model scale ratio |
| `model.x` | `number` | `0` | X axis offset, range -2~2, positive = right |
| `model.y` | `number` | `0` | Y axis offset, range -2~2, positive = up |

Supports passing an array for multiple models with automatic switch button in menu:

```ts
model: [
  { path: "/models/cat-black/model.json" },
  { path: "/models/cat-white/model.json" },
]
```

### Position

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `position` | `string` | `"bottom-left"` | Position: `"bottom-left"` `"bottom-right"` |

### Size

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `size` | `number \| { width, height }` | `300` | Canvas size (px), number or object |

### Theme Color

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `primaryColor` | `string` | `"rgba(96,165,250,0.9)"` | Theme color for menu, status bar, etc. Supports CSS variables like `"var(--primary)"` |

### Animation

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `transitionDuration` | `number` | `1500` | Enter/exit animation duration (ms) |
| `transitionType` | `"slide" \| "fade"` | `"slide"` | Enter/exit animation type |

### Menu

| Property | Type | Description |
|----------|------|-------------|
| `menus.items` | `MenuItem[]` | Completely replace default menu items |
| `menus.extraItems` | `MenuItem[]` | Append to default menu |
| `menus.align` | `"left" \| "right"` | Menu alignment |

`MenuItem` structure:

| Property | Type | Description |
|----------|------|-------------|
| `icon` | `string` | Iconify icon name, e.g. `"mdi:home"` |
| `label` | `string` | Menu item text |
| `action` | `string` | Action identifier: `"home"` `"scrollToTop"` `"sleep"` `"switchModel"` `"github"` |

### Tips

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `tips.enable` | `boolean` | `true` | Enable tips, set `false` to completely disable |
| `tips.welcomeMessage` | `string[]` | - | Welcome messages, shown randomly on first load |
| `tips.messages` | `string[]` | - | Loop tip messages |
| `tips.duration` | `number` | `3000` | Tip display duration (ms) |
| `tips.interval` | `number` | `5000` | Tip loop interval (ms) |
| `tips.offset.x` | `number` | `0` | Horizontal offset (px), positive = right |
| `tips.offset.y` | `number` | `0` | Vertical offset (px), positive = down |

### Responsive

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `responsive.hideOnMobile` | `boolean` | `true` | Hide on mobile |
| `responsive.mobileBreakpoint` | `number` | `768` | Mobile breakpoint (px) |

## Spine Full Example

```ts
export const spineModelConfig: SpineModelConfig = {
  enable: true,
  model: {
    path: "/pio/models/spine/firefly/1310.json",
    scale: 1.0,
    x: 0,
    y: 0,
  },
  position: { corner: "bottom-left", offsetX: 0, offsetY: 0 },
  size: { width: 135, height: 165 },
  interactive: {
    enabled: true,
    clickAnimations: ["emoji_0", "emoji_1", "emoji_2"],
    clickMessages: ["Hello!", "Have a nice day!"],
    messageDisplayTime: 3000,
    idleAnimations: ["idle", "emoji_0"],
    idleInterval: 8000,
  },
  responsive: { hideOnMobile: true, mobileBreakpoint: 768 },
  zIndex: 1000,
  opacity: 1.0,
};
```

## Live2D Full Example

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
      { icon: "mdi:home", label: "Home", action: "home" },
      { icon: "mdi:arrow-up", label: "Top", action: "scrollToTop" },
      { icon: "mdi:sleep", label: "Sleep", action: "sleep" },
      { icon: "mdi:github", label: "GitHub", action: "github" },
    ],
    align: "right",
  },
  tips: {
    welcomeMessage: ["Hello! I'm Miku~", "Welcome to my world!"],
    messages: ["Need help?", "Nice weather today!", "Want to play a game?"],
    duration: 3000,
    interval: 6000,
  },
  responsive: { hideOnMobile: true, mobileBreakpoint: 768 },
};
```

::: warning
Placing the model in the bottom-right corner may block the back-to-top button. Consider using `"bottom-left"`.
:::
