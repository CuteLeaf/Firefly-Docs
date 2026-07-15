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

## Moment Configuration

Configure the page in `src/config/dynamicConfig.ts`:

```ts
export const dynamicConfig = {
	title: "",
	description: "",
	showComment: true,
	itemsPerPage: 10,
};
```

| Option | Description |
| --- | --- |
| `title` | Page title. Uses the i18n translation when empty |
| `description` | Page description. Uses the i18n translation when empty |
| `showComment` | Whether to show a comment entry for each moment |
| `itemsPerPage` | Number of moments shown per page |

The page switch is in `src/config/siteConfig.ts`:

```ts
pages: {
	dynamic: true,
}
```

When disabled, the Moments page, navigation entry, and Moments sidebar widget are hidden.
