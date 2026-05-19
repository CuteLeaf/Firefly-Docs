# 评论系统

Firefly 支持多种评论系统，包括 Twikoo、Waline、Giscus、Disqus 和 Artalk。

## 配置文件

`src/config/commentConfig.ts`

## 基础配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `type` | `string` | `"none"` | 评论系统类型：`"none"`、`"twikoo"`、`"waline"`、`"giscus"`、`"disqus"`、`"artalk"` |

将 `type` 设置为对应的评论系统名称即可启用，设为 `"none"` 则不启用评论。

## Twikoo

[Twikoo](https://twikoo.js.org/) 是一个简洁、安全、免费的静态网站评论系统。

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `twikoo.envId` | `string` | - | Twikoo 环境 ID 或后端地址 |
| `twikoo.lang` | `string` | `"zh-CN"` | 语言设置 |
| `twikoo.visitorCount` | `boolean` | `true` | 是否启用文章访问量统计 |
| `twikoo.jsUrl` | `string` | 见下方 | Twikoo JS 文件地址，支持 CDN 链接 |
| `twikoo.cssUrl` | `string` | `"/assets/css/twikoo-custom.css"` | 自定义 CSS 文件地址，为空则不加载 |

### CDN 推荐

`jsUrl` 支持以下 CDN 源：

| CDN | 地址 |
|-----|------|
| npm Mirror（国内推荐） | `https://registry.npmmirror.com/twikoo/1.7.9/files/dist/twikoo.min.js` |
| zstatic（国内推荐） | `https://s4.zstatic.net/npm/twikoo@1.7.9/dist/twikoo.min.js` |
| jsDelivr（国际推荐） | `https://cdn.jsdelivr.net/npm/twikoo@1.7.9/dist/twikoo.min.js` |

```ts
twikoo: {
  envId: "https://twikoo.vercel.app",
  lang: "zh-CN",
  visitorCount: true,
  jsUrl: "https://cdn.jsdelivr.net/npm/twikoo@1.7.9/dist/twikoo.min.js",
  cssUrl: "/assets/css/twikoo-custom.css",
},
```

## Waline

[Waline](https://waline.js.org/) 是一款从 Valine 衍生的带后端评论系统。

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `waline.serverURL` | `string` | - | Waline 后端服务地址 |
| `waline.lang` | `string` | `"zh-CN"` | 语言设置 |
| `waline.login` | `string` | `"enable"` | 登录模式：`"enable"` 允许匿名和登录、`"force"` 强制登录、`"disable"` 仅匿名 |
| `waline.visitorCount` | `boolean` | `true` | 是否启用文章访问量统计 |

```ts
waline: {
  serverURL: "https://waline.vercel.app",
  lang: "zh-CN",
  login: "enable",
  visitorCount: true,
},
```

## Artalk

[Artalk](https://artalk.js.org/) 是一款自托管评论系统。

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `artalk.server` | `string` | - | Artalk 后端 API 地址 |
| `artalk.locale` | `string` | `"zh-CN"` | 语言设置 |
| `artalk.visitorCount` | `boolean` | `true` | 是否启用文章访问量统计 |

```ts
artalk: {
  server: "https://artalk.example.com/",
  locale: "zh-CN",
  visitorCount: true,
},
```

## Giscus

[Giscus](https://giscus.app/) 是一个由 GitHub Discussions 驱动的评论系统。

| 属性 | 类型 | 说明 |
|------|------|------|
| `giscus.repo` | `string` | GitHub 仓库（格式：`owner/repo`） |
| `giscus.repoId` | `string` | 仓库 ID |
| `giscus.category` | `string` | Discussion 分类名 |
| `giscus.categoryId` | `string` | 分类 ID |
| `giscus.mapping` | `string` | 映射方式（如 `"title"`） |
| `giscus.strict` | `string` | 严格模式 |
| `giscus.reactionsEnabled` | `string` | 是否启用反应 |
| `giscus.emitMetadata` | `string` | 是否发送元数据 |
| `giscus.inputPosition` | `string` | 输入框位置 |
| `giscus.lang` | `string` | 语言设置 |
| `giscus.loading` | `string` | 加载方式 |

::: tip
访问 [giscus.app](https://giscus.app/) 获取你的仓库配置参数。
:::

## Disqus

[Disqus](https://disqus.com/) 是一个第三方评论托管平台。

| 属性 | 类型 | 说明 |
|------|------|------|
| `disqus.shortname` | `string` | Disqus shortname |

```ts
disqus: {
  shortname: "your-shortname",
},
```
