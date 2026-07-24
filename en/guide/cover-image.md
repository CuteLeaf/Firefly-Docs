# Cover Image

The cover image configuration controls post cover display and random cover image functionality.

## Config File

`src/config/coverImageConfig.ts`

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enableInPost` | `boolean` | `true` | Show cover image on post detail pages |
| `enableInPostOverlay` | `boolean` | `true` | Overlay the title and metadata on the post cover; disable it to use the classic layout |
| `showLoading` | `boolean` | `false` | Show loading animation |
| `randomCoverImage.enable` | `boolean` | `false` | Enable random cover image |
| `randomCoverImage.apis` | `string[]` | - | Random image API list |
| `randomCoverImage.fallback` | `string` | `"assets/images/cover.avif"` | Fallback image when APIs fail |

## Example

```ts
export const coverImageConfig: CoverImageConfig = {
  enableInPost: true,
  enableInPostOverlay: true,
  showLoading: false,
  randomCoverImage: {
    enable: false,
    apis: [
      "https://t.alcy.cc/pc",
      "https://www.dmoe.cc/random.php",
      "https://uapis.cn/api/v1/random/image?category=acg&type=pc",
    ],
    fallback: "assets/images/cover.avif",
  },
};
```

## Using Random Cover Images

Set `image` to `"api"` in your post's frontmatter:

```yaml
---
title: Post Title
image: "api"
---
```

The system will try each configured API in order, falling back to the `fallback` image if all fail.
