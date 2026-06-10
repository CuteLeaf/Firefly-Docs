# 广告

广告组件显示在侧边栏中，支持图片广告和文字广告。

## 配置文件

广告配置直接嵌入在 `src/config/sidebarConfig.ts` 的 `advertisement` 组件的 `specificConfig.ad` 中。

## 配置项

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | `string` | 否 | 广告标题 |
| `content` | `string` | 否 | 广告文本内容 |
| `image` | `object` | 否 | 图片配置 |
| `link` | `object` | 否 | 链接配置 |
| `closable` | `boolean` | 否 | 是否可关闭 |
| `displayCount` | `number` | 否 | 显示次数限制，`-1` 为无限制 |
| `expireDate` | `string` | 否 | 过期时间（ISO 8601 格式） |

### 图片配置

| 属性 | 类型 | 说明 |
|------|------|------|
| `image.src` | `string` | 图片地址 |
| `image.alt` | `string` | 图片描述 |
| `image.link` | `string` | 图片点击链接 |
| `image.external` | `boolean` | 是否外部链接 |

### 链接配置

| 属性 | 类型 | 说明 |
|------|------|------|
| `link.text` | `string` | 链接文本 |
| `link.url` | `string` | 链接地址 |
| `link.external` | `boolean` | 是否外部链接 |

### 内边距配置

| 属性 | 类型 | 说明 |
|------|------|------|
| `padding.all` | `string` | 统一边距（会覆盖单独设置） |
| `padding.top` | `string` | 上边距 |
| `padding.right` | `string` | 右边距 |
| `padding.bottom` | `string` | 下边距 |
| `padding.left` | `string` | 左边距 |

## 示例：纯图片广告

```ts
export const adConfig1: AdConfig = {
  image: {
    src: "assets/images/cover.avif",
    alt: "广告横幅",
    link: "#",
    external: true,
  },
  closable: true,
  displayCount: -1,
  padding: {
    all: "0", // 零边距，图片占满整个组件
  },
};
```

## 示例：完整内容广告

```ts
export const adConfig2: AdConfig = {
  title: "支持博主",
  content: "如果您觉得本站内容对您有帮助，欢迎支持我们的创作！",
  image: {
    src: "assets/images/cover.avif",
    alt: "支持博主",
    link: "about/",
    external: false,
  },
  link: {
    text: "支持一下",
    url: "about/",
    external: false,
  },
  closable: true,
  displayCount: -1,
};
```

::: tip
广告组件的显示/隐藏在 `sidebarConfig.ts` 中控制。通过设置 `advertisement` 组件的 `enable` 属性来开关，广告内容直接在 `specificConfig.ad` 中配置。每个 `advertisement` 组件实例可以有独立的广告内容。
:::
