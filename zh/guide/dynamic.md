# 动态

动态页用于发布几行文字或图片，适合记录日常想法，不需要像文章一样填写标题、描述等信息。

## 发布动态

动态文件保存在 `src/content/dynamic/`，一个 Markdown 文件对应一条动态。Frontmatter 只需要填写 `published`：

```yaml
---
published: 2026-07-15 16:15:29
---

今天的天气真不错，出去吃了一顿火锅。
```

时间会按照填写的字面值显示，日期后会追加由 `siteConfig.timezone` 计算出的时区标识。

也可以使用命令快速创建：

```bash
pnpm new-dynamic 今天天气真不错，出去吃了一顿火锅
pnpm new-d 今天也要好好生活
```

动态支持普通 Markdown 语法。动态中的图片会自动整理到内容底部，并支持图片网格、轮播和灯箱查看。

### 置顶动态

在 frontmatter 中添加 `pinned: true` 即可置顶该动态，置顶动态会优先显示：

```yaml
---
published: 2026-07-15 16:15:29
pinned: true
---

这是一条置顶动态。
```

## 动态配置

在 `src/config/dynamicConfig.ts` 中配置：

```ts
export const dynamicConfig = {
	title: "",
	description: "",
	showComment: true,
	itemsPerPage: 20,
	apiUrl: "/api/dynamic.json",
	memos: {
		enable: false,
		apiUrl: "https://memos.example.com",
		parent: "users/your-username",
	},
};
```

| 配置项 | 说明 |
| --- | --- |
| `title` | 页面标题。留空时使用 i18n 翻译 |
| `description` | 页面描述。留空时使用 i18n 翻译 |
| `showComment` | 是否为每条动态显示评论入口 |
| `itemsPerPage` | 每页显示的动态数量 |
| `apiUrl` | 动态数据 API 地址，默认 `/api/dynamic.json`。当 `memos.enable` 为 true 时忽略 |

### Memos 数据源

支持对接 [Memos](https://www.usememos.com/) 实例，实时获取数据：

```ts
memos: {
	enable: true,
	apiUrl: "https://memos.example.com",
	parent: "users/xiaye",
},
```

| 配置项 | 说明 |
| --- | --- |
| `enable` | 是否启用 Memos 数据源 |
| `apiUrl` | Memos 实例地址 |
| `parent` | 用户标识，用于过滤指定用户的动态 |

启用后，客户端会直接从 Memos API 实时获取数据，支持置顶同步、图片附件展示等功能。


### 自定义 API 地址

`apiUrl` 支持两种格式：

- **相对路径**（默认）：`"/api/dynamic.json"` — 使用本地构建生成的 JSON 文件
- **绝对 URL**：`"https://firefly.cuteleaf.cn/api/dynamic.json"` — 使用第三方接口

第三方接口需返回以下 JSON 结构：

```json
[
  {
    "id": "dynamic-id",
    "published": 1721059200000,
    "html": "<p>动态内容 HTML</p>",
    "images": [
      { "alt": "图片描述", "src": "/path/to/image.jpg" }
    ],
    "searchText": "纯文本搜索内容",
    "pinned": false
  }
]
```

::: tip
侧边栏的「最新动态」组件也会从该地址获取数据，方便接入统一的第三方后端。
:::

动态页总开关位于 `src/config/siteConfig.ts`：

```ts
pages: {
	dynamic: true,
}
```

关闭后动态页、动态导航入口和动态侧边栏都会隐藏。
