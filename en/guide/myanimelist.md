# MyAnimeList

The MyAnimeList page displays your **anime and manga** lists from [MyAnimeList](https://myanimelist.net/), split by category (Anime / Manga) and then grouped by watch/read status, with your score, progress, community mean and genres shown on each card.

> This page is static (fetched at build time) because the MAL API v2 does not support CORS, so it cannot be requested in real time from the browser.

## Enable the Page

Enable the MyAnimeList page in `src/config/siteConfig.ts`:

```ts
pages: {
  mal: true,
},
```

Once enabled, a MyAnimeList entry appears automatically under the "Mine" navbar group. When disabled, the entry is hidden and visiting `/myanimelist/` redirects to 404.

::: tip
Besides the `pages.mal` toggle in the config, you can also set the `PUBLIC_PAGES_MAL=true` / `=false` environment variable on your deployment platform to enable/disable this page without touching the config file.
:::

## Getting a Client ID

Reading a public list only needs a **Client ID** — no OAuth login, no client secret:

1. Open <https://myanimelist.net/apiconfig> and sign in
2. Click **Create ID** and register a new application (any name, e.g. `my blog`)
3. Put the generated **Client ID** into the config below

::: warning
This method can only read **public** lists. If the target list is private, the MAL API returns 403. The Client ID itself is safe to commit, but it is only for reading public data — don't abuse it.
:::

## Configuration

Configure MyAnimeList in `src/config/siteConfig.ts`:

```ts
mal: {
  // MyAnimeList username (the list must be public)
  username: "your_username",
  // MyAnimeList Client ID from https://myanimelist.net/apiconfig
  clientId: "your_client_id",
  // MAL API URL
  apiUrl: "https://api.myanimelist.net/v2",
  // Anime detail page URL, must end with /
  animeBaseUrl: "https://myanimelist.net/anime/",
  // Manga detail page URL, must end with /
  mangaBaseUrl: "https://myanimelist.net/manga/",
},
```

## Configuration Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `mal.username` | `string` | `""` | MyAnimeList username. The list must be public — private lists cannot be read |
| `mal.clientId` | `string` | `""` | MyAnimeList Client ID from <https://myanimelist.net/apiconfig> |
| `mal.apiUrl` | `string` | `"https://api.myanimelist.net/v2"` | MAL API URL |
| `mal.animeBaseUrl` | `string` | `"https://myanimelist.net/anime/"` | Anime detail page URL prefix, must end with `/` |
| `mal.mangaBaseUrl` | `string` | `"https://myanimelist.net/manga/"` | Manga detail page URL prefix, must end with `/` |
| `pages.mal` | `boolean` | `true` | Enable MyAnimeList page |

::: tip
`pnpm dev` only fetches the first page (100 entries) to keep startup fast. `pnpm build` fetches everything — 100 entries per request, up to 1000 in total, with a 100 ms delay between requests.
:::

### Covers

Covers are hot-linked directly from `cdn.myanimelist.net` and are not downloaded locally. The theme's `imageOptimization.noReferrerDomains` already includes `*.myanimelist.net`, which automatically adds `referrerpolicy="no-referrer"` to those images to avoid hotlink protection issues.

## Page Features

- **Category tabs**: top-level Anime / Manga switch (categories with no entries are hidden)
- **Status filter pills**: anime filtered by watch status (All / Watching / Completed / On Hold / Dropped / Plan to Watch), manga by read status (All / Reading / Completed / On Hold / Dropped / Plan to Read)
- **Card details**: cover, title with English/Japanese alternate title, year (season for anime, start year for manga), progress (watched/total episodes for anime, read/total chapters and volumes for manga), your score (status badge top-left, star badge top-right), MAL mean, up to 3 genres (`+N` for the rest)
- **Detail link**: clicking a card opens the entry on MyAnimeList
- **Pagination**: 24 entries per page
