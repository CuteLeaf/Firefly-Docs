# 字体

Firefly 支持自定义字体配置，可以使用 CDN 字体或本地字体文件。支持为不同区域（横幅标题、横幅副标题、导航栏标题）设置独立字体，也支持对本地字体进行自动子集化处理。

## 配置文件

`src/config/fontConfig.ts`

## 基础配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `enable` | `boolean` | `false` | 是否启用自定义字体 |
| `preload` | `boolean` | `true` | 是否预加载字体文件 |
| `selected` | `string \| string[]` | `["misans-regular"]` | 当前选择的字体 ID，支持多个字体组合 |
| `bannerTitleFont` | `string` | `""` | 横幅标题字体 ID，留空则使用全局 `selected` 字体 |
| `bannerSubtitleFont` | `string` | `""` | 横幅副标题字体 ID，留空则使用全局 `selected` 字体 |
| `navbarTitleFont` | `string` | `""` | 导航栏标题字体 ID，留空则使用全局 `selected` 字体 |
| `fallback` | `string[]` | `["system-ui", ...]` | 全局字体回退列表 |

```ts
export const fontConfig = {
  enable: false,
  preload: true,
  selected: ["misans-regular"],
  bannerTitleFont: "",      // 横幅标题字体
  bannerSubtitleFont: "",   // 横幅副标题字体
  navbarTitleFont: "",      // 导航栏标题字体
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "sans-serif",
  ],
};
```

## 各区域独立字体

通过 `bannerTitleFont`、`bannerSubtitleFont`、`navbarTitleFont` 三个配置项，可以为横幅标题、横幅副标题和导航栏标题分别指定不同的字体，实现更丰富的视觉效果。

```ts
selected: ["misans-regular"],       // 全局字体
bannerTitleFont: "zen-maru-gothic", // 横幅标题使用 Zen Maru Gothic
bannerSubtitleFont: "inter",        // 横幅副标题使用 Inter
navbarTitleFont: "misans-semibold", // 导航栏标题使用 MiSans Semibold
```

留空则继承全局 `selected` 字体，行为与未配置时完全一致。

## 字体项配置

每个字体项支持以下属性：

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | `string` | 是 | 字体唯一标识符 |
| `name` | `string` | 是 | 字体显示名称 |
| `src` | `string` | 是 | 字体文件路径或 URL |
| `family` | `string` | 是 | CSS `font-family` 名称 |
| `weight` | `string \| number` | 否 | 字体粗细 |
| `style` | `string` | 否 | 字体样式：`"normal"`、`"italic"`、`"oblique"` |
| `display` | `string` | 否 | `font-display` 属性：`"auto"`、`"block"`、`"swap"`、`"fallback"`、`"optional"` |
| `subset` | `boolean` | 否 | 是否对该字体进行子集化（仅本地字体有效） |
| `subsetExtraChars` | `string` | 否 | 子集化时额外包含的字符，用于覆盖动态内容 |

## 内置字体

Firefly 预置了以下字体配置：

| ID | 名称 | 来源 |
|----|------|------|
| `system` | 系统字体 | 系统内置 |
| `zen-maru-gothic` | Zen Maru Gothic | Google Fonts |
| `inter` | Inter | Google Fonts |
| `misans-normal` | MiSans Normal | unpkg CDN |
| `misans-regular` | MiSans Regular | unpkg CDN |
| `misans-semibold` | MiSans Semibold | unpkg CDN |

## 添加自定义字体

### CDN 字体（推荐）

```ts
fonts: {
  "my-font": {
    id: "my-font",
    name: "My Custom Font",
    src: "https://fonts.googleapis.com/css2?family=My+Font&display=swap",
    family: "My Font",
    display: "swap",
  },
},
```

然后将其添加到 `selected` 中：

```ts
selected: ["my-font"],
```

### 本地字体 + 子集化

本地字体文件通常体积较大（几 MB），直接使用会严重拖慢页面加载。Firefly 内置了自动子集化功能：在构建时扫描所有页面中实际使用的字符，生成仅包含这些字符的轻量 woff2 子集文件（通常只有几百 KB）。

**使用步骤：**

1. 将 TTF/OTF/WOFF2 字体文件放在 `public/fonts/` 目录下
2. 在 `fonts` 中添加字体配置，设置 `subset: true`
3. 运行 `pnpm build`，脚本会自动生成子集文件

```ts
fonts: {
  "my-font": {
    id: "my-font",
    name: "My Font",
    src: "/fonts/my-font.ttf",  // 字体文件放在 public/fonts/ 下
    family: "MyFont",
    weight: 400,
    display: "swap",
    subset: true,               // 启用子集化
    subsetExtraChars: "",       // 补充动态内容中可能用到的字符
  },
},
```

子集化脚本会输出压缩信息，例如：

```
⏳ Generating subset for 'my-font' (MyFont)...
   ✔ 460b7258db8ba482.woff2 (14.3 KB, original: 34.4 KB, saved 58.5%)
```

也可以单独运行子集化命令：

```bash
pnpm subset
```

::: warning 动态内容字体缺失
子集化仅包含构建时页面中出现的字符。如果使用了评论系统、Bangumi 等动态加载的内容，可能出现字体缺失。

**缓解方法：**
- 通过 `subsetExtraChars` 补充额外字符
- 对正文使用的字体不启用子集化，仅对标题等静态文本使用
:::
