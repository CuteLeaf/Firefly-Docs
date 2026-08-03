# 书签导航

书签导航配置管理书签导航页面的展示内容，用于按分类收藏和展示常用网站。

## 配置文件

`src/config/booknavConfig.ts`

## 页面配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | `""` | 页面标题，留空则使用 i18n 中的翻译 |
| `description` | `string` | `""` | 页面描述，留空则使用 i18n 中的翻译 |
| `favicon.enabled` | `boolean` | `true` | 书签未填写 `icon` 时，是否自动获取目标站点的 favicon |
| `favicon.api` | `string` | `"https://a.favicon.im/{domain}"` | favicon 接口地址，`{domain}` 为占位符 |

## 分组属性

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | `string` | 是 | 锚点 id，需全局唯一，顶部分类胶囊靠它跳转 |
| `name` | `string` | 是 | 分组名称 |
| `icon` | `string` | 否 | 分组图标，astro-icon 图标名，显示在分组标题和分类胶囊前 |
| `desc` | `string` | 否 | 分组描述，显示在分组标题右侧 |
| `weight` | `number` | 否 | 分组排序权重，数字越大越靠前，默认 `0` |
| `enabled` | `boolean` | 否 | 是否启用该分组，默认 `true` |
| `items` | `BooknavItem[]` | 是 | 该分组下的书签列表 |

## 书签项属性

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | `string` | 是 | 书签标题 |
| `url` | `string` | 是 | 目标站点地址 |
| `desc` | `string` | 否 | 书签描述，留空则在卡片上显示域名 |
| `icon` | `string` | 否 | 书签图标，留空则自动获取 favicon |
| `weight` | `number` | 否 | 组内排序权重，数字越大越靠前，默认 `0` |
| `enabled` | `boolean` | 否 | 是否启用该书签，默认 `true` |

::: tip
`weight` 和 `enabled` 都是可选的，收藏的站点通常很多，不必每条都写。
:::

## 图标解析

`icon` 字段支持三种写法，构建时按以下顺序判定：

| 写法 | 示例 | 渲染方式 |
|------|------|----------|
| astro-icon 图标名 | `fa7-brands:github` | 内联 SVG，不产生额外请求 |
| 网络图片 URL | `https://example.com/logo.png` | `<img>` 标签 |
| 本地图片路径 | `/favicon/firefly-32.png` | `<img>` 标签，相对 `public` 目录 |

完整的解析优先级：

1. `icon` 以 `http://`、`https://` 或 `/` 开头 → 按图片地址处理
2. `icon` 形如 `namespace:name` → 按 astro-icon 图标名处理
3. `icon` 非空但不符合上述格式 → 仍按图片路径处理
4. `icon` 留空且 `favicon.enabled` 为 `true` → 用 favicon 接口自动获取
5. 以上都不满足 → 降级为标题首字母块（使用主题色）

图片加载失败时，前端会自动降级为首字母块，不会出现破图。所有 `<img>` 均带 `loading="lazy"` 懒加载与 `referrerpolicy="no-referrer"`（favicon 服务常有防盗链）。

## favicon 接口

`{domain}` 会被替换成从 `url` 中解析出的域名。更换接口只需保证地址里含有 `{domain}`：

```ts
// 以下写法都可以
api: "https://a.favicon.im/{domain}"
api: "https://favicon.im/{domain}"
api: "https://www.google.com/s2/favicons?domain={domain}&sz=64"
```

如果不想依赖第三方服务，把 `favicon.enabled` 设为 `false`，未填 `icon` 的书签会统一显示首字母块。

## 配置示例

```ts
export const booknavPageConfig: BooknavPageConfig = {
  // 页面标题，如果留空则使用 i18n 中的翻译
  title: "",
  // 页面描述文本，如果留空则使用 i18n 中的翻译
  description: "",
  // favicon 自动获取配置
  favicon: {
    // 书签未填写 icon 时，是否自动获取目标站点的 favicon 图标
    enabled: true,
    // favicon 接口地址，{domain} 为占位符，会被替换成目标站点域名
    api: "https://a.favicon.im/{domain}",
  },
};

export const booknavConfig: BooknavGroup[] = [
  {
    id: "dev",
    name: "开发",
    icon: "material-symbols:code-rounded",
    desc: "写代码时离不开的站点",
    weight: 100,
    items: [
      {
        title: "GitHub",
        url: "https://github.com",
        desc: "全球最大的代码托管平台",
        // 使用 astro-icon 图标库的图标名称
        icon: "fa7-brands:github",
        weight: 10,
      },
      {
        title: "MDN Web Docs",
        url: "https://developer.mozilla.org",
        desc: "最权威的 Web 技术文档",
        // 不填 icon，自动获取 favicon
        weight: 9,
      },
    ],
  },
  {
    id: "tools",
    name: "工具",
    icon: "material-symbols:build-outline-rounded",
    desc: "顺手的在线小工具",
    weight: 80,
    items: [
      {
        title: "TinyPNG",
        url: "https://tinypng.com",
        desc: "在线压缩 PNG / JPEG 图片",
        weight: 10,
      },
    ],
  },
];
```

## 页面功能

- **分类锚点**：顶部胶囊按钮显示各分组名称与书签数量，点击平滑滚动到对应分组
- **搜索过滤**：按书签标题、描述、域名匹配，过滤后自动隐藏变空的分组
- **排序**：分组之间、分组内部都按 `weight` 降序排列，`enabled: false` 的项会被剔除，条目全被剔除的分组不会渲染

## 页面开关

可通过 `siteConfig.pages.booknav` 控制 `/booknav/` 页面是否可访问。设为 `false` 后，导航栏入口自动隐藏、直接访问跳转 404、sitemap 中也不再包含该页面。

导航栏入口在 `src/config/navBarConfig.ts` 的 `LinkPresets.Booknav` 中定义，可修改名称、图标和位置。

::: tip
- 分组的 `id` 建议用简短英文，它会成为页面锚点，例如 `/booknav/#dev`
- 设置 `enabled: false` 可以暂时隐藏某个分组或书签而不需要删除
- 分组图标和书签图标都可以在 [Iconify](https://icon-sets.iconify.design) 上搜索图标名
- 该页面不包含自定义内容区和评论区
:::
