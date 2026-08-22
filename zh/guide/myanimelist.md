# MyAnimeList

MyAnimeList 页面用于展示你在 [MyAnimeList](https://myanimelist.net/) 上的**动画与漫画**收藏列表，按「动画 / 漫画」分类、再按观看/阅读状态分组，卡片上带有评分、进度、平均分、类型等信息，适合非中文用户阅读。

> 本页面为静态数据（构建时获取），因为 MAL API v2 不支持 CORS，无法在浏览器中实时请求。

## 启用页面

在 `src/config/siteConfig.ts` 中启用 MyAnimeList 页面：

```ts
pages: {
  mal: true,
},
```

启用后导航栏「我的」分组下会自动出现 MyAnimeList 入口；关闭时入口自动隐藏，直接访问 `/myanimelist/` 会跳转到 404。

::: tip
除了配置文件里的 `pages.mal` 开关，也可以在部署平台设置环境变量 `PUBLIC_PAGES_MAL=true` 开启、`=false` 关闭该页面，无需修改配置文件。
:::

## 获取 Client ID

读取公开列表只需要一个 **Client ID**，不需要 OAuth 登录、不需要 Client Secret：

1. 打开 <https://myanimelist.net/apiconfig> 并登录
2. 点击 **Create ID** 注册一个新应用（名称随意，例如 `my blog`）
3. 把生成的 **Client ID** 填入下面的配置

::: warning
该方式只能读取 **公开** 列表。如果目标列表设置为私密，MAL API 会返回 403。Client ID 本身可公开提交，但它只用于读取公开数据，请勿滥用。
:::

## 配置

在 `src/config/siteConfig.ts` 中配置 MyAnimeList：

```ts
mal: {
  // MyAnimeList 用户名（列表需为公开状态）
  username: "your_username",
  // MyAnimeList Client ID，在 https://myanimelist.net/apiconfig 注册应用后获取
  clientId: "your_client_id",
  // MAL API 地址
  apiUrl: "https://api.myanimelist.net/v2",
  // 动画条目详情页地址，末尾需要带 /
  animeBaseUrl: "https://myanimelist.net/anime/",
  // 漫画条目详情页地址，末尾需要带 /
  mangaBaseUrl: "https://myanimelist.net/manga/",
},
```

## 配置参考

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `mal.username` | `string` | `""` | MyAnimeList 用户名。列表需为公开状态，私密列表无法读取 |
| `mal.clientId` | `string` | `""` | MyAnimeList Client ID，从 <https://myanimelist.net/apiconfig> 注册免费应用后获取 |
| `mal.apiUrl` | `string` | `"https://api.myanimelist.net/v2"` | MAL API 地址 |
| `mal.animeBaseUrl` | `string` | `"https://myanimelist.net/anime/"` | 动画条目详情页地址前缀，末尾需要带 `/` |
| `mal.mangaBaseUrl` | `string` | `"https://myanimelist.net/manga/"` | 漫画条目详情页地址前缀，末尾需要带 `/` |
| `mal.nsfw` | `"off" \| "blur" \| "hide"` | `"off"` | NSFW 处理：`off` 全部显示，`blur` 模糊封面，`hide` 隐藏条目（按 genre 匹配，如 Hentai） |
| `pages.mal` | `boolean` | `true` | 是否启用 MyAnimeList 页面 |

::: tip
`pnpm dev` 只获取第一页（100 条）以加快启动速度，`pnpm build` 才会获取全部数据 —— 每次请求 100 条，最多 1000 条，请求之间间隔 100 毫秒。
:::

### NSFW

`mal.nsfw` 控制 NSFW 条目的处理方式。MAL 的列表接口不提供内容评级，因此按 genre 匹配：`"blur"` 会把 genre 列表里含 `Hentai` 的条目封面模糊化，`"hide"` 会将这些条目整体移除，`"off"` 全部照常显示。

### 封面说明

封面直接热链 `cdn.myanimelist.net` 的图片，不会下载到本地。主题自带的 `imageOptimization.noReferrerDomains` 已包含 `*.myanimelist.net`，会自动为这些图片加上 `referrerpolicy="no-referrer"`，避免防盗链问题。

## 页面功能

- **分类标签页**：顶部按「动画 / 漫画」分类（分类下没有条目的自动隐藏）
- **状态胶囊筛选**：动画按观看状态筛选（全部 / 在看 / 已看完 / 搁置 / 抛弃 / 想看），漫画按阅读状态筛选（全部 / 在读 / 已看完 / 搁置 / 抛弃 / 想读）
- **卡片信息**：封面、标题与英文/日文副标题、年份（动画显示季度，漫画显示起始年份）、进度（动画为已看/总集数，漫画为已读/总章节及卷数）、你的评分（左上角状态、右上角星标）、MAL 平均分、最多 3 个类型标签（超出显示 `+N`）
- **详情链接**：点击卡片跳转到 MyAnimeList 对应条目详情页
- **分页浏览**：每页 24 条
