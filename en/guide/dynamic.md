# Moments

The Moments page is for short thoughts and images. It is intended for quick daily updates without the title and metadata required by a full post.

## Publishing a Moment

Store moment files in `src/content/dynamic/`. Each Markdown file becomes one moment. The only required frontmatter field is `published`:

```yaml
---
published: 2026-07-15 16:15:29
---

The weather is great today, so I went out for hot pot.
```

The time is displayed as written in frontmatter. A timezone label calculated from `siteConfig.timezone` is appended after the date.

You can also create a moment from the command line:

```bash
pnpm new-dynamic The weather is great today
pnpm new-d A quiet evening at home
```

Moments support regular Markdown syntax. Images are automatically arranged at the bottom of the content and support grid, carousel, and lightbox views.

### Pinned Moments

Add `pinned: true` to the frontmatter to pin a moment. Pinned moments are displayed first:

```yaml
---
published: 2026-07-15 16:15:29
pinned: true
---

This is a pinned moment.
```

## Moment Configuration

Configure the page in `src/config/dynamicConfig.ts`:

```ts
export const dynamicConfig = {
	title: "",
	description: "",
	showComment: true,
	itemsPerPage: 20,
	apiUrl: "/api/dynamic.json",
	memos: {
		enable: false,
		apiUrl: "https://memos.example.com",
		parent: "users/your-username",
	},
};
```

| Option | Description |
| --- | --- |
| `title` | Page title. Uses the i18n translation when empty |
| `description` | Page description. Uses the i18n translation when empty |
| `showComment` | Whether to show a comment entry for each moment |
| `itemsPerPage` | Number of moments shown per page |
| `apiUrl` | Moments data API URL. Defaults to `/api/dynamic.json`. Ignored when `memos.enable` is true |

### Memos Data Source

Supports connecting to a [Memos](https://www.usememos.com/) instance for real-time data:

```ts
memos: {
	enable: true,
	apiUrl: "https://memos.example.com",
	parent: "users/xiaye",
},
```

| Option | Description |
| --- | --- |
| `enable` | Whether to enable Memos data source |
| `apiUrl` | Memos instance URL |
| `parent` | User identifier to filter moments for a specific user |

When enabled, the client fetches data directly from the Memos API in real-time, supporting pinned sync, image attachments, and more.


### Custom API URL

`apiUrl` supports two formats:

- **Relative path** (default): `"/api/dynamic.json"` — uses the locally built JSON file
- **Absolute URL**: `"https://firefly.cuteleaf.cn/api/dynamic.json"` — uses a third-party endpoint

The third-party endpoint must return the following JSON structure:

```json
[
  {
    "id": "dynamic-id",
    "published": 1721059200000,
    "html": "<p>Moment content HTML</p>",
    "images": [
      { "alt": "Image description", "src": "/path/to/image.jpg" }
    ],
    "searchText": "Plain text for search",
    "pinned": false
  }
]
```

::: tip
The sidebar "Latest Moments" widget also fetches data from this URL, making it easy to integrate with a unified third-party backend.
:::

The page switch is in `src/config/siteConfig.ts`:

```ts
pages: {
	dynamic: true,
}
```

When disabled, the Moments page, navigation entry, and Moments sidebar widget are hidden.
