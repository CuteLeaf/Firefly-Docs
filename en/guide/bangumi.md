# Bangumi

The Bangumi page displays your collection from [Bangumi](https://bangumi.tv/), supporting anime, books, music, games and more.

## Enable the Page

Enable the Bangumi page in `src/config/siteConfig.ts`:

```ts
pages: {
  bangumi: true,
},
```

## Configuration

Configure Bangumi in `src/config/siteConfig.ts`:

```ts
bangumi: {
  // Bangumi user ID
  userId: "your_user_id",
  // Data mode: static=fetch at build, dynamic=fetch in browser
  mode: "dynamic",
  // Bangumi API URL
  apiUrl: "https://api.bangumi.one",
  // Subject detail page URL
  subjectBaseUrl: "https://bangumi.one/subject/",
  // Category display order
  categoryOrder: ["anime", "book", "music", "game"],
},
```

## Configuration Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `bangumi.userId` | `string` | - | Bangumi user ID |
| `bangumi.mode` | `"static" \| "dynamic"` | `"dynamic"` | Data fetching mode |
| `bangumi.apiUrl` | `string` | `"https://api.bangumi.one"` | Bangumi API URL |
| `bangumi.subjectBaseUrl` | `string` | `"https://bangumi.one/subject/"` | Subject detail page URL prefix |
| `bangumi.categoryOrder` | `string[]` | `["anime", "book", "music", "game"]` | Category display order |
| `pages.bangumi` | `boolean` | `false` | Enable Bangumi page |

### Data Mode

| Mode | Description |
|------|-------------|
| `static` | Fetches data at build time and statically renders. Data won't update until the next rebuild |
| `dynamic` | Fetches data in the browser in real-time. Always shows the latest data without rebuilding |

::: tip
`dynamic` mode is recommended so you don't need to redeploy to sync your latest collection data.
:::

### Category Order

Categories in `categoryOrder` are displayed first in the specified order. Unlisted categories appear after them.

Available values: `"anime"`, `"book"`, `"music"`, `"game"`

```ts
// Only show anime and games
categoryOrder: ["anime", "game"],

// Books first
categoryOrder: ["book", "anime", "music", "game"],
```

## Page Features

- **Category Tabs**: Browse by category (Anime, Books, Music, Games)
- **Status Filter**: Filter by collection status (Wish / Watched / Watching / On Hold / Dropped)
- **Rating Display**: Shows Bangumi score and your personal rating
- **Detail Links**: Click a card to visit the Bangumi subject page
- **Pagination**: Browse large collections with pagination
