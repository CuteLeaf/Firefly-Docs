# 页脚

页脚位于每个页面的全局底部，由一条虚线分隔线和一块居中文字组成：自定义内容（可选）、版权信息与订阅链接、以及主题署名。它贴在页面底边，宽度跟随内容区（侧边栏 + 主内容）。

## 自定义内容

页脚的自定义内容由 `src/config/FooterConfig.html` 提供，**默认开启**，没有开关：文件里有内容就会渲染，清空（或删除）该文件即等于关闭。注入的内容渲染在页脚居中文字块的**最上方**（版权行之上）。

```html
<!-- src/config/FooterConfig.html 示例 -->
<div style="text-align: center; font-size: 12px;">
  <a href="https://beian.miit.gov.cn/" target="_blank">桂ICP备XXXXXXXX号-1</a>
</div>
```

文件里只有 HTML 注释时（例如只留一句说明），注释会被自动剔除、不会渲染任何内容。

::: tip
修改该文件后页面会自动更新（开发模式下）。
:::
