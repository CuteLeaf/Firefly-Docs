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
| `configId` | `string` | No | Config ID (for advertisement component) |
| `responsive` | `object` | No | Responsive configuration |

### Available Component Types

| Type | Description |
|------|-------------|
| `"profile"` | User profile |
| `"announcement"` | Announcement |
| `"music"` | Music player |
| `"categories"` | Categories |
| `"tags"` | Tags |
| `"stats"` | Site statistics |
| `"calendar"` | Calendar |
| `"sidebarToc"` | Table of contents (post pages only) |
| `"advertisement"` | Advertisement |

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
    type: "categories",
    enable: true,
    position: "sticky",
    showOnPostPage: true,
    responsive: {
      collapseThreshold: 5,
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
  { type: "categories", enable: true, showOnPostPage: true, responsive: { collapseThreshold: 5 } },
  { type: "stats", enable: true, showOnPostPage: true },
],
```

::: warning
Mobile bottom components are configured independently from left/right sidebars.
:::
