# 音乐播放器

Firefly 内置了音乐播放器，支持 Meting API（在线音乐平台）和本地音乐两种模式。

## 配置文件

`src/config/musicConfig.ts`

## 基础配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `showInNavbar` | `boolean` | `true` | 是否在导航栏显示音乐播放器入口 |
| `showInSidebar` | `boolean` | `true` | 是否在侧边栏显示音乐播放器组件 |
| `mode` | `string` | `"meting"` | 使用方式：`"meting"` 在线平台、`"local"` 本地音乐 |
| `volume` | `number` | `0.7` | 默认音量（0-1） |
| `playMode` | `string` | `"list"` | 播放模式：`"list"` 列表循环、`"one"` 单曲循环、`"random"` 随机播放 |
| `showLyrics` | `boolean` | `true` | 是否启用歌词显示 |

::: tip
音乐播放器有两个显示位置：
1. **侧边栏**：将 `showInSidebar` 设为 `false` 可禁用
2. **导航栏**：将 `showInNavbar` 设为 `false` 可禁用
:::

## Meting API 模式

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `meting.api` | `string` | 默认官方 API | Meting API 地址 |
| `meting.server` | `string` | `"netease"` | 音乐平台：`"netease"` `"tencent"` `"kugou"` `"xiami"` `"baidu"` |
| `meting.type` | `string` | `"playlist"` | 类型：`"song"` `"playlist"` `"album"` `"search"` `"artist"` |
| `meting.id` | `string` | - | 歌单/专辑/单曲 ID 或搜索关键词 |
| `meting.auth` | `string` | `""` | 认证 token（可选） |
| `meting.fallbackApis` | `string[]` | - | 备用 API 列表（主 API 失败时使用） |

```ts
meting: {
  api: "https://api.i-meto.com/meting/api?server=:server&type=:type&id=:id&r=:r",
  server: "netease",
  type: "playlist",
  id: "10046455237",
  fallbackApis: [
    "https://api.injahow.cn/meting/?server=:server&type=:type&id=:id",
  ],
},
```

## 本地音乐模式

当 `mode` 为 `"local"` 时，使用本地音乐配置。

### 播放列表项属性

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `name` | `string` | 是 | 歌曲名称 |
| `artist` | `string` | 是 | 艺术家 |
| `url` | `string` | 是 | 音乐文件路径（相对于 public 目录） |
| `cover` | `string` | 否 | 封面图片路径 |
| `lrc` | `string` | 否 | 歌词（支持 LRC 文件路径或直接写入歌词字符串） |

```ts
local: {
  playlist: [
    {
      name: "歌曲名称",
      artist: "艺术家",
      url: "/assets/music/song.mp3",
      cover: "/assets/music/cover/cover.webp",
      lrc: "/assets/music/lrc/song.lrc",
    },
  ],
},
```
