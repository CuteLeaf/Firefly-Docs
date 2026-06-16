# Navbar

The navbar configuration controls the top navigation menu links and search functionality.

## Config File

`src/config/navBarConfig.ts`

## Preset Links

Firefly provides built-in navigation link presets:

| Preset | Description |
|--------|-------------|
| `LinkPresets.Home` | Home page |
| `LinkPresets.Archive` | Archive |
| `LinkPresets.Categories` | Categories |
| `LinkPresets.Tags` | Tags |
| `LinkPresets.Friends` | Friends |
| `LinkPresets.Sponsor` | Sponsor |
| `LinkPresets.Guestbook` | Guestbook |
| `LinkPresets.About` | About |
| `LinkPresets.Bangumi` | Bangumi |
| `LinkPresets.Gallery` | Gallery |

## Custom Links

Custom links support the following properties:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | `string` | Yes | Link name |
| `url` | `string` | Yes | Link URL |
| `icon` | `string` | No | Icon (Iconify format) |
| `external` | `boolean` | No | External link |
| `children` | `array` | No | Submenu items (supports nesting) |
| `pageKey` | `string` | No | Key in `siteConfig.pages`, used to dynamically show/hide the link |

## Example

```ts
import { type NavBarLink } from "../types/navBarConfig";
import { LinkPresets } from "../config/navBarConfig";

const links: NavBarLink[] = [
  LinkPresets.Home,
  LinkPresets.Archive,

  // Custom link with submenu
  {
    name: "Links",
    url: "/links/",
    icon: "material-symbols:link",
    children: [
      {
        name: "GitHub",
        url: "https://github.com/CuteLeaf/Firefly",
        external: true,
        icon: "fa7-brands:github",
      },
    ],
  },

  LinkPresets.Friends,
];
```

## Search Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `method` | `NavBarSearchMethod` | `NavBarSearchMethod.PageFind` | Search method, currently supports PageFind |

## Dynamic Navbar

The navbar automatically adjusts based on `siteConfig.pages` settings. Set the `pageKey` property on a link to connect it to a page toggle.

### How It Works

Set `pageKey` on a `NavBarLink` to match a key in `siteConfig.pages`:

```ts
// siteConfig.ts
pages: {
  friends: true,    // Friends page enabled
  guestbook: false, // Guestbook page disabled
  bangumi: true,    // Bangumi enabled
  gallery: false,   // Gallery disabled
  sponsor: true,    // Sponsor enabled
}
```

```ts
// navBarConfig.ts - set pageKey
LinkPresets.Friends    // pageKey: "friends"
LinkPresets.Guestbook  // pageKey: "guestbook"
LinkPresets.Bangumi    // pageKey: "bangumi"
```

When a page is disabled (`false`):

- The corresponding navbar link is hidden
- If all children of a parent menu are hidden, the parent menu is also hidden
- If only one child remains, it is shown directly (parent wrapper removed)

### Examples

| Config | Effect |
|--------|--------|
| `siteConfig.pages.guestbook = false` | Guestbook link hidden |
| `siteConfig.pages.sponsor = false` | Sponsor link hidden |
| `siteConfig.pages.bangumi = false` | Bangumi link hidden |
| `siteConfig.pages.gallery = false` | Gallery link hidden |
| `pages.gallery = false` and `pages.bangumi = false` | "My" entire menu hidden |

::: tip
Pre-installed icon sets: `fa7-brands`, `fa7-regular`, `fa7-solid`, `material-symbols`, `simple-icons`. Visit [icones.js.org](https://icones.js.org/) for icon codes. Install additional sets with: `pnpm add @iconify-json/<icon-set-name>`.
:::
