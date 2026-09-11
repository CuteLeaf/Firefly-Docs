# 页脚

页脚位于每个页面的全局底部，由一条虚线分隔线和一块居中文字组成：自定义内容（可选）、版权信息与订阅链接、以及主题署名。它贴在页面底边，宽度跟随内容区（侧边栏 + 主内容）。

## 配置文件

- 配置：`src/config/footerConfig.ts`
- 自定义 HTML：`src/config/FooterConfig.html`

## 配置项

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `enable` | `boolean` | `false` | 是否启用 `FooterConfig.html` 的自定义 HTML 注入 |

```ts
export const footerConfig: FooterConfig = {
  enable: false,
};
```

## 自定义内容

把 `enable` 设为 `true`，然后编辑 `src/config/FooterConfig.html` 来添加备案号等自定义内容。注入的内容渲染在页脚居中文字块的**最上方**（版权行之上）。

```html
<!-- src/config/FooterConfig.html 示例 -->
<div style="text-align: center; font-size: 12px;">
  <a href="https://beian.miit.gov.cn/" target="_blank">桂ICP备XXXXXXXX号-1</a>
</div>
```

::: tip
修改 HTML 文件后，如果 `enable` 已设为 `true`，页面会自动更新（开发模式下）。
:::
