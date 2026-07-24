# 封面图片

封面图片配置控制文章封面图的显示和随机封面图功能。

## 配置文件

`src/config/coverImageConfig.ts`

## 配置项

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `enableInPost` | `boolean` | `true` | 是否在文章详情页显示封面图 |
| `enableInPostOverlay` | `boolean` | `true` | 是否将标题和元数据叠加显示在详情页封面上；关闭后使用传统布局 |
| `showLoading` | `boolean` | `false` | 是否显示加载动画 |
| `randomCoverImage.enable` | `boolean` | `false` | 是否启用随机封面图功能 |
| `randomCoverImage.apis` | `string[]` | - | 随机图 API 列表 |
| `randomCoverImage.fallback` | `string` | `"assets/images/cover.avif"` | API 失败时的回退图片 |

## 配置示例

```ts
export const coverImageConfig: CoverImageConfig = {
  enableInPost: true,
  enableInPostOverlay: true,
  showLoading: false,
  randomCoverImage: {
    enable: false,
    apis: [
      "https://t.alcy.cc/pc",
      "https://www.dmoe.cc/random.php",
      "https://uapis.cn/api/v1/random/image?category=acg&type=pc",
    ],
    fallback: "assets/images/cover.avif",
  },
};
```

## 使用随机封面图

在文章的 Frontmatter 中将 `image` 设置为 `"api"` 即可使用随机图功能：

```yaml
---
title: 文章标题
image: "api"
---
```

系统会依次尝试所有配置的 API，全部失败后使用 `fallback` 指定的备用图片。

::: tip
`fallback` 路径支持：
- **src 目录**（不以 `/` 开头）：自动优化
- **public 目录**（以 `/` 开头）：不优化
:::
