# Site Configuration

The site configuration is the core configuration file of the Firefly theme, controlling basic site information, theme colors, page toggles and other global settings.

## Config File

`src/config/siteConfig.ts`

## Basic Information

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `title` | `string` | `"Firefly"` | Site title |
| `subtitle` | `string` | `"Demo site"` | Site subtitle |
| `site_url` | `string` | - | Site URL |
| `description` | `string` | - | Site description for `<meta name="description">` |
| `keywords` | `string[]` | - | Site keywords for `<meta name="keywords">` |
| `lang` | `string` | `"zh_CN"` | Site language: `zh_CN`, `zh_TW`, `en`, `ja`, `ru` |

```ts
export const siteConfig: SiteConfig = {
  title: "Firefly",
  subtitle: "Demo site",
  site_url: "https://firefly.cuteleaf.cn",
  description: "A beautiful Astro blog theme...",
  keywords: ["Firefly", "Astro", "Blog"],
  lang: "zh_CN",
};
```

## Theme Color

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `themeColor.hue` | `number` | `165` | Theme color hue (0-360). Red: 0, Cyan: 200, Teal: 250, Pink: 345 |
| `themeColor.fixed` | `boolean` | `false` | Hide theme color picker from visitors |
| `themeColor.defaultMode` | `string` | `"system"` | Default mode: `"light"`, `"dark"`, `"system"` |

## Page Width

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `pageWidth` | `number` | `100` | Maximum page width in `rem`. Larger values make the content area wider |

```ts
// Page width (unit: rem)
// Increase the value to make the content area wider
pageWidth: 100,
```

## Card Style

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `card.border` | `boolean` | `false` | Enable card border and shadow for a 3D effect |
| `card.followTheme` | `boolean` | `false` | Whether card background follows theme hue in light mode |

```ts
card: {
  border: false,
  followTheme: false,
},
```

## Navbar

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `navbar.logo` | `object` | - | Navbar logo, see below |
| `navbar.title` | `string` | `"Firefly"` | Navbar title |
| `navbar.widthFull` | `boolean` | `false` | Whether navbar takes full width |
| `navbar.followTheme` | `boolean` | `false` | Whether navbar icon and title follow theme color |

Logo supports four types:

1. **Astro icon library**: `{ type: "icon", value: "material-symbols:home-pin-outline" }`
2. **public directory image** (no optimization): `{ type: "image", value: "/assets/images/logo.webp", alt: "Logo" }`
3. **src directory image** (auto-optimized, recommended): `{ type: "image", value: "assets/images/logo.webp", alt: "Logo" }`
4. **Remote image**: `{ type: "url", value: "https://example.com/logo.png", alt: "Logo" }`

## Favicon

```ts
favicon: [
  {
    src: "/favicon/favicon.ico",
    // theme: "light",  // Optional: 'light' | 'dark'
    // sizes: "32x32",  // Optional: icon size
  },
],
```

## Date & Timezone

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `siteStartDate` | `string` | - | Site start date (`YYYY-MM-DD`), used for uptime counter |
| `timezone` | `string` | `"Asia/Shanghai"` | IANA timezone string for date formatting |

## Admonitions

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `rehypeCallouts.theme` | `string` | `"github"` | Theme: `"github"`, `"obsidian"`, `"vitepress"` |

::: tip
Restart the dev server after changing this setting.
:::

## Post Settings

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showLastModified` | `boolean` | `true` | Show "last modified" card at the bottom of posts |
| `outdatedThreshold` | `number` | `30` | Days threshold for showing the "last modified" card |
| `sharePoster` | `boolean` | `true` | Enable share poster generation |
| `generateOgImages` | `boolean` | `false` | Generate OpenGraph images (increases build time) |

## Post List Layout

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `postListLayout.defaultMode` | `string` | `"list"` | Default layout: `"list"` or `"grid"` |
| `postListLayout.allowSwitch` | `boolean` | `true` | Allow users to switch layout |
| `postListLayout.grid.masonry` | `boolean` | `false` | Enable masonry layout |
| `postListLayout.grid.columnWidth` | `number` | `320` | Minimum card width in grid mode (px). The browser automatically calculates column count based on container width |

## Pagination

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `pagination.postsPerPage` | `number` | `10` | Posts per page |

## Page Toggles

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `pages.sponsor` | `boolean` | `true` | Sponsor page toggle |
| `pages.guestbook` | `boolean` | `true` | Guestbook page toggle (requires comment system) |
| `pages.bangumi` | `boolean` | `true` | Bangumi page toggle |
| `categoryBar` | `boolean` | `true` | Category navigation bar on homepage and archive page |

## Bangumi

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `bangumi.userId` | `string` | - | Bangumi user ID |

::: tip
Bangumi data is fetched at build time. During `dev` only one page of data is fetched; `build` fetches all data.
:::

## Analytics

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `analytics.googleAnalyticsId` | `string` | `""` | Google Analytics ID |
| `analytics.microsoftClarityId` | `string` | `""` | Microsoft Clarity ID |

## Image Optimization

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `imageOptimization.formats` | `string` | `"webp"` | Output format: `"avif"`, `"webp"`, `"both"` (recommended) |
| `imageOptimization.quality` | `number` | `85` | Compression quality (1-100), recommended 70-85 |
| `imageOptimization.noReferrerDomains` | `string[]` | `[]` | Domains requiring anti-hotlinking handling, supports wildcard `*` |

::: warning
Astro can only optimize images in the `src` directory. More images means longer build times.
:::

### Anti-Hotlinking (Referrer Policy)

Some image hosts or CDNs (e.g. Bilibili CDN) enforce hotlink protection by checking the `Referer` request header, causing 403 errors when their images are embedded in your blog.

By configuring `noReferrerDomains`, Firefly will automatically add a `referrerpolicy="no-referrer"` attribute to `<img>` tags matching the specified domains, preventing the browser from sending the Referer header and bypassing hotlink protection.

```ts
imageOptimization: {
  formats: "webp",
  quality: 85,
  noReferrerDomains: [
    "i0.hdslb.com",     // Bilibili CDN
    "i1.hdslb.com",
    "i2.hdslb.com",
    "*.bilibili.com",   // Wildcard support
  ],
},
```

::: tip
- Only applies to external images starting with `http://` or `https://`, local images are not affected
- Only affects `<img>` tags with matching domains, does not change referrer behavior for other links
- Images with alt text in Markdown will still generate `<figcaption>` as expected
:::
