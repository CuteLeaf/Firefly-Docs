# 显示设置面板

显示设置面板是导航栏中的齿轮图标打开的设置面板，允许访客自定义主题色、壁纸模式、卡片样式等。

::: warning 默认关闭
该面板默认关闭，需要通过 `enable` 或环境变量 `PUBLIC_DISPLAY_SETTINGS` 开启，详见[总开关](#总开关)。
:::

## 配置文件

`src/config/displaySettingsConfig.ts`

所有开关配置集中管理，方便统一控制哪些设置项对用户可见。

## 总开关

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `enable` | `boolean` | `false` | 视图设置面板总开关 |

面板**默认关闭**。关闭时导航栏不显示齿轮入口，页面完全不渲染面板、也不会加载面板组件的 JS，下方所有设置项一律视为 `false`（壁纸模式等直接使用 `backgroundWallpaper` 里配置的默认值）。

### 用环境变量开启

除了修改配置文件，也可以在部署平台（Vercel / Cloudflare / EdgeOne 等）的构建环境变量里设置，**无需改动任何代码**：

```bash
PUBLIC_DISPLAY_SETTINGS=true
```

- 环境变量优先级高于配置文件里的 `enable`；未设置或取值无法识别时，才使用配置文件的值
- 开启取值：`true` `1` `on` `yes` `enable` `enabled`
- 关闭取值：`false` `0` `off` `no` `disable` `disabled`
- 变量名**必须带 `PUBLIC_` 前缀**，这是 Astro 把变量注入浏览器端代码的要求，去掉前缀面板的客户端逻辑会读不到值

::: tip
适合这样用：生产环境保持关闭以获得最小体积，需要临时预览或调试面板效果时，在平台上加一个环境变量重新部署即可，改完再删掉。
:::

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
| `wallpaperModeSwitchable` | `boolean` | `false` | 壁纸模式切换开关（横幅/全屏/透明/无），开启会显著增大构建体积 |
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
export const displaySettingsConfig: DisplaySettingsConfig =
  resolveDisplaySettingsConfig({
    // 总开关（可被环境变量 PUBLIC_DISPLAY_SETTINGS 覆盖）
    enable: false,

    // 外观
    themeColorSwitchable: true,
    layoutSwitchable: true,
    cardBorderSwitchable: true,
    cardFollowThemeSwitchable: true,

    // 壁纸
    wallpaperModeSwitchable: false,
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
  });
```

配置对象外层的 `resolveDisplaySettingsConfig()` 负责套用总开关：读取环境变量覆盖 `enable`，并在总开关关闭时把所有设置项强制置为 `false`。它定义在 `src/utils/display-settings-utils.ts`，正常使用不需要改动。

::: tip
设为 `false` 可隐藏对应的设置项，简化面板界面。
:::
