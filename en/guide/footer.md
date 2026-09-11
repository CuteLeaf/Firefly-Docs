# Footer

The footer sits at the global bottom of every page and consists of a dashed divider plus one centred block of text: custom content (optional), the copyright line with feed links, and the theme attribution. It is flush against the page's bottom edge and its width follows the content area (sidebars + main content).

## Custom Content

The footer's custom content comes from `src/config/FooterConfig.html`. It is **always on** — there is no switch: whatever the file contains gets rendered, and emptying (or deleting) it is how you turn the injection off. The injected content renders at the **top** of the footer's centred text block (above the copyright line).

```html
<!-- src/config/FooterConfig.html example -->
<div style="text-align: center; font-size: 12px;">
  <a href="https://example.com" target="_blank">Custom footer content</a>
</div>
```

If the file contains only HTML comments (e.g. a note to yourself), the comments are stripped and nothing is rendered.

::: tip
After editing the file, the page will auto-update in dev mode.
:::
