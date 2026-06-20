# Font

Firefly supports custom font configuration using CDN fonts or local font files. You can set different fonts for different areas (banner title, banner subtitle, navbar title), and local fonts can be automatically subsetted for optimal performance.

## Config File

`src/config/fontConfig.ts`

## Basic Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enable` | `boolean` | `false` | Enable custom fonts |
| `preload` | `boolean` | `true` | Preload font files |
| `selected` | `string \| string[]` | `["misans-regular"]` | Selected font ID(s) |
| `bannerTitleFont` | `string` | `""` | Banner title font ID, falls back to global `selected` if empty |
| `bannerSubtitleFont` | `string` | `""` | Banner subtitle font ID, falls back to global `selected` if empty |
| `navbarTitleFont` | `string` | `""` | Navbar title font ID, falls back to global `selected` if empty |
| `fallback` | `string[]` | `["system-ui", ...]` | Global font fallback list |

```ts
export const fontConfig = {
  enable: false,
  preload: true,
  selected: ["misans-regular"],
  bannerTitleFont: "",      // Banner title font
  bannerSubtitleFont: "",   // Banner subtitle font
  navbarTitleFont: "",      // Navbar title font
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

## Per-Region Fonts

Use `bannerTitleFont`, `bannerSubtitleFont`, and `navbarTitleFont` to assign different fonts to the banner title, banner subtitle, and navbar title respectively.

```ts
selected: ["misans-regular"],       // Global font
bannerTitleFont: "zen-maru-gothic", // Banner title uses Zen Maru Gothic
bannerSubtitleFont: "inter",        // Banner subtitle uses Inter
navbarTitleFont: "misans-semibold", // Navbar title uses MiSans Semibold
```

When left empty, the region inherits the global `selected` font.

## Font Item Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | Yes | Unique font identifier |
| `name` | `string` | Yes | Display name |
| `src` | `string` | Yes | Font file path or URL |
| `family` | `string` | Yes | CSS `font-family` name |
| `weight` | `string \| number` | No | Font weight |
| `style` | `string` | No | Font style: `"normal"`, `"italic"`, `"oblique"` |
| `display` | `string` | No | `font-display`: `"auto"`, `"block"`, `"swap"`, `"fallback"`, `"optional"` |
| `subset` | `boolean` | No | Enable font subsetting (local fonts only) |
| `subsetExtraChars` | `string` | No | Extra characters to include in the subset for dynamic content |

## Built-in Fonts

| ID | Name | Source |
|----|------|--------|
| `system` | System Font | Built-in |
| `zen-maru-gothic` | Zen Maru Gothic | Google Fonts |
| `inter` | Inter | Google Fonts |
| `misans-normal` | MiSans Normal | unpkg CDN |
| `misans-regular` | MiSans Regular | unpkg CDN |
| `misans-semibold` | MiSans Semibold | unpkg CDN |

## Adding Custom Fonts

### CDN Fonts (Recommended)

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

Then add it to `selected`:

```ts
selected: ["my-font"],
```

### Local Fonts with Subsetting

Local font files are typically large (several MB) and will significantly slow down page loading. Firefly includes an automatic subsetting feature: during build, it scans all characters actually used in your pages and generates lightweight woff2 subset files (usually only a few hundred KB).

**Steps:**

1. Place your TTF/OTF/WOFF2 font file in the `public/fonts/` directory
2. Add the font config with `subset: true`
3. Run `pnpm build` — the script automatically generates subset files

```ts
fonts: {
  "my-font": {
    id: "my-font",
    name: "My Font",
    src: "/fonts/my-font.ttf",  // Font file in public/fonts/
    family: "MyFont",
    weight: 400,
    display: "swap",
    subset: true,               // Enable subsetting
    subsetExtraChars: "",       // Extra characters for dynamic content
  },
},
```

The subsetting script outputs compression info, e.g.:

```
⏳ Generating subset for 'my-font' (MyFont)...
   ✔ 460b7258db8ba482.woff2 (14.3 KB, original: 34.4 KB, saved 58.5%)
```

You can also run the subset command independently:

```bash
pnpm subset
```

::: warning Dynamic Content Font Missing
Subsetting only includes characters present in pages at build time. If you use comments, Bangumi, or other dynamically loaded content, some characters may be missing.

**Workarounds:**
- Use `subsetExtraChars` to include additional characters
- Avoid subsetting fonts used in body text; only subset fonts for titles and static text
:::
