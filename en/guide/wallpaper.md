# Background Wallpaper

The background wallpaper configuration controls the site's background image display mode and related effects.

## Config File

`src/config/backgroundWallpaper.ts`

## Wallpaper Mode

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `mode` | `string` | `"banner"` | Mode: `"banner"`, `"overlay"` full-screen transparent, `"none"` solid color |
| `switchable` | `boolean` | `true` | Allow users to switch wallpaper mode via navbar |

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
:::

## Banner Mode

### Image Position

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `banner.position` | `string` | `"0% 20%"` | CSS `object-position` value |

### Home Banner Text

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `banner.homeText.enable` | `boolean` | `true` | Enable banner text |
| `banner.homeText.switchable` | `boolean` | `true` | Allow user toggle via control panel |
| `banner.homeText.title` | `string` | `"Lovely firefly!"` | Main title |
| `banner.homeText.titleSize` | `string` | `"3.8rem"` | Title font size |
| `banner.homeText.subtitle` | `string \| string[]` | - | Subtitle(s) |
| `banner.homeText.subtitleSize` | `string` | `"1.5rem"` | Subtitle font size |

### Typewriter Effect

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `banner.homeText.typewriter.enable` | `boolean` | `true` | Enable typewriter effect |
| `banner.homeText.typewriter.speed` | `number` | `100` | Typing speed (ms) |
| `banner.homeText.typewriter.deleteSpeed` | `number` | `50` | Delete speed (ms) |
| `banner.homeText.typewriter.pauseTime` | `number` | `2000` | Pause time after completion (ms) |

::: info
- Typewriter **enabled** — cycles through all subtitles
- Typewriter **disabled** — randomly shows one subtitle on each refresh
:::

### Image Credit

| Property | Type | Description |
|----------|------|-------------|
| `banner.credit.enable` | `boolean \| { desktop, mobile }` | Show credit text |
| `banner.credit.text` | `string \| { desktop, mobile }` | Credit text |
| `banner.credit.url` | `string \| { desktop, mobile }` | Original artwork URL |

### Navbar Transparency

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `banner.navbar.transparentMode` | `string` | `"semifull"` | Mode: `"semi"`, `"full"`, `"semifull"` (dynamic) |
| `banner.navbar.enableBlur` | `boolean` | `true` | Enable frosted glass blur |
| `banner.navbar.blur` | `number` | `3` | Blur intensity |

### Banner Carousel

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `banner.carousel.enable` | `boolean` | `true` | Enable banner image carousel. If disabled, one image is randomly chosen on page refresh |
| `banner.carousel.interval` | `number` | `5000` | Carousel interval in milliseconds |
| `banner.carousel.switchable` | `boolean` | `true` | Allow users to toggle carousel in the control panel |

::: tip
Banner carousel only works when multiple images are configured in `src.desktop` or `src.mobile`.
:::

### Wave Animation

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `banner.waves.enable` | `boolean \| { desktop, mobile }` | `{ desktop: true, mobile: true }` | Enable wave animation |
| `banner.waves.switchable` | `boolean` | `true` | Allow user toggle |

::: warning
Wave animation affects page performance. Enable based on your needs.
:::

## Overlay Mode

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `overlay.switchable` | `boolean \| { opacity, blur, cardOpacity }` | `false` (if omitted) | Whether users can adjust overlay settings in the display panel. Can be a single switch or per-item switches |
| `overlay.zIndex` | `number` | `-1` | Z-index |
| `overlay.opacity` | `number` | `0.8` | Wallpaper opacity (0-1) |
| `overlay.blur` | `number` | `3` | Background blur (px) |
| `overlay.cardOpacity` | `number` | `0.6` | Card background opacity (0-1). Lower values make cards more transparent |

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
