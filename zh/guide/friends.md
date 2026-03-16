# 友链

友链配置管理友情链接页面的展示内容。

## 配置文件

`src/config/friendsConfig.ts`

## 页面配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | `""` | 页面标题，留空则使用 i18n 中的翻译 |
| `description` | `string` | `""` | 页面描述，留空则使用 i18n 中的翻译 |
| `showCustomContent` | `boolean` | `true` | 是否显示底部自定义内容（friends.mdx） |
| `showComment` | `boolean` | `true` | 是否显示友链页评论区（需先启用评论系统） |
| `randomizeSort` | `boolean` | `false` | 是否开启随机排序配置，如果开启，就会忽略权重规则，构建时进行一次随机排序 |

## 友链项属性

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | `string` | 是 | 友链标题 |
| `imgurl` | `string` | 是 | 头像图片 URL |
| `desc` | `string` | 是 | 友链描述 |
| `siteurl` | `string` | 是 | 友链地址 |
| `tags` | `string[]` | 否 | 标签数组 |
| `weight` | `number` | 是 | 权重，数字越大排序越靠前 |
| `enabled` | `boolean` | 是 | 是否启用 |

## 配置示例

```ts
export const friendsPageConfig: FriendsPageConfig = {
  // 页面标题，如果留空则使用 i18n 中的翻译
  title: "",
  // 页面描述文本，如果留空则使用 i18n 中的翻译
  description: "",
  // 是否显示底部自定义内容（friends.mdx 中的内容）
  showCustomContent: true,
  // 是否显示评论区，需要先在 commentConfig.ts 启用评论系统
  showComment: true,
  // 是否开启随机排序配置，如果开启，就会忽略权重规则，构建时进行一次随机排序
  randomizeSort: false,
};

export const friendsConfig: FriendLink[] = [
  {
    title: "夏夜流萤",
    imgurl: "https://q1.qlogo.cn/g?b=qq&nk=7618557&s=640",
    desc: "一个博客站点",
    siteurl: "https://blog.cuteleaf.cn",
    tags: ["Blog"],
    weight: 10,
    enabled: true,
  },
  {
    title: "Astro",
    imgurl: "https://avatars.githubusercontent.com/u/44914786",
    desc: "The web framework for content-driven websites.",
    siteurl: "https://github.com/withastro/astro",
    tags: ["Framework"],
    weight: 8,
    enabled: true,
  },
];
```

## 自定义内容

友链页面底部支持通过 MDX 文件自定义内容，文件路径为 `src/content/spec/friends.mdx`。

该文件采用 MDX 格式（Markdown 增强版），支持在文件顶部通过 `export` 定义变量，方便修改站点信息和注意事项：

```js
// 站点信息（用于展示和复制）
export const site = {
  name: "你的站点名称",
  desc: "你的站点描述",
  url: "https://your-site.com",
  avatar: "https://your-avatar-url.com/avatar.jpg",
  email: "your@email.com",
};

// 注意事项列表
export const notes = [
  { title: "互换原则", content: "请先将本站添加到您的友链页面" },
  { title: "链接维护", content: "长期无法访问或内容违规将被移除" },
];
```

如果不需要自定义内容，可在配置中设置 `showCustomContent: false` 来隐藏。

可通过 `siteConfig.pages.friends` 控制 `/friends/` 页面是否可访问。

当 `commentConfig.type !== "none"` 且 `friendsPageConfig.showComment` 为 `true` 时，友链页会显示评论区。

::: tip
- 该 MDX 文件可以根据自己的喜好完全重写，默认提供的布局仅作为参考模板
- 设置 `enabled: false` 可以暂时隐藏某个友链而不需要删除
- 友链按 `weight` 降序排列，权重越大越靠前
:::
