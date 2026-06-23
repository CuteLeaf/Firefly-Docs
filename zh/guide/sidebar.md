# 侧边栏

侧边栏布局配置控制站点的侧边栏显示位置和组件排列。

## 配置文件

`src/config/sidebarConfig.ts`

## 布局配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `enable` | `boolean` | `true` | 是否启用侧边栏 |
| `position` | `string` | `"both"` | 侧边栏位置：`"left"` 左侧、`"right"` 右侧、`"both"` 双侧 |
| `tabletSidebar` | `string` | `"left"` | 平板端(769-1279px)显示哪侧，仅 `position` 为 `"both"` 时生效 |
| `showBothSidebarsOnPostPage` | `boolean` | `true` | 单侧栏时，是否在文章详情页显示双侧边栏 |

```ts
export const sidebarLayoutConfig: SidebarLayoutConfig = {
  enable: true,
  position: "both",
  tabletSidebar: "left",
  showBothSidebarsOnPostPage: true,
  // ...
};
```

## 组件配置

每个侧边栏组件支持以下属性：

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `type` | `string` | 是 | 组件类型 |
| `enable` | `boolean` | 是 | 是否启用 |
| `position` | `string` | 是 | 位置：`"top"` 固定顶部，`"sticky"` 粘性定位 |
| `showOnPostPage` | `boolean` | 否 | 是否在文章详情页显示 |
| `hideOnNonPostPage` | `boolean` | 否 | 是否在非文章详情页隐藏（`true` = 仅文章详情页显示） |
| `showTitle` | `boolean` | 否 | 是否显示组件标题，默认 `true` |
| `specificConfig` | `object` | 否 | 组件专属配置，不同组件类型的配置项不同，详见 [侧边栏小组件](/zh/guide/widgets#组件专属配置) |

### 可用组件类型

| 类型 | 说明 |
|------|------|
| `"profile"` | 用户资料卡片（头像、名称、简介、社交链接） |
| `"announcement"` | 公告栏 |
| `"music"` | 音乐播放器 |
| `"categories"` | 文章分类列表 |
| `"tags"` | 标签云 |
| `"stats"` | 站点统计（文章数、字数、运行天数等） |
| `"siteInfo"` | 站点信息（构建平台、版本、系统等） |
| `"calendar"` | 文章日历（可选热力图） |
| `"sidebarToc"` | 文章目录（仅文章详情页可用） |
| `"advertisement"` | 广告栏（支持多个实例） |

::: tip
组件的渲染顺序取决于它们在配置数组中的顺序，但 `position: "top"` 的组件会优先于 `position: "sticky"` 的组件渲染。
:::

## 左侧边栏配置示例

```ts
leftComponents: [
  {
    type: "profile",
    enable: true,
    position: "top",
    showOnPostPage: true,
  },
  {
    type: "announcement",
    enable: true,
    position: "top",
    showOnPostPage: true,
  },
  {
    type: "music",
    enable: true,
    position: "sticky",
    showOnPostPage: true,
  },
  {
    type: "categories",
    enable: true,
    position: "sticky",
    showOnPostPage: true,
    specificConfig: {
      collapseThreshold: 5, // 超过 5 个分类时自动折叠
    },
  },
  {
    type: "tags",
    enable: true,
    position: "sticky",
    showOnPostPage: true,
    specificConfig: {
      collapseThreshold: 10, // 超过 10 个标签时自动折叠
    },
  },
],
```

## 右侧边栏配置示例

```ts
rightComponents: [
  {
    type: "stats",
    enable: true,
    position: "top",
    showOnPostPage: true,
  },
  {
    type: "siteInfo",
    enable: true,
    position: "top",
    showOnPostPage: true,
  },
  {
    type: "calendar",
    enable: true,
    showTitle: false,
    position: "sticky",
    showOnPostPage: false,
    specificConfig: {
      calendar: {
        showHeatmap: true, // 显示年度文章热力图
      },
    },
  },
  {
    type: "sidebarToc",
    enable: true,
    position: "sticky",
    showOnPostPage: true,
    hideOnNonPostPage: true,
  },
],
```

## 移动端底部组件

在移动端（< 768px），侧边栏组件会显示在页面底部。使用 `mobileBottomComponents` 单独配置：

```ts
mobileBottomComponents: [
  { type: "profile", enable: true, showOnPostPage: true },
  { type: "announcement", enable: true, showOnPostPage: true },
  { type: "music", enable: true, showOnPostPage: true },
  { type: "categories", enable: true, showOnPostPage: true, specificConfig: { collapseThreshold: 5 } },
  { type: "tags", enable: true, showOnPostPage: true, specificConfig: { collapseThreshold: 10 } },
  { type: "stats", enable: true, showOnPostPage: true },
  { type: "siteInfo", enable: true, showOnPostPage: true },
],
```

::: warning
移动端底部组件配置独立于左右侧边栏配置，需要单独设置。
:::
