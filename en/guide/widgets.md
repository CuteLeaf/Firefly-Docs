# Sidebar Widgets

The sidebar supports a variety of widgets that can be flexibly configured in the left/right sidebars and mobile bottom area. This page documents all available widget types and their specific configurations.

For common properties (`type`, `enable`, `position`, `showOnPostPage`, etc.), see [Sidebar](/en/guide/sidebar#component-configuration).

## Available Widgets

| Type | Description |
|------|-------------|
| `"profile"` | User profile card (avatar, name, bio, social links) |
| `"announcement"` | Announcement banner |
| `"music"` | Music player |
| `"categories"` | Post category list |
| `"tags"` | Tag cloud |
| `"stats"` | Site statistics (post count, word count, running days, etc.) |
| `"siteInfo"` | Site info (build platform, versions, system, etc.) |
| `"calendar"` | Post calendar with optional heatmap |
| `"sidebarToc"` | Table of contents (post detail pages only) |
| `"advertisement"` | Advertisement widget (supports multiple instances) |

## Widget-Specific Configuration

Use `specificConfig` to set options specific to each widget type. Widgets not listed below (`profile`, `announcement`, `music`, `stats`, `sidebarToc`) have no specific configuration — their data comes from separate config files or is computed automatically.

### categories / tags

The categories and tags widgets support auto-collapse. When the item count exceeds the threshold, the widget collapses to a fixed height (`7.5rem`) and users can click to expand.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `collapseThreshold` | `number` | No collapse | Auto-collapse when item count exceeds this value. Omit to disable |

```ts
{
  type: "categories",
  enable: true,
  position: "sticky",
  specificConfig: {
    collapseThreshold: 5,
  },
}
```

### calendar

The calendar widget shows monthly post activity and optionally displays a yearly heatmap below.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `calendar.showHeatmap` | `boolean` | `true` | Show yearly post activity heatmap |

```ts
{
  type: "calendar",
  enable: true,
  position: "sticky",
  showTitle: false,
  specificConfig: {
    calendar: {
      showHeatmap: true,
    },
  },
}
```

### siteInfo

The site info widget auto-detects the build platform, framework versions, system info, etc. When the build environment cannot be identified, a custom fallback text is displayed.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `siteInfo.unknownBuildPlatform` | `string` | `"Unknown CI"` | Fallback text for unrecognized CI platforms |

```ts
{
  type: "siteInfo",
  enable: true,
  position: "top",
  specificConfig: {
    siteInfo: {
      unknownBuildPlatform: "Custom CI",
    },
  },
}
```

### advertisement

The advertisement widget supports both image ads and text ads. Multiple instances can be configured, each with independent configuration and display counting.

#### Image Ad

```ts
{
  type: "advertisement",
  enable: true,
  position: "sticky",
  specificConfig: {
    ad: {
      image: {
        src: "/assets/images/ad.webp",   // Image URL (local or external)
        alt: "Ad Banner",                 // Alt text
        link: "https://example.com",      // Click redirect URL
        external: true,                   // Open in new tab
      },
      closable: true,                     // Show close button on hover
      displayCount: -1,                   // Max displays per user, -1 = unlimited
    },
  },
}
```

#### Text Ad

```ts
{
  type: "advertisement",
  enable: true,
  position: "sticky",
  specificConfig: {
    ad: {
      title: "Support the Author",        // Ad title (defaults to i18n text)
      content: "Thank you for your support!", // Ad content
      link: {
        text: "Support",                  // Button text
        url: "about/",                    // Link URL
        external: false,                  // External link
      },
      closable: false,
      displayCount: -1,
    },
  },
}
```

#### Full Configuration Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `ad.title` | `string` | i18n default | Ad title |
| `ad.content` | `string` | — | Ad content text |
| `ad.image.src` | `string` | — | Image URL (local path or external URL) |
| `ad.image.alt` | `string` | `"Advertisement"` | Image alt text |
| `ad.image.link` | `string` | — | Image click redirect URL |
| `ad.image.external` | `boolean` | `false` | Open image link in new tab |
| `ad.link.text` | `string` | — | Link button text |
| `ad.link.url` | `string` | — | Link URL |
| `ad.link.external` | `boolean` | `false` | External link (shows external icon) |
| `ad.closable` | `boolean` | `false` | Allow closing (close button appears on hover, slides out on click) |
| `ad.displayCount` | `number` | `-1` | Max displays per user, `-1` for unlimited (tracked via localStorage) |
| `ad.expireDate` | `string` | — | Expiration date (ISO 8601, e.g. `"2026-12-31"`), hidden after expiry |
| `ad.padding.all` | `string` | `"1rem"` | Uniform padding |
| `ad.padding.top` | `string` | — | Top padding (used when `all` is not set) |
| `ad.padding.right` | `string` | — | Right padding |
| `ad.padding.bottom` | `string` | — | Bottom padding |
| `ad.padding.left` | `string` | — | Left padding |

::: tip
- Multiple advertisement instances can be configured, each with independent display counting and configuration
- Setting `ad.padding` disables the default `px-4` content padding
- When `expireDate` has passed, the widget is not rendered at all (not just hidden)
:::

## Mobile Bottom Components

On mobile (< 768px), sidebar components display at the bottom of the page. Configure separately with `mobileBottomComponents`:

```ts
mobileBottomComponents: [
  { type: "profile", enable: true, showOnPostPage: true },
  { type: "announcement", enable: true, showOnPostPage: true },
  { type: "categories", enable: true, showOnPostPage: true, specificConfig: { collapseThreshold: 5 } },
  { type: "tags", enable: true, showOnPostPage: true, specificConfig: { collapseThreshold: 10 } },
  { type: "stats", enable: true, showOnPostPage: true },
  { type: "siteInfo", enable: true, showOnPostPage: true },
],
```

::: warning
- Mobile bottom components are configured independently from left/right sidebars
- Components in `mobileBottomComponents` do not need the `position` property (no top/sticky distinction)
:::
