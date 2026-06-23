# 追番页面

追番页面用于展示你的动漫追番记录，支持从 Bilibili 和 TMDB 两个数据源获取数据。

## 启用页面

在 `src/config/siteConfig.ts` 中启用追番页面：

```ts
pages: {
  anime: true,
},
```

## 数据源配置

在 `src/config/siteConfig.ts` 中配置数据源：

```ts
anime: {
  // Bilibili 配置
  bilibili: {
    // 你的 Bilibili 用户 UID
    uid: "your_bilibili_uid",
  },
  // TMDB 配置（可选，需要能够访问 TMDB API）
  tmdb: {
    // TMDB API 密钥
    apiKey: "your_tmdb_api_key",
    // TMDB 列表 ID
    listId: "your_list_id",
  },
},
```

::: tip
- Bilibili UID 可以在你的 Bilibili 个人主页 URL 中找到
- TMDB API Key 需要在 [themoviedb.org](https://www.themoviedb.org/settings/api) 申请
- TMDB List ID 是你创建的追番列表的 ID
- 两个数据源可以只配置一个，也可以同时配置（会自动去重合并）
:::

## 数据合并规则

当同时配置了 Bilibili 和 TMDB 两个数据源时：

1. 两个数据源的数据会自动合并
2. 如果同一部番在两个源都存在，**Bilibili 的数据优先**（因为它包含追番进度信息）
3. 合并后的数据会根据标题去重

## 页面功能

- **搜索**：支持按标题搜索番剧
- **筛选**：按类型筛选（全部 / TV / 剧场版）
- **排序**：支持按评分、日期排序（升序/降序）
- **分页**：自动分页显示
- **详情弹窗**：点击卡片查看番剧详情
- **LQIP**：图片加载时显示模糊占位图

## 配置参考

| 属性 | 类型 | 说明 |
|------|------|------|
| `anime.bilibili.uid` | `string` | Bilibili 用户 UID |
| `anime.tmdb.apiKey` | `string` | TMDB API 密钥 |
| `anime.tmdb.listId` | `string` | TMDB 列表 ID |
| `pages.anime` | `boolean` | 是否启用追番页面 |
