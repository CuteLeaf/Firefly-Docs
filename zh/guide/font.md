# 字体

Firefly 使用 [Astro Font API](https://docs.astro.build/en/guides/fonts/) 管理字体，支持 Google Fonts、Fontsource、本地字体等多种来源。支持为不同区域（横幅标题、横幅副标题、导航栏标题、代码块）设置独立字体，也支持对本地字体进行自动子集化处理。

## 配置文件

- `src/config/fontConfig.ts` — 字体定义与选择配置
- `src/types/fontConfig.ts` — 类型定义

## 基础配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `enable` | `boolean` | `true` | 是否启用自定义字体功能 |
| `selected` | `string \| string[]` | `["system"]` | 当前选择的字体 CSS 变量名，`"system"` 表示系统字体 |
| `bannerTitleFont` | `string` | `""` | 横幅标题字体 CSS 变量名，留空则使用全局 `selected` |
| `bannerSubtitleFont` | `string` | `""` | 横幅副标题字体 CSS 变量名，留空则使用全局 `selected` |
| `navbarTitleFont` | `string` | `""` | 导航栏标题字体 CSS 变量名，留空则使用全局 `selected` |
| `codeFont` | `string` | `""` | 代码块字体 CSS 变量名，用于代码高亮和等宽字体场景 |

```ts
export const fontConfig: FontSelectionConfig = {
  enable: true,
  selected: ["system"],
  bannerTitleFont: "--font-zen-maru-gothic",
  bannerSubtitleFont: "--font-inter",
  navbarTitleFont: "",
  codeFont: "--font-jetbrains-mono",
};
```

## 字体定义（fontsList）

在 `fontsList` 数组中定义可用的字体。每个字体项使用 Astro Font API 的配置格式：

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `name` | `string` | 是 | 字体名称 |
| `cssVariable` | `string` | 是 | CSS 变量名（如 `"--font-inter"`） |
| `provider` | `string \| object` | 是 | 字体提供商：`"google"`、`"fontsource"`、`"local"`、`"bunny"`、`"fontshare"`、`"npm"` 或自定义 provider |
| `weights` | `string[]` | 否 | 字重列表，如 `["400", "700"]` |
| `styles` | `string[]` | 否 | 字体样式，如 `["normal"]` |
| `subsets` | `string[]` | 否 | 字符子集，如 `["latin", "cyrillic"]` |
| `fallbacks` | `string[]` | 否 | 回退字体列表 |
| `display` | `string` | 否 | 字体显示策略：`"auto"`、`"swap"`、`"block"` 等 |
| `options` | `object` | 否 | 本地字体的额外选项（如 `variants` 定义） |

## 内置字体

Firefly 预置了以下字体配置：

| CSS 变量 | 名称 | 提供商 | 用途 |
|----------|------|--------|------|
| `--font-zen-maru-gothic` | Zen Maru Gothic | Fontsource | 日文圆体，可用于标题 |
| `--font-inter` | Inter | Fontsource | 英文无衬线字体 |
| `--font-jetbrains-mono` | JetBrains Mono | Fontsource | 等宽字体，用于代码块 |
| `--font-greatvibes` | GreatVibes | 本地 | 装饰性字体示例 |

使用 `"system"` 表示系统字体栈（不加载任何自定义字体）。

## 添加自定义字体

### CDN 字体（推荐）

以 Fontsource 为例，添加一个新字体：

```ts
// 1. 在 fontsList 中添加字体定义
export const fontsList: FontDefinition[] = [
  // ... 其他字体
  {
    name: "Noto Sans SC",
    cssVariable: "--font-noto-sans-sc",
    provider: "fontsource",
    weights: ["400", "700"],
    styles: ["normal"],
    subsets: ["latin", "chinese-simplified"],
    fallbacks: ["sans-serif"],
  },
];

// 2. 在 fontConfig 中引用
export const fontConfig: FontSelectionConfig = {
  selected: ["--font-noto-sans-sc"],
};
```

### Google Fonts

```ts
{
  name: "Roboto",
  cssVariable: "--font-roboto",
  provider: "google",
  weights: ["400", "700"],
  styles: ["normal", "italic"],
  subsets: ["latin"],
  fallbacks: ["sans-serif"],
},
```

### 本地字体 + 子集化

本地字体文件通常体积较大（几 MB），直接使用会严重拖慢页面加载。Firefly 内置了自动子集化功能：在构建时扫描所有页面中实际使用的字符，生成仅包含这些字符的轻量 woff2 子集文件。

**使用步骤：**

1. 将 TTF/OTF/WOFF2 字体文件放在 `public/assets/fonts/` 目录下
2. 在 `fontsList` 中添加字体定义，使用 `provider: "local"`
3. 在 `fontConfig.subsetFonts` 中配置子集化选项

```ts
// 1. 字体定义
{
  name: "My Custom Font",
  cssVariable: "--font-my-custom",
  provider: "local",
  options: {
    variants: [
      {
        src: ["./public/assets/fonts/MyCustomFont.otf"],
      },
    ],
  },
  fallbacks: ["sans-serif"],
},

// 2. 子集化配置
subsetFonts: {
  "--font-my-custom": {
    extraChars: "", // 补充动态内容中可能用到的字符
  },
},
```

子集化脚本会在构建时自动运行，输出压缩信息：

```
🔤 Font subsetting started...
   Found 1 font(s) to subset: my-custom-font-default
🔍 Collecting characters from dist/...
   Collected 1234 unique characters.
⏳ Generating subset for 'my-custom-font-default' (My Custom Font)...
   ✔ a1b2c3d4e5f6g7h8.woff2 (14.3 KB, original: 344.0 KB, saved 95.8%)
✨ Font subsetting completed!
```

::: warning 动态内容字体缺失
子集化仅包含构建时页面中出现的字符。如果使用了评论系统、Bangumi 等动态加载的内容，可能出现字体缺失。

**缓解方法：**
- 通过 `subsetFonts` 中的 `extraChars` 补充额外字符
- 对正文使用的字体不启用子集化，仅对标题等静态文本使用
:::

## 各区域独立字体

通过 `bannerTitleFont`、`bannerSubtitleFont`、`navbarTitleFont`、`codeFont` 配置项，可以为不同区域分别指定不同的字体：

```ts
export const fontConfig: FontSelectionConfig = {
  selected: ["system"],                    // 全局字体使用系统字体
  bannerTitleFont: "--font-zen-maru-gothic", // 横幅标题使用 Zen Maru Gothic
  bannerSubtitleFont: "--font-inter",        // 横幅副标题使用 Inter
  navbarTitleFont: "",                       // 导航栏继承全局字体
  codeFont: "--font-jetbrains-mono",         // 代码块使用 JetBrains Mono
};
```

留空则继承全局 `selected` 字体，行为与未配置时完全一致。

## 字体 CSS 变量

启用字体后，以下 CSS 变量会自动设置到 `:root`：

```css
:root {
  --font-banner-title: var(--font-zen-maru-gothic, inherit);
  --font-banner-subtitle: var(--font-inter, inherit);
  --font-navbar-title: inherit;
}
```

你可以在自定义 CSS 中使用这些变量：

```css
.my-element {
  font-family: var(--font-banner-title);
}
```
