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

## 动态配置

在 `src/config/dynamicConfig.ts` 中配置：

```ts
export const dynamicConfig = {
	title: "",
	description: "",
	showComment: true,
	itemsPerPage: 10,
};
```

| 配置项 | 说明 |
| --- | --- |
| `title` | 页面标题。留空时使用 i18n 翻译 |
| `description` | 页面描述。留空时使用 i18n 翻译 |
| `showComment` | 是否为每条动态显示评论入口 |
| `itemsPerPage` | 每页显示的动态数量 |

动态页总开关位于 `src/config/siteConfig.ts`：

```ts
pages: {
	dynamic: true,
}
```

关闭后动态页、动态导航入口和动态侧边栏都会隐藏。
