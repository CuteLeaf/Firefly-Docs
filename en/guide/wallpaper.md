# Background Wallpaper

The background wallpaper configuration controls the site's background image display mode and related effects.

## Config File

`src/config/backgroundWallpaper.ts`

## Wallpaper Mode

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `mode` | `string` | `"banner"` | Mode: `"banner"` banner, `"fullscreen"` full-screen, `"overlay"` full-screen transparent, `"none"` solid color |
| `switchable` | `boolean` | `true` | Allow users to switch wallpaper mode via navbar |

::: tip
Set to `false` to improve performance (only renders the current mode). It's recommended to pick your preferred mode and disable switching.
:::

## Image Configuration

The `src` property supports multiple formats:

### Separate Desktop and Mobile

```ts
src: {
  desktop: "assets/images/DesktopWallpaper/d1.avif",
  mobile: "assets/images/MobileWallpaper/m1.avif",
},
```

### Multiple Images (Random)

```ts
src: {
  desktop: [
    "assets/images/DesktopWallpaper/d1.avif",
    "assets/images/DesktopWallpaper/d2.avif",
  ],
  mobile: [
    "assets/images/MobileWallpaper/m1.avif",
    "assets/images/MobileWallpaper/m2.avif",
  ],
},
```

### Random Image API

```ts
src: {
  desktop: "https://t.alcy.cc/pc",
  mobile: "https://t.alcy.cc/mp",
},
```

::: tip
Image path formats:
1. **public directory** (starts with `/`): not optimized
2. **src directory** (no leading `/`): auto-optimized (recommended)
3. **Remote URL**: not optimized, ensure small file size

Avoid renaming your custom images to `d1-d6` or `m1-m6`, as these default sample image names may be overwritten during updates.
:::

## Background Video Player

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `playerEnable` | `boolean` | `false` | Enable background video player. When enabled, a play button will appear in the navbar |
| `src.playerUrl` | `string \| string[]` | - | Video URL(s). Supports a single path or an array for multi-video cycling |
| `common.playerMode` | `"order" \| "random"` | `"order"` | Multi-video playback mode: `"order"` sequential loop, `"random"` random shuffle |

```ts
export const backgroundWallpaper = {
  playerEnable: true,
  src: {
    desktop: [...],
    mobile: [...],
    // Single video
    // playerUrl: "/assets/videos/firefly.mp4",
    // Multiple videos
    playerUrl: [
      "/assets/videos/video1.mp4",
      "/assets/videos/video2.mp4",
    ],
  },
  common: {
    playerMode: "random",
  },
};
```

::: tip
- Place local videos in the `public/assets/videos/` directory
- The play button is automatically hidden in solid color mode (`mode: "none"`)
- In multi-video mode, if a video fails to load, the player automatically tries the next one. A failure toast is shown when all videos fail
:::

## Common Configuration (Shared by Banner and Fullscreen)

Settings under `common` are shared between banner wallpaper and fullscreen wallpaper modes.

### Text Overlay Dim

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `common.dimOpacity` | `number` | `0.2` | Banner text overlay darkness, 0-1, higher values = darker |

### Home Banner Text

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `common.homeText.enable` | `boolean` | `true` | Enable banner text |
| `common.homeText.switchable` | `boolean` | `true` | Allow user toggle via control panel |
| `common.homeText.title` | `string` | `"Lovely firefly!"` | Main title |
| `common.homeText.titleSize` | `string` | `"3.8rem"` | Title font size |
| `common.homeText.subtitle` | `string \| string[]` | - | Subtitle(s) |
| `common.homeText.subtitleSize` | `string` | `"1.5rem"` | Subtitle font size |

### Typewriter Effect

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `common.homeText.typewriter.enable` | `boolean` | `true` | Enable typewriter effect |
| `common.homeText.typewriter.speed` | `number` | `100` | Typing speed (ms) |
| `common.homeText.typewriter.deleteSpeed` | `number` | `50` | Delete speed (ms) |
| `common.homeText.typewriter.pauseTime` | `number` | `2000` | Pause time after completion (ms) |

::: info
- Typewriter **enabled** — cycles through all subtitles
- Typewriter **disabled** — randomly shows one subtitle on each refresh
:::

### Navbar Transparency

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `common.navbar.transparentMode` | `string` | `"semi"` | Mode: `"semi"` semi-transparent, `"full"` fully transparent, `"semifull"` dynamic |
| `common.navbar.enableBlur` | `boolean` | `true` | Enable frosted glass blur |
| `common.navbar.blur` | `number` | `5` | Blur intensity |

### Wave Animation

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `common.waves.enable` | `boolean \| { desktop, mobile }` | `{ desktop: true, mobile: true }` | Enable wave animation |
| `common.waves.switchable` | `boolean` | `true` | Allow user toggle |

::: warning
Wave animation affects page performance. Enable based on your needs.
:::

### Gradient Transition

Automatically enabled when waves are disabled, providing a smooth gradient fade from the wallpaper bottom to the background color.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `common.gradient.enable` | `boolean \| { desktop, mobile }` | `{ desktop: true, mobile: true }` | Enable gradient transition |
| `common.gradient.height` | `string` | `"15vh"` | Gradient height |
| `common.gradient.switchable` | `boolean` | `true` | Allow user toggle |

::: info
Gradient and waves are mutually exclusive: when waves are enabled, the gradient is automatically hidden; when waves are disabled, the gradient is automatically shown. Both can be independently toggled via the control panel.
:::

## Banner Mode

### Image Position

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `banner.position` | `string` | `"0% 20%"` | CSS `object-position` value. Supports `'center'`, `'top'`, `'bottom'`, `'left'`, `'right'`, percentages, etc. |

### Banner Carousel

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `banner.carousel.enable` | `boolean` | `false` | Enable banner image carousel. If disabled, one image is randomly chosen on page refresh |
| `banner.carousel.interval` | `number` | `5000` | Carousel interval in milliseconds |
| `banner.carousel.switchable` | `boolean` | `false` | Allow users to toggle carousel in the control panel |

::: tip
Banner carousel only works when multiple images are configured in `src.desktop` or `src.mobile`.

When enabled, transitions are natural — the current image stays until the next one loads, which may cause a brief ghosting effect. If this doesn't look right, disable carousel and keep the random-per-refresh behavior.
:::

## Fullscreen Mode

Fullscreen wallpaper mode fills the entire screen with the background image.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `fullscreen.position` | `string` | `"center"` | CSS `object-position` value |

## Overlay Mode

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `overlay.switchable` | `boolean \| { opacity, blur, cardOpacity }` | - | Whether users can adjust overlay settings in the display panel. Can be a single switch or per-item switches |
| `overlay.zIndex` | `number` | `-1` | Z-index, ensures wallpaper stays in background layer |
| `overlay.opacity` | `number` | `0.8` | Wallpaper opacity (0-1) |
| `overlay.blur` | `number` | `10` | Background blur (px) |
| `overlay.cardOpacity` | `number` | `0.5` | Card background opacity (0-1). Lower values make cards more transparent |

You can control switching behavior in two ways:

```ts
overlay: {
  // Option 1: one switch for all overlay settings
  switchable: true,

  // Option 2: per-item control
  // switchable: {
  //   opacity: true,
  //   blur: true,
  //   cardOpacity: true,
  // },
}
```
