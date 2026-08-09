# VNDB

The VNDB page displays your visual novel list from [VNDB](https://vndb.org/), grouped by collection status, with vote, playtime, developer and notes shown on each card.

## Enable the Page

Enable the VNDB page in `src/config/siteConfig.ts`:

```ts
pages: {
  vndb: true,
},
```

Once enabled, a VNDB entry appears automatically under the "Mine" navbar group. When disabled, the entry is hidden and visiting `/vndb/` redirects to 404.

## Configuration

Configure VNDB in `src/config/siteConfig.ts`:

```ts
vndb: {
  // VNDB user ID
  userId: "u2",
  // Data mode: static=fetch at build, dynamic=fetch in browser
  mode: "static",
  // Download and compress covers into public/vndb-covers at build time
  downloadCovers: true,
  // VNDB API URL
  apiUrl: "https://api.vndb.org/kana",
  // Entry detail page URL, must end with /
  vnBaseUrl: "https://vndb.org/",
  // Access token for private lists, static mode only
  apiToken: "",
  // Blur NSFW covers
  blurNsfw: true,
},
```

## Configuration Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `vndb.userId` | `string` | `""` | VNDB user ID, e.g. `u2`. The page shows a "not configured" notice when empty |
| `vndb.mode` | `"static" \| "dynamic"` | `"static"` | Data fetching mode |
| `vndb.downloadCovers` | `boolean` | `false` | Download and compress covers locally at build time. `static` mode only |
| `vndb.apiUrl` | `string` | `"https://api.vndb.org/kana"` | VNDB API URL |
| `vndb.vnBaseUrl` | `string` | `"https://vndb.org/"` | Entry detail page URL prefix, must end with `/` |
| `vndb.apiToken` | `string` | `""` | Access token for private lists. `static` mode only |
| `vndb.blurNsfw` | `boolean` | `true` | Whether to blur NSFW covers |
| `pages.vndb` | `boolean` | `true` | Enable VNDB page |

::: tip
The config file shipped with the theme sets `downloadCovers` to `true`. Set it to `false` if you don't want covers downloaded at build time.
:::

### User ID

Open your VNDB profile page — the segment after `https://vndb.org/` is your user ID. For example, `https://vndb.org/u2` means `userId` is `u2`.

### Data Mode

| Mode | Description |
|------|-------------|
| `static` | Fetches data at build time and renders statically. Data does not update after deployment until you rebuild. Supports private lists (`apiToken`) and local covers (`downloadCovers`) |
| `dynamic` | Fetches from the VNDB API in the browser, always showing the latest data with no rebuild needed. Does not support `apiToken` or local covers, so the list must be public |

::: tip
In `static` mode, `pnpm dev` only fetches the first page (100 entries) to keep startup fast. `pnpm build` fetches everything — 100 entries per request, up to 1000 in total, with a 100 ms delay between requests.
:::

### Private Lists

VNDB lists are public by default, and no token is needed in that case. If your list is private, generate an API token in your VNDB account settings, put it in `apiToken`, and set `mode` to `static` — `dynamic` mode requests are made from the visitor's browser and never carry the token.

::: warning
`apiToken` is equivalent to account credentials. Never commit it to a public repository. If your repository is public, use `dynamic` mode with a public list instead.
:::

### Local Covers

When `downloadCovers` is `true`, `pnpm build` runs `scripts/generate-vndb-covers.ts` before `astro build`:

- Fetches the list, downloads each entry's cover thumbnail, compresses it with sharp into a 400px-wide WebP (quality 82), and writes it to `public/vndb-covers/<entry ID>.webp`
- Runs 4 downloads concurrently and skips files that already exist, so repeated builds make almost no extra requests
- At render time, if the local file exists, the cover URL is swapped to `/vndb-covers/xxx.webp` so images are served from your own server instead of VNDB's image host

Downloading only happens when all three conditions hold: `userId` is set, `downloadCovers` is `true`, and `mode` is `static`. Otherwise the script logs the reason and exits.

::: tip
`public/vndb-covers/` is listed in `.gitignore`, so it never enters the repository. That means platforms like Vercel and Cloudflare re-download every cover on each build. With a large list, cache this directory in CI, or commit the covers by removing that line from `.gitignore`.
:::

### NSFW Covers

When `blurNsfw` is `true` (the default), covers whose VNDB image flags rate `sexual` or `violence` above 1 get a 20px blur. This is presentation only — the image itself is still loaded normally. Set it to `false` to show originals.

## Page Features

- **Status tabs**: grouped by VNDB collection labels (Wishlist / Playing / Finished / Stalled / Dropped), each with an entry count. Custom labels are appended under their original names
- **Secondary filters**: All / Voted / Unvoted / With notes
- **Card details**: cover, title and alternate title, release year, length rating with estimated playtime, your vote (status badge top-left, star badge top-right), VNDB rating and vote count, developer / languages / platforms, up to 3 tags (`+N` for the rest), play start and finish dates, notes
- **Detail link**: clicking a card opens the entry on VNDB
- **Pagination**: 24 entries per page
