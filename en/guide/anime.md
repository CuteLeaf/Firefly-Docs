# Anime Tracking

The anime page displays your anime tracking list, with data fetched from Bilibili and TMDB.

## Enable the Page

Enable the anime page in `src/config/siteConfig.ts`:

```ts
pages: {
  anime: true,
},
```

## Data Source Configuration

Configure data sources in `src/config/siteConfig.ts`:

```ts
anime: {
  // Bilibili configuration
  bilibili: {
    // Your Bilibili user UID
    uid: "your_bilibili_uid",
  },
  // TMDB configuration (optional, requires access to TMDB API)
  tmdb: {
    // TMDB API key
    apiKey: "your_tmdb_api_key",
    // TMDB list ID
    listId: "your_list_id",
  },
},
```

::: tip
- Bilibili UID can be found in your Bilibili profile URL
- TMDB API Key needs to be obtained from [themoviedb.org](https://www.themoviedb.org/settings/api)
- TMDB List ID is the ID of your created anime list
- You can configure one or both data sources (duplicates are automatically merged)
:::

## Data Merge Rules

When both Bilibili and TMDB are configured:

1. Data from both sources is automatically merged
2. If the same anime exists in both sources, **Bilibili data takes priority** (because it includes watch progress info)
3. Duplicates are removed by title after merging

## Page Features

- **Search**: Search anime by title
- **Filter**: Filter by type (All / TV / Movie)
- **Sort**: Sort by rating or date (ascending/descending)
- **Pagination**: Automatic pagination
- **Detail Modal**: Click a card to view anime details
- **LQIP**: Blurred placeholder shown while images load

## Configuration Reference

| Property | Type | Description |
|----------|------|-------------|
| `anime.bilibili.uid` | `string` | Bilibili user UID |
| `anime.tmdb.apiKey` | `string` | TMDB API key |
| `anime.tmdb.listId` | `string` | TMDB list ID |
| `pages.anime` | `boolean` | Enable anime page |
