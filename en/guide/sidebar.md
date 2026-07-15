# Sidebar

The sidebar layout configuration controls the sidebar display position and component arrangement.

## Config File

`src/config/sidebarConfig.ts`

The Moments sidebar follows the `siteConfig.pages.dynamic` toggle and is hidden automatically when the Moments page is disabled. Control whether the music player appears in the sidebar with `musicPlayerConfig.showInSidebar` in `src/config/musicConfig.ts`; you do not need to change its `enable` value here.

## Layout Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enable` | `boolean` | `true` | Enable sidebar |
| `position` | `string` | `"both"` | Sidebar position: `"left"`, `"right"`, `"both"` |
| `tabletSidebar` | `string` | `"left"` | Which sidebar to show on tablet (769-1279px), only for `"both"` |
| `hideSidebarOnPostPage` | `boolean` | `false` | Hide sidebar on post detail pages, set to `true` to show only on non-post pages like home |
| `showBothSidebarsOnPostPage` | `boolean` | `true` | Show both sidebars on post pages when using single sidebar (requires `hideSidebarOnPostPage` to be `false`) |

## Component Configuration

Each sidebar component supports:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | `string` | Yes | Component type |
| `enable` | `boolean` | Yes | Whether enabled |
| `position` | `string` | Yes | Position: `"top"` fixed, `"sticky"` sticky |
| `showOnPostPage` | `boolean` | No | Show on post detail pages |
| `hideOnNonPostPage` | `boolean` | No | Hide on non-post pages (`true` = show only on post detail pages) |
| `showTitle` | `boolean` | No | Show component title, default `true` |
| `specificConfig` | `object` | No | Component-specific configuration, varies by type, see [Sidebar Widgets](/en/guide/widgets#widget-specific-configuration) |

### Available Component Types

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

::: tip
Component rendering order depends on their position in the config array, but `position: "top"` components render before `position: "sticky"` components.
:::

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
    hideOnNonPostPage: true,
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
