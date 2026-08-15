# Bilibili Tracking Page

The Bilibili page displays your Bilibili anime and drama tracking list, fetched from your Bilibili profile.

## Enable the Page

Enable the Bilibili page in `src/config/siteConfig.ts`:

```ts
pages: {
  bilibili: true,
},
```

::: tip
Besides the `pages.bilibili` toggle in the config, you can also set the `PUBLIC_PAGES_BILIBILI=true` / `=false` environment variable on your deployment platform to enable/disable this page without touching the config file.
:::

## Configuration

Configure Bilibili in `src/config/siteConfig.ts`:

```ts
bilibili: {
  // Your Bilibili user UID
  uid: "your_bilibili_uid",
},
```

::: tip
Your Bilibili UID can be found in your profile URL. For example, `https://space.bilibili.com/38932988` has the UID `38932988`.
:::

## Page Features

- **Search**: Search anime by title
- **Filter**: Filter by type (All / TV / Movie / Documentary / Chinese Animation / Drama / Concert)
- **Sort**: Sort by rating or date (ascending/descending)
- **Pagination**: Automatic pagination
- **Detail Modal**: Click a card to view anime details and jump to Bilibili to watch
- **LQIP**: Blurred placeholder shown while images load

## Configuration Reference

| Property | Type | Description |
|----------|------|-------------|
| `bilibili.uid` | `string` | Bilibili user UID |
| `pages.bilibili` | `boolean` | Enable Bilibili page |
