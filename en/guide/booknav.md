# Booknav

Booknav configuration manages the content of the bookmark directory page, used to collect and display useful sites by category.

## Config File

`src/config/booknavConfig.ts`

## Page Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `title` | `string` | `""` | Page title. Falls back to the i18n translation when empty |
| `description` | `string` | `""` | Page description. Falls back to the i18n translation when empty |
| `favicon.enabled` | `boolean` | `true` | Whether to auto-fetch the target site's favicon when a bookmark has no `icon` |
| `favicon.api` | `string` | `"https://a.favicon.im/{domain}"` | Favicon API endpoint. `{domain}` is a placeholder |

## Group Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | Yes | Anchor id, must be unique. Used by the category pills to scroll to the group |
| `name` | `string` | Yes | Group name |
| `icon` | `string` | No | Group icon, an astro-icon name. Shown before the group heading and in the category pill |
| `desc` | `string` | No | Group description, shown next to the group heading |
| `weight` | `number` | No | Sort weight, higher comes first. Defaults to `0` |
| `enabled` | `boolean` | No | Whether the group is enabled. Defaults to `true` |
| `items` | `BooknavItem[]` | Yes | Bookmarks in this group |

## Bookmark Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `title` | `string` | Yes | Bookmark title |
| `url` | `string` | Yes | Target site URL |
| `desc` | `string` | No | Description. The domain is shown on the card when empty |
| `icon` | `string` | No | Bookmark icon. Auto-fetches the favicon when empty |
| `weight` | `number` | No | Sort weight within the group, higher comes first. Defaults to `0` |
| `enabled` | `boolean` | No | Whether the bookmark is enabled. Defaults to `true` |

::: tip
Both `weight` and `enabled` are optional — you usually collect a lot of sites, so there's no need to fill them in on every entry.
:::

## Icon Resolution

The `icon` field accepts three forms, resolved at build time:

| Form | Example | Rendered as |
|------|---------|-------------|
| astro-icon name | `fa7-brands:github` | Inline SVG, no extra request |
| Remote image URL | `https://example.com/logo.png` | `<img>` tag |
| Local image path | `/favicon/firefly-32.png` | `<img>` tag, relative to `public` |

Full resolution order:

1. `icon` starts with `http://`, `https://` or `/` → treated as an image URL
2. `icon` looks like `namespace:name` → treated as an astro-icon name
3. `icon` is non-empty but matches neither → still treated as an image path
4. `icon` is empty and `favicon.enabled` is `true` → fetched through the favicon API
5. None of the above → falls back to a first-letter block in the theme color

If an image fails to load, the front end swaps it for the first-letter block, so no broken images appear. Every `<img>` carries `loading="lazy"` and `referrerpolicy="no-referrer"` (favicon services often block hotlinking).

## Favicon API

`{domain}` is replaced with the hostname parsed from `url`. To switch providers, just make sure the endpoint contains `{domain}`:

```ts
// All of these work
api: "https://a.favicon.im/{domain}"
api: "https://favicon.im/{domain}"
api: "https://www.google.com/s2/favicons?domain={domain}&sz=64"
```

If you'd rather not depend on a third-party service, set `favicon.enabled` to `false` — bookmarks without an `icon` will all show the first-letter block.

## Example

```ts
export const booknavPageConfig: BooknavPageConfig = {
  // Page title, falls back to the i18n translation when empty
  title: "",
  // Page description, falls back to the i18n translation when empty
  description: "",
  // Favicon auto-fetch configuration
  favicon: {
    // Whether to auto-fetch the target site's favicon when a bookmark has no icon
    enabled: true,
    // Favicon API endpoint, {domain} is replaced with the target site's domain
    api: "https://a.favicon.im/{domain}",
  },
};

export const booknavConfig: BooknavGroup[] = [
  {
    id: "dev",
    name: "Development",
    icon: "material-symbols:code-rounded",
    desc: "Sites I can't code without",
    weight: 100,
    items: [
      {
        title: "GitHub",
        url: "https://github.com",
        desc: "The world's largest code hosting platform",
        // Using an astro-icon icon name
        icon: "fa7-brands:github",
        weight: 10,
      },
      {
        title: "MDN Web Docs",
        url: "https://developer.mozilla.org",
        desc: "The most authoritative web technology documentation",
        // No icon — the favicon is fetched automatically
        weight: 9,
      },
    ],
  },
  {
    id: "tools",
    name: "Tools",
    icon: "material-symbols:build-outline-rounded",
    desc: "Handy online utilities",
    weight: 80,
    items: [
      {
        title: "TinyPNG",
        url: "https://tinypng.com",
        desc: "Compress PNG / JPEG images online",
        weight: 10,
      },
    ],
  },
];
```

## Page Features

- **Category anchors**: pill buttons at the top show each group name and bookmark count, and smooth-scroll to the matching group on click
- **Search filter**: matches bookmark title, description and domain, hiding groups that become empty
- **Sorting**: groups and their bookmarks are both sorted by `weight` descending; entries with `enabled: false` are dropped, and a group left with no entries is not rendered

## Page Toggle

Use `siteConfig.pages.booknav` to control whether `/booknav/` is accessible. When set to `false`, the navbar entry is hidden automatically, direct visits redirect to 404, and the page is excluded from the sitemap.

The navbar entry is defined as `LinkPresets.Booknav` in `src/config/navBarConfig.ts`, where you can change its name, icon and position.

::: tip
- Use a short English word for a group's `id` — it becomes the page anchor, e.g. `/booknav/#dev`
- Set `enabled: false` to temporarily hide a group or bookmark without deleting it
- Both group and bookmark icon names can be looked up on [Iconify](https://icon-sets.iconify.design)
- This page has no custom content area and no comment section
:::
