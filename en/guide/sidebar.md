# Sidebar

The sidebar layout configuration controls the sidebar display position and component arrangement.

## Config File

`src/config/sidebarConfig.ts`

## Layout Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enable` | `boolean` | `true` | Enable sidebar |
| `position` | `string` | `"both"` | Sidebar position: `"left"`, `"right"`, `"both"` |
| `tabletSidebar` | `string` | `"left"` | Which sidebar to show on tablet (769-1279px), only for `"both"` |
| `showBothSidebarsOnPostPage` | `boolean` | `true` | Show both sidebars on post pages when using single sidebar |

## Component Configuration

Each sidebar component supports:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | `string` | Yes | Component type |
| `enable` | `boolean` | Yes | Whether enabled |
| `position` | `string` | Yes | Position: `"top"` fixed, `"sticky"` sticky |
| `showOnPostPage` | `boolean` | No | Show on post detail pages |
| `showOnNonPostPage` | `boolean` | No | Show on non-post pages |
| `showTitle` | `boolean` | No | Show component title, default `true` |
| `specificConfig` | `object` | No | Component-specific configuration, varies by component type, see below |

### Available Component Types

| Type | Description |
|------|-------------|
| `"profile"` | User profile |
| `"announcement"` | Announcement |
| `"music"` | Music player |
| `"categories"` | Categories |
| `"tags"` | Tags |
| `"stats"` | Site statistics |
| `"siteInfo"` | Site info (uptime, last updated, etc.) |
| `"calendar"` | Calendar |
| `"sidebarToc"` | Table of contents (post pages only) |
| `"advertisement"` | Advertisement |

::: tip
Component rendering order depends on their position in the config array, but `position: "top"` components render before `position: "sticky"` components.
:::

### specificConfig Component-Specific Configuration

Different component types support different `specificConfig` options:

#### categories / tags Components

| Property | Type | Description |
|----------|------|-------------|
| `collapseThreshold` | `number` | Collapse threshold, auto-collapse when count exceeds this value |

#### calendar Component

| Property | Type | Description |
|----------|------|-------------|
| `calendar.showHeatmap` | `boolean` | Show yearly post activity heatmap |

#### advertisement Component

The `specificConfig.ad` supports the following:

| Property | Type | Description |
|----------|------|-------------|
| `ad.image.src` | `string` | Ad image URL |
| `ad.image.alt` | `string` | Image alt text |
| `ad.image.link` | `string` | Click redirect URL |
| `ad.image.external` | `boolean` | Whether link is external |
| `ad.title` | `string` | Ad title |
| `ad.content` | `string` | Ad content text |
| `ad.link.text` | `string` | Link button text |
| `ad.link.url` | `string` | Link URL |
| `ad.link.external` | `boolean` | Whether link is external |
| `ad.closable` | `boolean` | Allow closing the ad |
| `ad.displayCount` | `number` | Display count limit, `-1` for unlimited |
| `ad.expireDate` | `string` | Expiration date (`YYYY-MM-DD`), hidden after expiry |
| `ad.padding.all` | `string` | Component padding |

## Left Sidebar Example

```ts
leftComponents: [
  {
    type: "profile",
    enable: true,
    position: "top",
    showOnPostPage: true,
  },
  {
    type: "announcement",
    enable: true,
    position: "top",
    showOnPostPage: true,
  },
  {
    type: "music",
    enable: true,
    position: "sticky",
    showOnPostPage: true,
  },
  {
    type: "categories",
    enable: true,
    position: "sticky",
    showOnPostPage: true,
    specificConfig: {
      collapseThreshold: 5,
    },
  },
  {
    type: "tags",
    enable: true,
    position: "sticky",
    showOnPostPage: true,
    specificConfig: {
      collapseThreshold: 10,
    },
  },
],
```

## Right Sidebar Example

```ts
rightComponents: [
  {
    type: "stats",
    enable: true,
    position: "top",
    showOnPostPage: true,
  },
  {
    type: "siteInfo",
    enable: true,
    position: "top",
    showOnPostPage: true,
  },
  {
    type: "calendar",
    enable: true,
    showTitle: false,
    position: "sticky",
    showOnPostPage: false,
    specificConfig: {
      calendar: {
        showHeatmap: true,
      },
    },
  },
  {
    type: "sidebarToc",
    enable: true,
    position: "sticky",
    showOnPostPage: true,
    showOnNonPostPage: false,
  },
],
```

## Mobile Bottom Components

On mobile (< 768px), sidebar components display at the bottom of the page. Configure separately with `mobileBottomComponents`:

```ts
mobileBottomComponents: [
  { type: "profile", enable: true, showOnPostPage: true },
  { type: "announcement", enable: true, showOnPostPage: true },
  { type: "music", enable: true, showOnPostPage: true },
  { type: "categories", enable: true, showOnPostPage: true, specificConfig: { collapseThreshold: 5 } },
  { type: "tags", enable: true, showOnPostPage: true, specificConfig: { collapseThreshold: 10 } },
  { type: "stats", enable: true, showOnPostPage: true },
  { type: "siteInfo", enable: true, showOnPostPage: true },
],
```

::: warning
Mobile bottom components are configured independently from left/right sidebars.
:::
