# Advertisement

The advertisement component displays in the sidebar, supporting image ads and text ads.

## Config File

Ad configuration is embedded directly in `src/config/sidebarConfig.ts` within the `advertisement` component's `specificConfig.ad`.

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `title` | `string` | No | Ad title |
| `content` | `string` | No | Ad text content |
| `image` | `object` | No | Image configuration |
| `link` | `object` | No | Link configuration |
| `closable` | `boolean` | No | Can be closed |
| `displayCount` | `number` | No | Display count limit, `-1` for unlimited |
| `expireDate` | `string` | No | Expiry date (ISO 8601) |

### Image Configuration

| Property | Type | Description |
|----------|------|-------------|
| `image.src` | `string` | Image source |
| `image.alt` | `string` | Alt text |
| `image.link` | `string` | Click link |
| `image.external` | `boolean` | External link |

### Link Configuration

| Property | Type | Description |
|----------|------|-------------|
| `link.text` | `string` | Link text |
| `link.url` | `string` | Link URL |
| `link.external` | `boolean` | External link |

### Padding Configuration

| Property | Type | Description |
|----------|------|-------------|
| `padding.all` | `string` | Uniform padding (overrides individual) |
| `padding.top` | `string` | Top padding |
| `padding.right` | `string` | Right padding |
| `padding.bottom` | `string` | Bottom padding |
| `padding.left` | `string` | Left padding |

## Example: Image-only Ad

```ts
export const adConfig1: AdConfig = {
  image: {
    src: "assets/images/cover.avif",
    alt: "Ad banner",
    link: "#",
    external: true,
  },
  closable: true,
  displayCount: -1,
  padding: { all: "0" },
};
```

## Example: Full Content Ad

```ts
export const adConfig2: AdConfig = {
  title: "Support Us",
  content: "If you find this site helpful, consider supporting us!",
  image: {
    src: "assets/images/cover.avif",
    alt: "Support",
    link: "about/",
    external: false,
  },
  link: {
    text: "Support",
    url: "about/",
    external: false,
  },
  closable: true,
  displayCount: -1,
};
```

::: tip
Ad visibility is controlled in `sidebarConfig.ts`. Set the `advertisement` component's `enable` property to toggle it. Ad content is configured directly in `specificConfig.ad`. Each `advertisement` component instance can have its own independent ad content.
:::
