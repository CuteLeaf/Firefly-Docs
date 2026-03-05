# 站点配置

站点配置是 Firefly 主题的核心配置文件，控制站点的基本信息、主题色、页面开关等全局设置。

## 配置文件

`src/config/siteConfig.ts`

## 基础信息

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | `"Firefly"` | 站点标题 |
| `subtitle` | `string` | `"Demo site"` | 站点副标题 |
| `site_url` | `string` | - | 站点 URL |
| `description` | `string` | - | 站点描述，用于 `<meta name="description">` |
| `keywords` | `string[]` | - | 站点关键词，用于 `<meta name="keywords">` |
| `lang` | `string` | `"zh_CN"` | 站点语言，支持 `zh_CN`、`zh_TW`、`en`、`ja`、`ru` |

```ts
export const siteConfig: SiteConfig = {
  title: "Firefly",
  subtitle: "Demo site",
  site_url: "https://firefly.cuteleaf.cn",
  description: "Firefly 是一款基于 Astro 框架...",
  keywords: ["Firefly", "Astro", "博客"],
  lang: "zh_CN",
};
```

## 主题色

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `themeColor.hue` | `number` | `165` | 主题色色相，范围 0-360。红色：0，青色：200，蓝绿色：250，粉色：345 |
| `themeColor.fixed` | `boolean` | `false` | 是否对访问者隐藏主题色选择器 |
| `themeColor.defaultMode` | `string` | `"system"` | 默认模式：`"light"` 亮色、`"dark"` 暗色、`"system"` 跟随系统 |

```ts
themeColor: {
  hue: 165,
  fixed: false,
  defaultMode: "system",
},
```

## 页面宽度

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `pageWidth` | `number` | `100` | 页面整体最大宽度，单位 `rem`。数值越大页面内容区域越宽 |

```ts
// 页面整体宽度（单位：rem）
// 数值越大可以让页面内容区域更宽
pageWidth: 100,
```

## 卡片样式

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `card.border` | `boolean` | `false` | 是否开启卡片边框和阴影，开启后让网站更有立体感 |
| `card.followTheme` | `boolean` | `false` | 卡片背景是否在浅色模式下跟随主题色相 |

```ts
card: {
  border: false,
  followTheme: false,
},
```

## 导航栏

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `navbar.logo` | `object` | - | 导航栏 Logo，详见下方 |
| `navbar.title` | `string` | `"Firefly"` | 导航栏标题 |
| `navbar.widthFull` | `boolean` | `false` | 导航栏是否占满屏幕宽度 |
| `navbar.followTheme` | `boolean` | `false` | 导航栏图标和标题是否跟随主题色 |

Logo 支持四种类型：

1. **Astro 图标库**：`{ type: "icon", value: "material-symbols:home-pin-outline" }`
2. **public 目录图片**（不优化）：`{ type: "image", value: "/assets/images/logo.webp", alt: "Logo" }`
3. **src 目录图片**（自动优化，推荐）：`{ type: "image", value: "assets/images/logo.webp", alt: "Logo" }`
4. **网络图片**：`{ type: "url", value: "https://example.com/logo.png", alt: "Logo" }`

## Favicon

```ts
favicon: [
  {
    src: "/favicon/favicon.ico",
    // theme: "light",  // 可选，指定主题 'light' | 'dark'
    // sizes: "32x32",  // 可选，图标大小
  },
],
```

## 日期与时区

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `siteStartDate` | `string` | - | 站点开始日期（`YYYY-MM-DD`），用于统计运行天数 |
| `timezone` | `string` | `"Asia/Shanghai"` | IANA 时区字符串，用于格式化日期时间 |

## 提醒框（Admonitions）

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `rehypeCallouts.theme` | `string` | `"github"` | 提醒框主题：`"github"`、`"obsidian"`、`"vitepress"` |

::: tip
修改此配置后需要重启开发服务器才能生效。
:::

## 文章配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `showLastModified` | `boolean` | `true` | 是否显示文章底部的"上次编辑时间"卡片 |
| `outdatedThreshold` | `number` | `30` | 文章过期阈值（天数），超过此天数才显示"上次编辑"卡片 |
| `sharePoster` | `boolean` | `true` | 是否开启分享海报生成功能 |
| `generateOgImages` | `boolean` | `false` | 是否生成 OpenGraph 图片（开启后构建时间较长） |

## 文章列表布局

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `postListLayout.defaultMode` | `string` | `"list"` | 默认布局：`"list"` 列表模式，`"grid"` 网格模式 |
| `postListLayout.allowSwitch` | `boolean` | `true` | 是否允许用户切换布局 |
| `postListLayout.grid.masonry` | `boolean` | `false` | 是否开启瀑布流布局 |
| `postListLayout.grid.columnWidth` | `number` | `320` | 网格模式卡片最小宽度(px)，浏览器根据容器宽度自动计算列数 |

## 分页配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `pagination.postsPerPage` | `number` | `10` | 每页显示的文章数量 |

## 页面开关

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `pages.sponsor` | `boolean` | `true` | 赞助页面开关 |
| `pages.guestbook` | `boolean` | `true` | 留言板页面开关（需配置评论系统） |
| `pages.bangumi` | `boolean` | `true` | 番组计划页面开关 |
| `categoryBar` | `boolean` | `true` | 分类导航栏开关，在首页和归档页顶部显示分类快捷导航 |

## Bangumi 配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `bangumi.userId` | `string` | - | Bangumi 用户 ID |

::: tip
Bangumi 的数据为编译时获取，不是实时数据。`dev` 调试时只获取一页数据，`build` 才会获取全部数据。
:::

## 统计分析

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `analytics.googleAnalyticsId` | `string` | `""` | Google Analytics ID |
| `analytics.microsoftClarityId` | `string` | `""` | Microsoft Clarity ID |

## 图像优化

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `imageOptimization.formats` | `string` | `"webp"` | 输出格式：`"avif"`、`"webp"`、`"both"`（推荐） |
| `imageOptimization.quality` | `number` | `85` | 压缩质量 (1-100)，推荐 70-85 |
| `imageOptimization.noReferrerDomains` | `string[]` | `[]` | 需要添加防盗链处理的域名列表，支持通配符 `*` |

::: warning
Astro 仅能对 `src` 目录下的图像进行优化。`src` 目录下的图像越多，构建时间越长。
:::

### 防盗链处理

部分图床或 CDN（如 B站图床）会通过检查 `Referer` 请求头来实施防盗链策略，导致在博客中引用这些图片时返回 403 错误。

配置 `noReferrerDomains` 后，Firefly 会自动为匹配域名的 `<img>` 标签添加 `referrerpolicy="no-referrer"` 属性，使浏览器在请求图片时不发送 Referer 头，从而绕过防盗链限制。

```ts
imageOptimization: {
  formats: "webp",
  quality: 85,
  noReferrerDomains: [
    "i0.hdslb.com",     // B站图床
    "i1.hdslb.com",
    "i2.hdslb.com",
    "*.bilibili.com",   // 支持通配符
  ],
},
```

::: tip
- 仅对 `http://` 或 `https://` 开头的外部图片生效，不影响本地图片
- 仅影响匹配域名的 `<img>` 标签，不影响其他链接的 referrer 行为
- Markdown 中带有 alt 文本的图片仍然会正常生成 `<figcaption>`
:::

