# Deployment Guide

This guide covers how to deploy your Firefly blog to various platforms.

## Local Build

If you use your own web server (e.g., Nginx, Apache, etc.), you can build locally and upload manually:

```bash
pnpm build
```

The build output is in the `dist/` directory. Upload all files from that directory to your server.

## Vercel

[Vercel](https://vercel.com/) is one of the easiest platforms for deploying Astro projects.

### Option 1: Via Vercel Dashboard

1. Push your project to GitHub / GitLab / Bitbucket
2. Log in to [Vercel](https://vercel.com/), click **Add New … → Project**
3. Import your repository
4. Vercel will auto-detect the Astro framework:
   - **Application Preset**: `Astro`
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`
   - **Install Command**: `pnpm install`
5. Set Node.js version: go to **Settings → General → Node.js Version**, select `22.x`
6. Click **Deploy**

### Option 2: Using vercel.json

Create `vercel.json` in the project root:

```json
{
  "framework": "astro",
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "installCommand": "pnpm install"
}
```

## Netlify

[Netlify](https://www.netlify.com/) is another popular static site hosting platform.

### Option 1: Via Netlify Dashboard

1. Push your project to GitHub / GitLab / Bitbucket / Azure DevOps
2. Log in to [Netlify](https://app.netlify.com/)
3. Click **Add new project → Import a Git repository**
4. Connect your repository
5. Configure build settings:
   - **Build command**: `pnpm build`
   - **Publish directory**: `dist`
6. Set `NODE_VERSION` to `22` in **Environment variables**
7. Click **Deploy …**

### Option 2: Using netlify.toml

Create `netlify.toml` in the project root:

```toml
[build]
  command = "pnpm build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22"
```

## GitHub Pages

Use GitHub Actions to deploy Firefly to GitHub Pages.

### Steps

1. In your GitHub repository: **Settings → Pages → Source**, select **GitHub Actions**

2. Create `.github/workflows/deploy.yml` in the project root:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

3. Set `site` and `base` in `astro.config.mjs`:

```js
export default defineConfig({
  site: "https://<username>.github.io",
  base: "/<repo-name>/",
});
```

::: warning
No editing needed for `base`, if the GitHub Pages set a custom domain or the repo is named `<username>.github.io`
:::

## Cloudflare Workers / Pages

[Cloudflare Workers](https://workers.cloudflare.com) offers free serverless edge computing, and [Cloudflare Pages](https://pages.cloudflare.com/) provides static site hosting. Both can deploy Firefly.

The project already includes a `wrangler.jsonc` configuration file. You only need to update `name` to your project name and `compatibility_date` to today's date:

```jsonc
{
  "name": "your-project-name",        // change to your project name
  "compatibility_date": "YYYY-MM-DD", // edit to today
  "compatibility_flags": ["nodejs_compat"],
  "assets": {
    "directory": "./dist"
  }
}
```

### Deployment Steps

1. Push your project to GitHub / GitLab
2. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. Enter **Compute → Workers & Pages**, click **Create application → Connect Github / GitLab**
4. Select your repository
5. Configure build settings:
   - **Build command**: `pnpm build`
   - **Deploy command**: `npx wrangler deploy`
6. Click **Deploy**

::: tip Multi-platform Deployment
Cloudflare Pages deployment does not require the Astro adapter — it serves static files directly. The project uses `process.env.CF_WORKERS` environment variable to determine whether to enable the adapter (only for Workers SSR deployment). Pages and other platforms (Vercel, Netlify, etc.) are not affected.
:::

## EdgeOne Pages

[EdgeOne Pages](https://edgeone.ai/products/pages) is a static site hosting service provided by Tencent Cloud's edge computing platform.

### Steps

1. Push your project to GitHub / GitLab / Gitee / CNB
2. Log in to [EdgeOne Console](https://console.tencentcloud.com/edgeone)
3. Go to **Service Dashboard → Pages**, click **Create project**
4. Select **Import Git repository**, connect your repository
5. Configure build settings:
   - **Preset framework**: `Astro`
   - **Build output directory**: `dist`
   - **Build command**: `pnpm build`
   - **Install command**: `pnpm install`
6. Set `NODE_VERSION` to `22` in environment variables
7. Click **Start Deployment**

::: tip
EdgeOne Pages has edge nodes in mainland China, providing fast access for Chinese users.
:::

## Alibaba Cloud ESA

[Alibaba Cloud ESA (Edge Security Acceleration)](https://www.alibabacloud.com/product/esa) offers a Pages static site hosting feature.

### Steps

1. Log in to [Alibaba Cloud ESA Console](https://esa.console.aliyun.com/)
2. Go to **Pages**, click **Create Project**
3. Select **Import from Git**, connect your GitHub / GitLab repository
4. Configure build settings:
   - **Framework preset**: `Astro`
   - **Build command**: `pnpm build`
   - **Output directory**: `dist`
5. Set `NODE_VERSION` to `22` in environment variables
6. Click **Start Deployment**

::: tip
Alibaba Cloud ESA has extensive edge nodes globally, with particularly broad coverage in mainland China, making it ideal for blogs targeting Chinese users.
:::

## Custom Domain

Most platforms support custom domain binding. General steps:

1. Add a CNAME record at your DNS provider pointing to the platform-assigned domain
2. Add the custom domain in the platform dashboard
3. Wait for DNS propagation (usually a few minutes to hours)
4. Enable HTTPS (most platforms auto-provision SSL certificates)

## Deployment Notes

- Most of the above platforms support automatic deployments: every push to the corresponding branch triggers a build and deploy.
- Ensure `site` in `astro.config.mjs` is set to your actual domain
- If deploying to a subpath (e.g., `https://example.com/blog/`), set the `base` field
- Node.js version must be set to 22 or higher on all platforms
- After the initial deployment, subsequent code pushes will automatically trigger redeployment
