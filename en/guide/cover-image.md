# Cover Image

The cover image configuration controls post cover display and random cover image functionality.

## Config File

`src/config/coverImageConfig.ts`

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enableInPost` | `boolean` | `true` | Show cover image on post detail pages |
| `randomCoverImage.enable` | `boolean` | `false` | Enable random cover image |
| `randomCoverImage.apis` | `string[]` | - | Random image API list |
| `randomCoverImage.fallback` | `string` | `"assets/images/cover.avif"` | Fallback image when APIs fail |
| `randomCoverImage.showLoading` | `boolean` | `false` | Show loading animation |

## Example

```ts
export const coverImageConfig: CoverImageConfig = {
  enableInPost: true,
  randomCoverImage: {
    enable: false,
    apis: [
      "https://t.alcy.cc/pc",
      "https://www.dmoe.cc/random.php",
      "https://uapis.cn/api/v1/random/image?category=acg&type=pc",
    ],
    fallback: "assets/images/cover.avif",
    showLoading: false,
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
