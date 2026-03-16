# Friends

The friends configuration manages the friend links page display.

## Config File

`src/config/friendsConfig.ts`

## Page Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `title` | `string` | `""` | Page title, uses i18n translation if empty |
| `description` | `string` | `""` | Page description, uses i18n translation if empty |
| `showCustomContent` | `boolean` | `true` | Whether to show custom content at the bottom (friends.mdx) |
| `showComment` | `boolean` | `true` | Whether to show the comment section on the friends page (requires comment system enabled) |
| `randomizeSort` | `boolean` | `false` | Whether to enable random sort. If true, ignores weight and randomizes order once during build |

## Friend Link Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `title` | `string` | Yes | Link title |
| `imgurl` | `string` | Yes | Avatar image URL |
| `desc` | `string` | Yes | Description |
| `siteurl` | `string` | Yes | Site URL |
| `tags` | `string[]` | No | Tags |
| `weight` | `number` | Yes | Sort weight (higher = first) |
| `enabled` | `boolean` | Yes | Whether enabled |

## Example

```ts
export const friendsPageConfig: FriendsPageConfig = {
  // Page title, uses i18n translation if empty
  title: "",
  // Page description, uses i18n translation if empty
  description: "",
  // Whether to show custom content (friends.mdx)
  showCustomContent: true,
  // Whether to show comment section (requires comment system enabled)
  showComment: true,
  // Whether to enable random sort
  randomizeSort: false,
};

export const friendsConfig: FriendLink[] = [
  {
    title: "My Friend",
    imgurl: "https://example.com/avatar.jpg",
    desc: "A great blog",
    siteurl: "https://example.com",
    tags: ["Blog"],
    weight: 10,
    enabled: true,
  },
];
```

## Custom Content

The friends page supports custom content at the bottom via an MDX file located at `src/content/spec/friends.mdx`.

This file uses MDX format (enhanced Markdown) and supports defining variables via `export` at the top of the file for easy customization of site info and notes:

```js
// Site info (for display and copy)
export const site = {
  name: "Your Site Name",
  desc: "Your site description",
  url: "https://your-site.com",
  avatar: "https://your-avatar-url.com/avatar.jpg",
  email: "your@email.com",
};

// Notes list
export const notes = [
  { title: "Exchange Policy", content: "Please add our site to your friends page first" },
  { title: "Link Maintenance", content: "Inaccessible or inappropriate sites will be removed" },
];
```

Set `showCustomContent: false` in the config to hide the custom content section.

Use `siteConfig.pages.friends` to control whether the `/friends/` page is accessible.

When `commentConfig.type !== "none"` and `friendsPageConfig.showComment` is `true`, the friends page comment section is enabled.

::: tip
- The MDX file can be fully rewritten to match your preferences — the default layout is just a reference template
- Set `enabled: false` to temporarily hide a friend link without deleting it
- Links are sorted by `weight` in descending order
:::
