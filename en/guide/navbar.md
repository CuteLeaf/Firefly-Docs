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

The navbar automatically adjusts based on `siteConfig.pages` settings:

- `pages.guestbook: false` — hides Guestbook link
- `pages.sponsor: false` — hides Sponsor link
- `pages.bangumi: false` — hides Bangumi link

::: tip
Pre-installed icon sets: `fa7-brands`, `fa7-regular`, `fa7-solid`, `material-symbols`, `simple-icons`. Visit [icones.js.org](https://icones.js.org/) for icon codes. Install additional sets with: `pnpm add @iconify-json/<icon-set-name>`.
:::
