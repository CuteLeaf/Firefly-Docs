# Display Settings Panel

The display settings panel is opened via the gear icon in the navbar, allowing visitors to customize theme color, wallpaper mode, card style, and more.

::: warning Disabled by default
This panel is disabled by default. Enable it via `enable` or the `PUBLIC_DISPLAY_SETTINGS` environment variable — see [Master Switch](#master-switch).
:::

## Config File

`src/config/displaySettingsConfig.ts`

All switch configurations are centralized for easy control over which settings are visible to users.

## Master Switch

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enable` | `boolean` | `false` | Master switch for the display settings panel |

The panel is **disabled by default**. When disabled, the navbar gear icon is not rendered, pages neither render the panel nor load its JavaScript, and every setting below is treated as `false` (wallpaper mode and the like simply use the defaults configured in `backgroundWallpaper`).

### Enabling via environment variable

Instead of editing the config file, you can set a build environment variable on your hosting platform (Vercel / Cloudflare / EdgeOne, etc.) — **no code changes needed**:

```bash
PUBLIC_DISPLAY_SETTINGS=true
```

- The environment variable takes precedence over `enable` in the config file; the config value is only used when the variable is unset or unrecognized
- Enabling values: `true` `1` `on` `yes` `enable` `enabled`
- Disabling values: `false` `0` `off` `no` `disable` `disabled`
- The name **must keep the `PUBLIC_` prefix** — that is Astro's requirement for injecting a variable into browser-side code. Without it the panel's client-side logic cannot read the value

::: tip
A good workflow: keep the panel off in production for the smallest output, and when you need to preview or debug it, add the environment variable, redeploy, then remove it afterwards.
:::

## Appearance Settings

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `themeColorSwitchable` | `boolean` | `true` | Theme color picker toggle |
| `layoutSwitchable` | `boolean` | `true` | Post list layout switch toggle |
| `cardBorderSwitchable` | `boolean` | `true` | Card border and shadow toggle |
| `cardFollowThemeSwitchable` | `boolean` | `true` | Card style follow theme color toggle |

## Wallpaper Settings

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `wallpaperModeSwitchable` | `boolean` | `false` | Wallpaper mode switch toggle (banner/fullscreen/overlay/none). Enabling this noticeably grows the build |
| `wavesSwitchable` | `boolean` | `true` | Wave animation toggle |
| `gradientSwitchable` | `boolean` | `true` | Gradient transition effect toggle |
| `bannerTitleSwitchable` | `boolean` | `true` | Banner title display toggle (requires `homeText.enable` to be enabled) |
| `bannerCarouselSwitchable` | `boolean` | `true` | Wallpaper carousel toggle |
| `overlaySwitchable` | `boolean \| object` | `{ opacity: true, blur: true, cardOpacity: true }` | Overlay mode parameter adjustment toggle, supports master toggle or per-item toggles |

`overlaySwitchable` supports two formats:

```ts
// Option 1: master toggle for all overlay settings
overlaySwitchable: true,

// Option 2: per-item toggles
overlaySwitchable: {
  opacity: true,
  blur: true,
  cardOpacity: true,
},
```

## Effects Settings

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `sakuraSwitchable` | `boolean` | `true` | Sakura effect toggle |

## Panel Structure

The settings panel uses a tabbed layout with three tabs:

- **Appearance**: theme color, layout switch, card style
- **Wallpaper**: wallpaper mode, overlay settings, banner settings
- **Effects**: sakura effect

When a tab has no visible settings, it is automatically hidden. If only one tab has content, the tab bar is hidden.

## Complete Example

```ts
export const displaySettingsConfig: DisplaySettingsConfig =
  resolveDisplaySettingsConfig({
    // Master switch (overridable via PUBLIC_DISPLAY_SETTINGS)
    enable: false,

    // Appearance
    themeColorSwitchable: true,
    layoutSwitchable: true,
    cardBorderSwitchable: true,
    cardFollowThemeSwitchable: true,

    // Wallpaper
    wallpaperModeSwitchable: false,
    wavesSwitchable: true,
    gradientSwitchable: true,
    bannerTitleSwitchable: true,
    bannerCarouselSwitchable: true,
    overlaySwitchable: {
      opacity: true,
      blur: true,
      cardOpacity: true,
    },

    // Effects
    sakuraSwitchable: true,
  });
```

The `resolveDisplaySettingsConfig()` wrapper applies the master switch: it reads the environment variable override for `enable` and forces every setting to `false` when the panel is off. It lives in `src/utils/display-settings-utils.ts` and normally needs no changes.

::: tip
Set to `false` to hide the corresponding setting item, simplifying the panel interface.
:::
