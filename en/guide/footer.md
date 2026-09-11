# Footer

The footer sits at the global bottom of every page and consists of a dashed divider plus one centred block of text: custom content (optional), the copyright line with feed links, and the theme attribution. It is flush against the page's bottom edge and its width follows the content area (sidebars + main content).

## Config Files

- Config: `src/config/footerConfig.ts`
- Custom HTML: `src/config/FooterConfig.html`

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enable` | `boolean` | `false` | Enable the custom HTML injection from `FooterConfig.html` |

```ts
export const footerConfig: FooterConfig = {
  enable: false,
};
```

## Custom Content

Set `enable` to `true`, then edit `src/config/FooterConfig.html` to add custom content such as an ICP filing number. The injected content renders at the **top** of the footer's centred text block (above the copyright line).

```html
<!-- src/config/FooterConfig.html example -->
<div style="text-align: center; font-size: 12px;">
  <a href="https://example.com" target="_blank">Custom footer content</a>
</div>
```

::: tip
After editing the HTML file, the page will auto-update in dev mode if `enable` is set to `true`.
:::
