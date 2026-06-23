# 番组计划

番组计划页面用于展示你在 [Bangumi](https://bangumi.tv/) 上的收藏记录，支持动画、书籍、音乐、游戏等多种类型。

## 启用页面

在 `src/config/siteConfig.ts` 中启用番组计划页面：

```ts
pages: {
  bangumi: true,
},
```

## 配置

在 `src/config/siteConfig.ts` 中配置番组计划：

```ts
bangumi: {
  // Bangumi 用户 ID
  userId: "your_user_id",
  // 数据模式：static=构建时获取，dynamic=客户端实时获取
  mode: "dynamic",
  // Bangumi API 地址
  apiUrl: "https://api.bangumi.one",
  // 详情页地址
  subjectBaseUrl: "https://bangumi.one/subject/",
  // 条目类型排序
  categoryOrder: ["anime", "book", "music", "game"],
},
```

## 配置参考

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `bangumi.userId` | `string` | - | Bangumi 用户 ID |
| `bangumi.mode` | `"static" \| "dynamic"` | `"dynamic"` | 数据获取模式 |
| `bangumi.apiUrl` | `string` | `"https://api.bangumi.one"` | Bangumi API 地址 |
| `bangumi.subjectBaseUrl` | `string` | `"https://bangumi.one/subject/"` | 条目详情页地址前缀 |
| `bangumi.categoryOrder` | `string[]` | `["anime", "book", "music", "game"]` | 条目类型展示排序 |
| `pages.bangumi` | `boolean` | `false` | 是否启用番组计划页面 |

### 数据模式

| 模式 | 说明 |
|------|------|
| `static` | 构建时获取数据并静态渲染，部署后数据不会自动更新，需要重新构建 |
| `dynamic` | 在浏览器中实时请求 API，始终显示最新数据，无需重新构建 |

::: tip
推荐使用 `dynamic` 模式，这样无需重新部署即可同步最新的收藏数据。
:::

### 条目类型排序

`categoryOrder` 数组中的类型将按顺序优先展示，未列出的类型排在后面。

可选值：`"anime"`（动画）、`"book"`（书籍）、`"music"`（音乐）、`"game"`（游戏）

```ts
// 只显示动画和游戏
categoryOrder: ["anime", "game"],

// 书籍优先
categoryOrder: ["book", "anime", "music", "game"],
```

## 页面功能

- **分类标签**：按条目类型分类展示（动画、书籍、音乐、游戏）
- **状态筛选**：按收藏状态筛选（想看/在看/看过/搁置/抛弃）
- **评分显示**：展示 Bangumi 评分和你的评分
- **详情链接**：点击卡片跳转到 Bangumi 条目详情页
- **分页浏览**：支持分页浏览大量收藏
