# VNDB

VNDB 页面用于展示你在 [VNDB](https://vndb.org/) 上的视觉小说收藏列表，按收藏状态分组，卡片上带有评分、游玩时长、开发商、笔记等信息。

## 启用页面

在 `src/config/siteConfig.ts` 中启用 VNDB 页面：

```ts
pages: {
  vndb: true,
},
```

启用后导航栏「我的」分组下会自动出现 VNDB 入口；关闭时入口自动隐藏，直接访问 `/vndb/` 会跳转到 404。

::: tip
除了配置文件里的 `pages.vndb` 开关，也可以在部署平台设置环境变量 `PUBLIC_PAGES_VNDB=true` 开启、`=false` 关闭该页面，无需修改配置文件。
:::

## 配置

在 `src/config/siteConfig.ts` 中配置 VNDB：

```ts
vndb: {
  // VNDB 用户 ID
  userId: "u2",
  // 数据模式：static=构建时获取，dynamic=客户端实时获取
  mode: "static",
  // 构建时下载并压缩封面到 public/vndb-covers，图片由本站服务器提供
  downloadCovers: true,
  // VNDB API 地址
  apiUrl: "https://api.vndb.org/kana",
  // 条目详情页地址，末尾需要带 /
  vnBaseUrl: "https://vndb.org/",
  // 私密列表访问令牌，仅 static 模式下使用
  apiToken: "",
  // 对 NSFW 的游戏封面模糊化
  blurNsfw: true,
},
```

## 配置参考

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `vndb.userId` | `string` | `""` | VNDB 用户 ID，形如 `u2`。留空时页面会显示未配置提示 |
| `vndb.mode` | `"static" \| "dynamic"` | `"static"` | 数据获取模式 |
| `vndb.downloadCovers` | `boolean` | `false` | 构建时把封面下载并压缩到本地，仅 `static` 模式生效 |
| `vndb.apiUrl` | `string` | `"https://api.vndb.org/kana"` | VNDB API 地址 |
| `vndb.vnBaseUrl` | `string` | `"https://vndb.org/"` | 条目详情页地址前缀，末尾需要带 `/` |
| `vndb.apiToken` | `string` | `""` | 私密列表访问令牌，仅 `static` 模式生效 |
| `vndb.blurNsfw` | `boolean` | `true` | 是否模糊 NSFW 封面 |
| `pages.vndb` | `boolean` | `true` | 是否启用 VNDB 页面 |

::: tip
主题自带的配置文件里 `downloadCovers` 已经设为 `true`，如果不想在构建时下载封面，改成 `false` 即可。
:::

### 用户 ID

打开自己的 VNDB 个人主页，地址里 `https://vndb.org/` 后面那段就是用户 ID，例如 `https://vndb.org/u2` 对应的 `userId` 是 `u2`。

### 数据模式

| 模式 | 说明 |
|------|------|
| `static` | 构建时获取数据并静态渲染，部署后数据不会自动更新，需要重新构建。支持私密列表（`apiToken`）和本地封面（`downloadCovers`） |
| `dynamic` | 在浏览器中实时请求 VNDB API，始终显示最新数据，无需重新构建。不支持 `apiToken` 和本地封面，只能读取公开列表 |

::: tip
`static` 模式下，`pnpm dev` 只获取第一页（100 条）以加快启动速度，`pnpm build` 才会获取全部数据 —— 每次请求 100 条，最多 1000 条，请求之间间隔 100 毫秒。
:::

### 私密列表

VNDB 的收藏列表默认对外可见，此时不需要任何令牌。如果你把列表设为私密，需要在 VNDB 的个人设置里生成一个 API Token 填入 `apiToken`，并把 `mode` 设为 `static` —— `dynamic` 模式的请求发生在访客浏览器里，不会携带令牌。

::: warning
`apiToken` 等同于账号凭据，不要提交到公开仓库。如果仓库是公开的，建议改用 `dynamic` 模式读取公开列表。
:::

### 本地封面

`downloadCovers` 为 `true` 时，`pnpm build` 会在 `astro build` 之前执行 `scripts/generate-vndb-covers.ts`：

- 拉取收藏列表，下载每个条目的封面缩略图，用 sharp 压缩成宽 400px 的 WebP（质量 82），输出到 `public/vndb-covers/<条目 ID>.webp`
- 并发 4 个请求；已经存在的文件直接跳过，所以重复构建几乎不会产生额外请求
- 页面渲染时，本地文件存在就把封面地址换成 `/vndb-covers/xxx.webp`，图片由自己的服务器提供，不再直连 VNDB 图床

只有同时满足「`pages.vndb` 为 `true`」「配置了 `userId`」「`downloadCovers` 为 `true`」「`mode` 为 `static`」四个条件才会执行下载，否则脚本会打印一行原因后跳过。

::: tip
`public/vndb-covers/` 在 `.gitignore` 里，不会进仓库。因此在 Vercel、Cloudflare 等平台上每次构建都会重新下载全部封面；条目较多时建议在 CI 里缓存这个目录，或者把封面提交到仓库（从 `.gitignore` 里移除该行）。
:::

### NSFW 封面

`blurNsfw` 为 `true`（默认）时，VNDB 图片标记中 `sexual` 或 `violence` 评级大于 1 的封面会被加上 20px 模糊。这是纯展示层处理，图片本身仍会正常加载。设为 `false` 则原图直接显示。

## 页面功能

- **状态标签页**：按 VNDB 的收藏标签分组（想玩 / 在玩 / 玩过 / 搁置 / 抛弃），每个标签页带条目数；自定义标签会按原名追加在后面
- **二级筛选**：全部 / 已评分 / 未评分 / 有笔记
- **卡片信息**：封面、标题与副标题、发行年份、长度分级与估算时长、你的评分（左上角状态、右上角星标）、VNDB 评分与投票数、开发商 / 语言 / 平台、最多 3 个标签（超出显示 `+N`）、游玩起止日期、笔记
- **详情链接**：点击卡片跳转到 VNDB 条目详情页
- **分页浏览**：每页 24 条
