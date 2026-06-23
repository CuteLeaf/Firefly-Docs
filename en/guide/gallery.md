# Gallery

The gallery feature provides a two-level photo display: the index page shows all album cover cards, and clicking an album opens the detail page with photos in a masonry layout.

Photos are placed in the `public/gallery/{album-id}/` directory and automatically discovered at build time — no need to configure each photo individually.

## Config File

`src/config/galleryConfig.ts`

## Enabling Gallery

Make sure the following is set in `src/config/siteConfig.ts`:

```ts
pages: {
  gallery: true,
}
```

## Usage

Just two steps:

### 1. Configure Album Metadata

Add albums in `src/config/galleryConfig.ts`:

```ts
export const galleryConfig: GalleryConfig = {
  albums: [
    {
      id: "shanghai-2025",        // Corresponds to public/gallery/shanghai-2025/
      name: "Shanghai Trip",
      description: "Beautiful memories of Shanghai",
      location: "Shanghai",
      date: "2025-04-10",
      tags: ["Travel", "Shanghai"],
    },
  ],
  columnWidth: 240,
};
```

### 2. Add Photos

Place photos in the corresponding directory:

```
public/gallery/japan-2025/
  ├── cover.jpg    ← Automatically used as cover (optional)
  ├── 01.jpg
  ├── 02.png
  └── 03.webp
```

All image files in the directory are automatically scanned at build time. Supported formats: `jpg`, `png`, `webp`, `avif`, `gif`.

To include remote images, create a `urls.txt` file in the album directory with one image URL per line (lines starting with `#` are comments):

```
public/gallery/japan-2025/
  ├── cover.jpg
  ├── 01.jpg
  └── urls.txt
```

```txt title="urls.txt"
# Remote images
https://example.com/photo1.jpg
https://example.com/photo2.png
```

Local and remote images are merged at build time and displayed together in the masonry layout.

## Album Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier, used as directory name and URL path |
| `name` | `string` | Yes | Album name |
| `description` | `string` | No | Album description |
| `date` | `string` | No | Date in `YYYY-MM-DD` format |
| `location` | `string` | No | Photo location |
| `tags` | `string[]` | No | Tags for filtering on the index page |
| `cover` | `string` | No | Manually specify cover image — supports local paths (e.g. `/gallery/album/cover.jpg`) and external URLs (e.g. `https://example.com/cover.jpg`) |
| `password` | `string` | No | Album password — requires password to view |
| `passwordHint` | `string` | No | Password hint to help visitors recall the password |

## Global Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `columnWidth` | `number` | `240` | Minimum column width (px) for masonry layout. The browser automatically calculates the number of columns based on container width |

::: tip About `columnWidth`
A smaller value results in more columns; a larger value results in fewer columns. The browser automatically determines how many columns to display based on the container width — no need to set column count manually.
:::

## Cover Image Rules

Cover images are automatically selected by priority:

1. **Manual**: If the `cover` property is set, that image is used
2. **Cover file**: A file named `cover.*` in the directory (e.g., `cover.jpg`, `cover.png`)
3. **First image**: The first image sorted alphabetically by filename

## Page Routes

| Route | Description |
|-------|-------------|
| `/gallery/` | Gallery index — displays all album cover cards with tag filtering |
| `/gallery/{id}/` | Album detail — masonry photo grid, click to open lightbox preview |

## Configuration Example

```ts
import type { GalleryConfig } from "@/types/galleryConfig";

export const galleryConfig: GalleryConfig = {
  albums: [
    {
      id: "firefly-2026",
      name: "Cute Firefly",
      description: "The fire of fireflies lights up from the dreamless long night.",
      location: "Honkai: Star Rail",
      date: "2026-01-01",
      tags: ["Honkai Star Rail", "Firefly"],
    },
    {
      id: "travel-shanghai",
      name: "Shanghai Trip",
      description: "Beautiful memories of Shanghai",
      location: "Shanghai",
      date: "2025-04-10",
      tags: ["Travel", "Shanghai"],
      cover: "/gallery/travel-shanghai/best-photo.jpg",
    },
  ],
  columnWidth: 240,
};
```

::: tip
- Each array item represents an album — remember to create the corresponding subdirectory under `public/gallery/` and add photos
- Clicking a photo in the album detail page opens a FancyBox lightbox with left/right navigation
- Tag filtering on the gallery index is automatically generated from each album's `tags` property
- Images use native browser lazy loading — no extra configuration needed
- Both the `cover` property and `urls.txt` support external image URLs (`https://...`)
:::
