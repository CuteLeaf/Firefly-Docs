# Getting Started

**Firefly** is a clean, beautiful, and modern personal blog theme built on the **Astro** framework and the **Fuwari** template. Designed for tech enthusiasts and content creators, it combines a modern web tech stack with rich feature modules and a highly customizable interface, enabling you to effortlessly create a professional and visually appealing personal blog.

![firefly](/images/1.webp)

## Requirements

- [Node.js](https://nodejs.org/) 22.0 or higher
- [pnpm](https://pnpm.io/) package manager (recommended)
- [Git](https://git-scm.com/)

## Installation

1. Clone the repository

```bash
git clone https://github.com/CuteLeaf/Firefly.git
cd Firefly
```

2. Install dependencies

```bash
pnpm install
```

3. Start the development server

```bash
pnpm dev
```

4. Build for production

```bash
pnpm build
```

## Project Structure

```
Firefly/
├── src/
│   ├── config/          # Configuration files
│   ├── components/      # Components
│   ├── content/         # Content (posts, pages)
│   ├── layouts/         # Layout templates
│   ├── pages/           # Page routes
│   └── types/           # Type definitions
├── public/              # Static assets
└── astro.config.mjs     # Astro configuration
```

## Configuration Overview

All configuration files are located in the `src/config/` directory:

| Config File | Description | Docs |
|------------|-------------|------|
| `siteConfig.ts` | Site basic configuration | [Site Config](./site.md) |
| `navBarConfig.ts` | Navbar configuration | [Navbar](./navbar.md) |
| `sidebarConfig.ts` | Sidebar layout configuration | [Sidebar](./sidebar.md) |
| `profileConfig.ts` | Profile configuration | [Profile](./profile.md) |
| `backgroundWallpaper.ts` | Background wallpaper configuration | [Wallpaper](./wallpaper.md) |
| `commentConfig.ts` | Comment system configuration | [Comment](./comment.md) |
| `musicConfig.ts` | Music player configuration | [Music Player](./music.md) |
| `fontConfig.ts` | Font configuration | [Font](./font.md) |
| `coverImageConfig.ts` | Cover image configuration | [Cover Image](./cover-image.md) |
| `expressiveCodeConfig.ts` | Code block configuration | [Code Block](./code-block.md) |
| `effectsConfig.ts` | Effects configuration | [Effects](./effects.md) |
| `announcementConfig.ts` | Announcement configuration | [Announcement](./announcement.md) |
| `footerConfig.ts` | Footer configuration | [Footer](./footer.md) |
| `licenseConfig.ts` | License configuration | [License](./license.md) |
| `friendsConfig.ts` | Friends links configuration | [Friends](./friends.md) |
| `sponsorConfig.ts` | Sponsor configuration | [Sponsor](./sponsor.md) |
| `analyticsConfig.ts` | Analytics configuration | [Site Config](./site.md#analytics) |
| `galleryConfig.ts` | Gallery configuration | [Gallery](./gallery.md) |
| `mermaidConfig.ts` | Mermaid diagram configuration | [Mermaid](./mermaid.md) |
| `plantumlConfig.ts` | PlantUML diagram configuration | [PlantUML](./plantuml.md) |
| `pioConfig.ts` | Live2D/Spine model configuration | [Live2D/Spine](./pio.md) |
