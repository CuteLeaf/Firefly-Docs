# 代码块

代码块配置基于 [Expressive Code](https://expressive-code.com/)，支持自定义主题和代码折叠功能。

## 配置文件

`src/config/expressiveCodeConfig.ts`

另见：[Mermaid 图表](./mermaid.md)
另见：[PlantUML 图表](./plantuml.md)

## 配置项

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `darkTheme` | `string` | `"one-dark-pro"` | 暗色模式下的代码主题 |
| `lightTheme` | `string` | `"one-light"` | 亮色模式下的代码主题 |

```ts
export const expressiveCodeConfig: ExpressiveCodeConfig = {
  darkTheme: "one-dark-pro",
  lightTheme: "one-light",
};
```

更多主题请参考 [Expressive Code 主题文档](https://expressive-code.com/guides/themes/)。

## 代码折叠

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `pluginCollapsible.enable` | `boolean` | `true` | 是否启用折叠功能 |
| `pluginCollapsible.lineThreshold` | `number` | `15` | 代码行数超过此值时显示折叠按钮 |
| `pluginCollapsible.previewLines` | `number` | `8` | 折叠时显示的预览行数 |
| `pluginCollapsible.defaultCollapsed` | `boolean` | `true` | 默认是否折叠长代码块 |

```ts
pluginCollapsible: {
  enable: true,
  lineThreshold: 15,
  previewLines: 8,
  defaultCollapsed: true,
},
```

## 语言徽章

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `pluginLanguageBadge.enable` | `boolean` | `false` | 是否启用语言徽章 |

```ts
// 语言徽章插件配置
pluginLanguageBadge: {
  enable: false, // 启用语言徽章
},
```

::: warning
修改此配置后需要重启 Astro 开发服务器才能生效。
:::
