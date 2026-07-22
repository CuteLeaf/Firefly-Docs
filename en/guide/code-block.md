# Code Block

Code block configuration is based on [Expressive Code](https://expressive-code.com/), supporting custom themes and code collapsing.

## Config File

`src/config/expressiveCodeConfig.ts`

See also: [Mermaid Diagram](./mermaid.md)
See also: [PlantUML Diagram](./plantuml.md)

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `darkTheme` | `string` | `"one-dark-pro"` | Dark mode code theme |
| `lightTheme` | `string` | `"one-light"` | Light mode code theme |

See [Expressive Code Themes](https://expressive-code.com/guides/themes/) for more themes.

## Code Collapsing

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `pluginCollapsible.enable` | `boolean` | `true` | Enable collapsing |
| `pluginCollapsible.lineThreshold` | `number` | `15` | Line count threshold for collapse button |
| `pluginCollapsible.previewLines` | `number` | `8` | Preview lines when collapsed |
| `pluginCollapsible.defaultCollapsed` | `boolean` | `true` | Default to collapsed for long blocks |

```ts
pluginCollapsible: {
  enable: true,
  lineThreshold: 15,
  previewLines: 8,
  defaultCollapsed: true,
},
```

## Language Badge

Displays the language name as text in the top-right corner of the code block.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `pluginLanguageBadge.enable` | `boolean` | `false` | Enable language badge |

```ts
pluginLanguageBadge: {
  enable: false,
},
```

## Language Logo

Displays a language icon in the bottom-right corner of the code block (powered by [ec-lang-logo](https://github.com/DerTimonius/ec-lang-logo)).

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `pluginLanguageLogo.enable` | `boolean` | `false` | Enable language logo |
| `pluginLanguageLogo.color` | `"mono" \| "original" \| "theme" \| "#hex"` | `"mono"` | Logo color mode |
| `pluginLanguageLogo.excludedLangs` | `string[]` | `[]` | Languages to exclude from showing logos |

**Color modes:**

- `"mono"` — Monochrome, auto-adapts to light/dark theme (light: `#111`, dark: `#fff`)
- `"original"` — Uses each language's original brand color (e.g. JS yellow, TS blue)
- `"theme"` — Uses the code block's foreground color
- `"#ff6600"` — Custom hex color value

```ts
pluginLanguageLogo: {
  enable: false,
  color: "mono",
  excludedLangs: [],
},
```

::: warning
Restart the Astro dev server after changing this configuration.
:::
