# Effects

Effects settings manage animation effects for the site. Currently supports sakura effect.

## Sakura Effect

The sakura effect adds falling cherry blossom animation to your site.

### Config File

`src/config/effectsConfig.ts`

### Basic Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enable` | `boolean` | `false` | Enable sakura effect |
| `switchable` | `boolean` | `true` | Allow users to toggle in settings panel |
| `sakuraNum` | `number` | `21` | Number of sakura petals |
| `limitTimes` | `number` | `-1` | Out-of-bounds limit, `-1` for infinite |
| `zIndex` | `number` | `100` | Z-index layer |

### Size

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `size.min` | `number` | `0.5` | Minimum size multiplier |
| `size.max` | `number` | `1.1` | Maximum size multiplier |

### Opacity

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `opacity.min` | `number` | `0.3` | Minimum opacity |
| `opacity.max` | `number` | `0.9` | Maximum opacity |

### Speed

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `speed.horizontal.min` | `number` | `-1.7` | Min horizontal speed |
| `speed.horizontal.max` | `number` | `-1.2` | Max horizontal speed |
| `speed.vertical.min` | `number` | `1.5` | Min vertical speed |
| `speed.vertical.max` | `number` | `2.2` | Max vertical speed |
| `speed.rotation` | `number` | `0.03` | Rotation speed |
| `speed.fadeSpeed` | `number` | `0.03` | Fade speed |

::: warning
`fadeSpeed` should not exceed `opacity.min`, otherwise petals may disappear instantly.
:::

### Full Example

```ts
export const sakuraConfig: SakuraConfig = {
  enable: true,
  switchable: true,
  sakuraNum: 21,
  limitTimes: -1,
  size: { min: 0.5, max: 1.1 },
  opacity: { min: 0.3, max: 0.9 },
  speed: {
    horizontal: { min: -1.7, max: -1.2 },
    vertical: { min: 1.5, max: 2.2 },
    rotation: 0.03,
    fadeSpeed: 0.03,
  },
  zIndex: 100,
};
```
