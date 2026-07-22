# Display Settings Panel

The display settings panel is opened via the gear icon in the navbar, allowing visitors to customize theme color, wallpaper mode, card style, and more.

## Config File

`src/config/displaySettingsConfig.ts`

All switch configurations are centralized for easy control over which settings are visible to users.

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
| `wallpaperModeSwitchable` | `boolean` | `true` | Wallpaper mode switch toggle (banner/fullscreen/overlay/none) |
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
export const displaySettingsConfig: DisplaySettingsConfig = {
  // Appearance
  themeColorSwitchable: true,
  layoutSwitchable: true,
  cardBorderSwitchable: true,
  cardFollowThemeSwitchable: true,

  // Wallpaper
  wallpaperModeSwitchable: true,
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
};
```

::: tip
Set to `false` to hide the corresponding setting item, simplifying the panel interface.
:::
