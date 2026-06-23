# 侧边栏小组件

侧边栏支持多种小组件，可在左右侧边栏和移动端底部灵活配置。本文档介绍所有可用的组件类型及其专属配置。

通用属性（`type`、`enable`、`position`、`showOnPostPage` 等）请参见 [侧边栏](/zh/guide/sidebar#组件配置)。

## 可用组件

| 类型 | 说明 |
|------|------|
| `"profile"` | 用户资料卡片（头像、名称、简介、社交链接） |
| `"announcement"` | 公告栏 |
| `"music"` | 音乐播放器 |
| `"categories"` | 文章分类列表 |
| `"tags"` | 标签云 |
| `"stats"` | 站点统计（文章数、字数、运行天数等） |
| `"siteInfo"` | 站点信息（构建平台、版本、系统等） |
| `"calendar"` | 文章日历（可选热力图） |
| `"sidebarToc"` | 文章目录（仅文章详情页可用） |
| `"advertisement"` | 广告栏（支持多个实例） |

## 组件专属配置

通过 `specificConfig` 为不同组件类型设置专属选项。未列出的组件（`profile`、`announcement`、`music`、`stats`、`sidebarToc`）无专属配置，其数据来自各自的独立配置文件或自动计算。

### 分类 / 标签组件

文章分类和标签组件支持自动折叠功能。当项目数量超过阈值时，组件会自动折叠为固定高度（`7.5rem`），用户可点击展开。

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `collapseThreshold` | `number` | 不折叠 | 折叠阈值，超过此数量时自动折叠。省略则不折叠 |

```ts
{
  type: "categories",
  enable: true,
  position: "sticky",
  specificConfig: {
    collapseThreshold: 5, // 超过 5 个分类时自动折叠
  },
}
```

### 日历组件

日历组件显示每月文章发布情况，可选在下方展示年度热力图。

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `calendar.showHeatmap` | `boolean` | `true` | 是否显示年度文章热力图 |

```ts
{
  type: "calendar",
  enable: true,
  position: "sticky",
  showTitle: false,
  specificConfig: {
    calendar: {
      showHeatmap: true,
    },
  },
}
```

### 站点信息

站点信息组件自动检测构建平台、框架版本、系统信息等。当构建环境无法识别时，显示自定义回退文本。

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `siteInfo.unknownBuildPlatform` | `string` | `"Unknown CI"` | 未能识别的构建平台回退显示文本 |

```ts
{
  type: "siteInfo",
  enable: true,
  position: "top",
  specificConfig: {
    siteInfo: {
      unknownBuildPlatform: "自定义构建平台",
    },
  },
}
```

### 广告组件

广告组件支持图片广告和文本广告两种形式，可配置多个实例（每个实例拥有独立的配置和显示计数）。

#### 图片广告

```ts
{
  type: "advertisement",
  enable: true,
  position: "sticky",
  specificConfig: {
    ad: {
      image: {
        src: "/assets/images/ad.webp",   // 图片地址（支持本地路径和外部链接）
        alt: "广告横幅",                   // 图片替代文本
        link: "https://example.com",      // 点击跳转链接
        external: true,                   // 是否在新标签页打开
      },
      closable: true,                     // 是否允许关闭（悬停时显示关闭按钮）
      displayCount: -1,                   // 显示次数限制，-1 为无限制
    },
  },
}
```

#### 文本广告

```ts
{
  type: "advertisement",
  enable: true,
  position: "sticky",
  specificConfig: {
    ad: {
      title: "支持博主",                   // 广告标题（省略则使用默认 i18n 文本）
      content: "感谢您的支持！",            // 广告内容文本
      link: {
        text: "支持一下",                   // 链接按钮文本
        url: "about/",                     // 链接地址
        external: false,                   // 是否外部链接
      },
      closable: false,
      displayCount: -1,
    },
  },
}
```

#### 完整配置参考

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `ad.title` | `string` | i18n 默认文本 | 广告标题 |
| `ad.content` | `string` | — | 广告内容文本 |
| `ad.image.src` | `string` | — | 图片地址（支持本地路径和外部链接） |
| `ad.image.alt` | `string` | `"Advertisement"` | 图片替代文本 |
| `ad.image.link` | `string` | — | 图片点击跳转链接 |
| `ad.image.external` | `boolean` | `false` | 图片链接是否在新标签页打开 |
| `ad.link.text` | `string` | — | 链接按钮文本 |
| `ad.link.url` | `string` | — | 链接地址 |
| `ad.link.external` | `boolean` | `false` | 是否外部链接（显示外部链接图标） |
| `ad.closable` | `boolean` | `false` | 是否允许关闭（悬停时显示关闭按钮，点击后滑出隐藏） |
| `ad.displayCount` | `number` | `-1` | 每用户最大显示次数，`-1` 为无限制（基于 localStorage 记录） |
| `ad.expireDate` | `string` | — | 过期日期（ISO 8601 格式，如 `"2026-12-31"`），过期后不再显示 |
| `ad.padding.all` | `string` | `"1rem"` | 统一内边距 |
| `ad.padding.top` | `string` | — | 上内边距（未设置 `all` 时生效） |
| `ad.padding.right` | `string` | — | 右内边距 |
| `ad.padding.bottom` | `string` | — | 下内边距 |
| `ad.padding.left` | `string` | — | 左内边距 |

::: tip
- 广告组件可以配置多个实例，每个实例拥有独立的显示计数和配置
- 设置 `ad.padding` 后，组件默认的 `px-4` 内边距会被禁用
- `expireDate` 过期后组件完全不渲染，而非仅隐藏
:::

## 移动端底部组件

在移动端（< 768px），侧边栏组件会显示在页面底部。使用 `mobileBottomComponents` 单独配置：

```ts
mobileBottomComponents: [
  { type: "profile", enable: true, showOnPostPage: true },
  { type: "announcement", enable: true, showOnPostPage: true },
  { type: "categories", enable: true, showOnPostPage: true, specificConfig: { collapseThreshold: 5 } },
  { type: "tags", enable: true, showOnPostPage: true, specificConfig: { collapseThreshold: 10 } },
  { type: "stats", enable: true, showOnPostPage: true },
  { type: "siteInfo", enable: true, showOnPostPage: true },
],
```

::: warning
- 移动端底部组件配置独立于左右侧边栏配置，需要单独设置
- `mobileBottomComponents` 中的组件不需要 `position` 属性（不区分 top/sticky）
:::
