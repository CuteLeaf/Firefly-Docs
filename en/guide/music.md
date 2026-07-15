# Music Player

Firefly includes a built-in music player supporting Meting API (online platforms) and local music.

## Config File

`src/config/musicConfig.ts`

## Basic Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showInNavbar` | `boolean` | `true` | Show music player entry in navbar |
| `showInSidebar` | `boolean` | `true` | Show music player component in the sidebar |
| `mode` | `string` | `"meting"` | Mode: `"meting"` online, `"local"` local files |
| `volume` | `number` | `0.7` | Default volume (0-1) |
| `playMode` | `string` | `"list"` | Play mode: `"list"` loop, `"one"` repeat, `"random"` shuffle |
| `showLyrics` | `boolean` | `true` | Show lyrics |

::: tip
The music player has two display locations:
1. **Sidebar**: Disable by setting `showInSidebar` to `false`
2. **Navbar**: Disable by setting `showInNavbar` to `false`
:::

## Meting API Mode

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `meting.api` | `string` | Official API | Meting API URL |
| `meting.server` | `string` | `"netease"` | Platform: `"netease"` `"tencent"` `"kugou"` `"xiami"` `"baidu"` |
| `meting.type` | `string` | `"playlist"` | Type: `"song"` `"playlist"` `"album"` `"search"` `"artist"` |
| `meting.id` | `string` | - | Playlist/album/song ID or search keyword |
| `meting.auth` | `string` | `""` | Auth token (optional) |
| `meting.fallbackApis` | `string[]` | - | Fallback API list |

```ts
meting: {
  server: "netease",
  type: "playlist",
  id: "10046455237",
  fallbackApis: [
    "https://api.injahow.cn/meting/?server=:server&type=:type&id=:id",
  ],
},
```

## Local Music Mode

When `mode` is `"local"`, use local music configuration.

### Playlist Item Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | `string` | Yes | Song name |
| `artist` | `string` | Yes | Artist |
| `url` | `string` | Yes | Music file path (relative to public directory) |
| `cover` | `string` | No | Cover image path |
| `lrc` | `string` | No | Lyrics (LRC file path or inline lyrics string) |

```ts
local: {
  playlist: [
    {
      name: "Song Title",
      artist: "Artist Name",
      url: "/assets/music/song.mp3",
      cover: "/assets/music/cover/cover.webp",
      lrc: "/assets/music/lrc/song.lrc",
    },
  ],
},
```
