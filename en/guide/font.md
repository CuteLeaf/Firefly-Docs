# Font

Firefly uses [Astro Font API](https://docs.astro.build/en/guides/fonts/) to manage fonts, supporting Google Fonts, Fontsource, local fonts, and more. You can set different fonts for different areas (banner title, banner subtitle, navbar title, code blocks), and local fonts can be automatically subsetted for optimal performance.

## Config Files

- `src/config/fontConfig.ts` — Font definitions and selection configuration
- `src/types/fontConfig.ts` — Type definitions

## Basic Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enable` | `boolean` | `true` | Enable custom font feature |
| `selected` | `string \| string[]` | `["system"]` | Selected font CSS variable name(s), `"system"` for system fonts |
| `bannerTitleFont` | `string` | `""` | Banner title font CSS variable, falls back to global `selected` if empty |
| `bannerSubtitleFont` | `string` | `""` | Banner subtitle font CSS variable, falls back to global `selected` if empty |
| `navbarTitleFont` | `string` | `""` | Navbar title font CSS variable, falls back to global `selected` if empty |
| `codeFont` | `string` | `""` | Code block font CSS variable, for syntax highlighting and monospace scenarios |

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

## Font Definitions (fontsList)

Define available fonts in the `fontsList` array. Each font item uses the Astro Font API configuration format:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | `string` | Yes | Font name |
| `cssVariable` | `string` | Yes | CSS variable name (e.g. `"--font-inter"`) |
| `provider` | `string \| object` | Yes | Font provider: `"google"`, `"fontsource"`, `"local"`, `"bunny"`, `"fontshare"`, `"npm"`, or custom provider |
| `weights` | `string[]` | No | Font weights, e.g. `["400", "700"]` |
| `styles` | `string[]` | No | Font styles, e.g. `["normal"]` |
| `subsets` | `string[]` | No | Character subsets, e.g. `["latin", "cyrillic"]` |
| `fallbacks` | `string[]` | No | Fallback font list |
| `display` | `string` | No | Font display strategy: `"auto"`, `"swap"`, `"block"`, etc. |
| `options` | `object` | No | Extra options for local fonts (e.g. `variants` definition) |

## Built-in Fonts

Firefly includes these pre-configured fonts:

| CSS Variable | Name | Provider | Usage |
|--------------|------|----------|-------|
| `--font-zen-maru-gothic` | Zen Maru Gothic | Fontsource | Japanese rounded font, suitable for titles |
| `--font-inter` | Inter | Fontsource | English sans-serif font |
| `--font-jetbrains-mono` | JetBrains Mono | Fontsource | Monospace font for code blocks |
| `--font-greatvibes` | GreatVibes | Local | Decorative font example |

Use `"system"` for the system font stack (no custom fonts loaded).

## Adding Custom Fonts

### CDN Fonts (Recommended)

Example with Fontsource:

```ts
// 1. Add font definition to fontsList
export const fontsList: FontDefinition[] = [
  // ... other fonts
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

// 2. Reference in fontConfig
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

### Local Fonts with Subsetting

Local font files are typically large (several MB) and will significantly slow down page loading. Firefly includes an automatic subsetting feature: during build, it scans all characters actually used in your pages and generates lightweight woff2 subset files.

**Steps:**

1. Place your TTF/OTF/WOFF2 font file in the `public/assets/fonts/` directory
2. Add font definition to `fontsList` with `provider: "local"`
3. Configure subsetting options in `fontConfig.subsetFonts`

```ts
// 1. Font definition
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

// 2. Subsetting configuration
subsetFonts: {
  "--font-my-custom": {
    extraChars: "", // Extra characters for dynamic content
  },
},
```

The subsetting script runs automatically during build and outputs compression info:

```
🔤 Font subsetting started...
   Found 1 font(s) to subset: my-custom-font-default
🔍 Collecting characters from dist/...
   Collected 1234 unique characters.
⏳ Generating subset for 'my-custom-font-default' (My Custom Font)...
   ✔ a1b2c3d4e5f6g7h8.woff2 (14.3 KB, original: 344.0 KB, saved 95.8%)
✨ Font subsetting completed!
```

::: warning Dynamic Content Font Missing
Subsetting only includes characters present in pages at build time. If you use comments, Bangumi, or other dynamically loaded content, some characters may be missing.

**Workarounds:**
- Use `extraChars` in `subsetFonts` to include additional characters
- Avoid subsetting fonts used in body text; only subset fonts for titles and static text
:::

## Per-Region Fonts

Use `bannerTitleFont`, `bannerSubtitleFont`, `navbarTitleFont`, and `codeFont` to assign different fonts to specific regions:

```ts
export const fontConfig: FontSelectionConfig = {
  selected: ["system"],                    // Global: system fonts
  bannerTitleFont: "--font-zen-maru-gothic", // Banner title: Zen Maru Gothic
  bannerSubtitleFont: "--font-inter",        // Banner subtitle: Inter
  navbarTitleFont: "",                       // Navbar: inherits global
  codeFont: "--font-jetbrains-mono",         // Code blocks: JetBrains Mono
};
```

When left empty, the region inherits the global `selected` font.

## Font CSS Variables

When fonts are enabled, the following CSS variables are automatically set on `:root`:

```css
:root {
  --font-banner-title: var(--font-zen-maru-gothic, inherit);
  --font-banner-subtitle: var(--font-inter, inherit);
  --font-navbar-title: inherit;
}
```

You can use these variables in your custom CSS:

```css
.my-element {
  font-family: var(--font-banner-title);
}
```
