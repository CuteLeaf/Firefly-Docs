# 哔哩哔哩追番页面

哔哩哔哩追番页面用于展示你的 Bilibili 追番与追剧记录，从 Bilibili 用户主页获取数据。

## 启用页面

在 `src/config/siteConfig.ts` 中启用哔哩哔哩追番页面：

```ts
pages: {
  bilibili: true,
},
```

::: tip
除了配置文件里的 `pages.bilibili` 开关，也可以在部署平台设置环境变量 `PUBLIC_PAGES_BILIBILI=true` 开启、`=false` 关闭该页面，无需修改配置文件。
:::

## 配置

在 `src/config/siteConfig.ts` 中配置 Bilibili：

```ts
bilibili: {
  // 你的 Bilibili 用户 UID
  uid: "your_bilibili_uid",
},
```

::: tip
Bilibili UID 可以在你的 Bilibili 个人主页 URL 中找到，例如 `https://space.bilibili.com/38932988` 对应的 UID 是 `38932988`。
:::

## 页面功能

- **搜索**：支持按标题搜索番剧
- **筛选**：按类型筛选（全部 / TV / 剧场版 / 纪录片 / 国创 / 电视剧 / 演唱会）
- **排序**：支持按评分、日期排序（升序/降序）
- **分页**：自动分页显示
- **详情弹窗**：点击卡片查看番剧详情，可跳转 Bilibili 观看
- **LQIP**：图片加载时显示模糊占位图

## 配置参考

| 属性 | 类型 | 说明 |
|------|------|------|
| `bilibili.uid` | `string` | Bilibili 用户 UID |
| `pages.bilibili` | `boolean` | 是否启用哔哩哔哩追番页面 |
