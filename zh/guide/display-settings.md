# 显示设置面板

显示设置面板是导航栏中的齿轮图标打开的设置面板，允许访客自定义主题色、壁纸模式、卡片样式等。

## 配置文件

`src/config/displaySettingsConfig.ts`

所有开关配置集中管理，方便统一控制哪些设置项对用户可见。

## 外观设置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `themeColorSwitchable` | `boolean` | `true` | 主题色选择器开关 |
| `layoutSwitchable` | `boolean` | `true` | 文章列表布局切换开关 |
| `cardBorderSwitchable` | `boolean` | `true` | 卡片边框和阴影开关 |
| `cardFollowThemeSwitchable` | `boolean` | `true` | 卡片风格跟随主题色开关 |

## 壁纸设置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `wallpaperModeSwitchable` | `boolean` | `true` | 壁纸模式切换开关（横幅/全屏/透明/无） |
| `wavesSwitchable` | `boolean` | `true` | 水波纹动画开关 |
| `gradientSwitchable` | `boolean` | `true` | 渐变过渡效果开关 |
| `bannerTitleSwitchable` | `boolean` | `true` | 横幅标题显示开关（需同时启用 `homeText.enable`） |
| `bannerCarouselSwitchable` | `boolean` | `true` | 壁纸轮播开关 |
| `overlaySwitchable` | `boolean \| object` | `{ opacity: true, blur: true, cardOpacity: true }` | 全屏透明模式参数调节开关，支持总开关或分项开关 |

`overlaySwitchable` 支持两种写法：

```ts
// 方式1：总开关，控制所有透明设置项
overlaySwitchable: true,

// 方式2：分项开关，分别控制每个设置项
overlaySwitchable: {
  opacity: true,
  blur: true,
  cardOpacity: true,
},
```

## 特效设置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `sakuraSwitchable` | `boolean` | `true` | 樱花特效开关 |

## 面板结构

设置面板使用 Tab 分页布局，包含三个标签页：

- **外观**：主题色、布局切换、卡片样式
- **壁纸**：壁纸模式、叠加设置、横幅设置
- **特效**：樱花特效

当某个标签页没有可见的设置项时，该标签页会自动隐藏。如果只有一个标签页有内容，Tab 栏会隐藏。

## 完整示例

```ts
export const displaySettingsConfig: DisplaySettingsConfig = {
  // 外观
  themeColorSwitchable: true,
  layoutSwitchable: true,
  cardBorderSwitchable: true,
  cardFollowThemeSwitchable: true,

  // 壁纸
  wallpaperModeSwitchable: true,
  wavesSwitchable: true,
  gradientSwitchable: true,
  bannerTitleSwitchable: true,
  bannerCarouselSwitchable: true,
  overlaySwitchable: {
    opacity: true,
    blur: true,
    cardOpacity: true,
  },

  // 特效
  sakuraSwitchable: true,
};
```

::: tip
设为 `false` 可隐藏对应的设置项，简化面板界面。
:::
