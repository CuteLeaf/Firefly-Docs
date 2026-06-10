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
| `LinkPresets.Sponsor` | 赞助 |
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

导航栏会根据 `siteConfig` 中的页面开关配置（`pages`）自动调整显示内容。例如：

- 当 `siteConfig.pages.guestbook` 为 `false` 时，留言板链接不会出现在导航栏
- 当 `siteConfig.pages.sponsor` 为 `false` 时，赞助链接不会出现在导航栏
- 当 `siteConfig.pages.bangumi` 为 `false` 时，番组计划链接不会出现在导航栏

::: tip
已经预装的图标集：`fa7-brands`、`fa7-regular`、`fa7-solid`、`material-symbols`、`simple-icons`。访问 [icones.js.org](https://icones.js.org/) 获取图标代码。如果需要其他图标集，可安装：`pnpm add @iconify-json/<icon-set-name>`。
:::
