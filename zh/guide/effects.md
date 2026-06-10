# 特效设置

特效设置用于管理站点的动画特效，目前支持樱花特效。

## 樱花特效

樱花特效为站点添加飘落的樱花动画效果。

### 配置文件

`src/config/effectsConfig.ts`

### 基础配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `enable` | `boolean` | `false` | 是否启用樱花特效 |
| `switchable` | `boolean` | `true` | 是否允许用户在设置面板中切换 |
| `sakuraNum` | `number` | `21` | 樱花数量 |
| `limitTimes` | `number` | `-1` | 越界限制次数，`-1` 为无限循环 |
| `zIndex` | `number` | `100` | 层级 |

### 尺寸配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `size.min` | `number` | `0.5` | 最小尺寸倍数 |
| `size.max` | `number` | `1.1` | 最大尺寸倍数 |

### 不透明度

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `opacity.min` | `number` | `0.3` | 最小不透明度 |
| `opacity.max` | `number` | `0.9` | 最大不透明度 |

### 移动速度

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `speed.horizontal.min` | `number` | `-1.7` | 水平最小速度 |
| `speed.horizontal.max` | `number` | `-1.2` | 水平最大速度 |
| `speed.vertical.min` | `number` | `1.5` | 垂直最小速度 |
| `speed.vertical.max` | `number` | `2.2` | 垂直最大速度 |
| `speed.rotation` | `number` | `0.03` | 旋转速度 |
| `speed.fadeSpeed` | `number` | `0.03` | 消失速度 |

::: warning
`fadeSpeed` 不应大于 `opacity.min`，否则樱花可能会立即消失。
:::

### 完整示例

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
