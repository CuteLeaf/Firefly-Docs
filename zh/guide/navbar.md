# 导航栏

导航栏配置控制站点顶部导航菜单的链接和搜索功能。

## 配置文件

`src/config/navBarConfig.ts`

## 预设链接

Firefly 提供了一组内置的导航链接预设，可以直接使用：

| 预设 | 说明 |
|------|------|
| `LinkPresets.Home` | 主页 |
| `LinkPresets.Archive` | 归档 |
| `LinkPresets.Categories` | 分类 |
| `LinkPresets.Tags` | 标签 |
| `LinkPresets.Friends` | 友链 |
| `LinkPresets.Sponsor` | 打赏 |
| `LinkPresets.Guestbook` | 留言板 |
| `LinkPresets.About` | 关于 |
| `LinkPresets.Bangumi` | 番组计划 |
| `LinkPresets.Gallery` | 相册 |

## 自定义链接

自定义链接支持以下属性：

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `name` | `string` | 是 | 链接名称 |
| `url` | `string` | 是 | 链接地址 |
| `icon` | `string` | 否 | 图标（Iconify 格式） |
| `external` | `boolean` | 否 | 是否为外部链接 |
| `children` | `array` | 否 | 子菜单项，支持嵌套 |
| `pageKey` | `string` | 否 | 对应 `siteConfig.pages` 中的页面键名，用于动态显示/隐藏 |

## 配置示例

```ts
import { type NavBarConfig, type NavBarLink } from "../types/navBarConfig";
import { LinkPresets } from "../config/navBarConfig";

const links: NavBarLink[] = [
  // 使用预设链接
  LinkPresets.Home,
  LinkPresets.Archive,

  // 自定义链接（含子菜单）
  {
    name: "链接",
    url: "/links/",
    icon: "material-symbols:link",
    children: [
      {
        name: "GitHub",
        url: "https://github.com/CuteLeaf/Firefly",
        external: true,
        icon: "fa7-brands:github",
      },
      {
        name: "Bilibili",
        url: "https://space.bilibili.com/38932988",
        external: true,
        icon: "fa7-brands:bilibili",
      },
    ],
  },

  // 更多预设链接
  LinkPresets.Friends,
];
```

## 搜索配置

导航栏搜索功能通过 `navBarSearchConfig` 单独配置：

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `method` | `NavBarSearchMethod` | `NavBarSearchMethod.PageFind` | 搜索方式，目前支持 PageFind |

```ts
export const navBarSearchConfig: NavBarSearchConfig = {
  method: NavBarSearchMethod.PageFind,
};
```

## 动态导航栏

导航栏会根据 `siteConfig.pages` 中的页面开关配置自动调整显示内容。只需在链接上设置 `pageKey` 属性，导航栏组件会自动判断是否显示该链接。

### 工作原理

在 `NavBarLink` 上设置 `pageKey` 属性，其值对应 `siteConfig.pages` 中的键名：

```ts
// siteConfig.ts
pages: {
  friends: true,    // 友链页面开启
  guestbook: false, // 留言板页面关闭
  bangumi: true,    // 番组计划开启
  gallery: false,   // 相册页面关闭
  sponsor: true,    // 打赏页面开启
}
```

```ts
// navBarConfig.ts - 设置 pageKey
LinkPresets.Friends    // pageKey: "friends"
LinkPresets.Guestbook  // pageKey: "guestbook"
LinkPresets.Bangumi    // pageKey: "bangumi"
```

当页面关闭（设为 `false`）时：

- 对应的导航栏链接会自动隐藏
- 如果父菜单的所有子项都被隐藏，父菜单也会自动隐藏
- 如果父菜单只剩一个子项，会直接显示该子项（去除父级包裹）

### 示例

| 配置 | 效果 |
|------|------|
| `siteConfig.pages.guestbook = false` | 留言板链接不显示 |
| `siteConfig.pages.sponsor = false` | 打赏链接不显示 |
| `siteConfig.pages.bangumi = false` | 番组计划链接不显示 |
| `siteConfig.pages.gallery = false` | 相册链接不显示 |
| `pages.gallery = false` 且 `pages.bangumi = false` | "我的"整个菜单不显示 |

::: tip
已经预装的图标集：`fa7-brands`、`fa7-regular`、`fa7-solid`、`material-symbols`、`simple-icons`。访问 [icones.js.org](https://icones.js.org/) 获取图标代码。如果需要其他图标集，可安装：`pnpm add @iconify-json/<icon-set-name>`。
:::
