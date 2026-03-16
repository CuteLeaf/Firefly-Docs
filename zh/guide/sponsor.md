# 赞助

赞助配置管理赞助页面的展示内容，包括赞助方式和赞助者列表。

## 配置文件

`src/config/sponsorConfig.ts`

## 基础配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | `""` | 页面标题（留空使用 i18n 翻译） |
| `description` | `string` | `""` | 页面描述文本（留空使用 i18n 翻译） |
| `usage` | `string` | - | 赞助用途说明 |
| `showSponsorsList` | `boolean` | `true` | 是否显示赞助者列表 |
| `showComment` | `boolean` | `true` | 是否显示赞助页评论区（需先启用评论系统） |
| `showButtonInPost` | `boolean` | `true` | 是否在文章详情页底部显示赞助按钮 |

## 赞助方式

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `name` | `string` | 是 | 赞助方式名称 |
| `icon` | `string` | 否 | 图标（Iconify 格式） |
| `qrCode` | `string` | 否 | 收款码图片路径（相对于 public 目录） |
| `link` | `string` | 否 | 赞助链接 URL |
| `description` | `string` | 否 | 描述文本 |
| `enabled` | `boolean` | 是 | 是否启用 |

```ts
methods: [
  {
    name: "支付宝",
    icon: "fa7-brands:alipay",
    qrCode: "/assets/images/sponsor/alipay.png",
    link: "",
    description: "使用支付宝扫码赞助",
    enabled: true,
  },
  {
    name: "ko-fi",
    icon: "simple-icons:kofi",
    qrCode: "",
    link: "https://ko-fi.com/cuteleaf",
    description: "Buy a Coffee for Firefly",
    enabled: true,
  },
],
```

## 赞助者列表

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `name` | `string` | 是 | 赞助者名称 |
| `amount` | `string` | 否 | 赞助金额 |
| `date` | `string` | 否 | 赞助日期（ISO 格式） |

```ts
sponsors: [
  {
    name: "夏叶",
    amount: "¥50",
    date: "2025-10-01",
  },
  {
    name: "匿名用户",
    amount: "¥20",
    date: "2025-10-01",
  },
],
```

::: tip
需要在 `siteConfig.ts` 中将 `pages.sponsor` 设为 `true` 才能访问赞助页面。

赞助页评论区基于固定路径 `/sponsor/`，不需要创建 `src/content/spec/sponsor.md` 等内容文件。
:::
