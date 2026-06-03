# 部署指南

本指南介绍如何将 Firefly 博客部署到各个平台。

## 本地构建

如果你使用自己的网页服务器（如 Nginx、Apache 等），可以在本地构建后手动上传：

```bash
pnpm build
```

构建产物位于 `dist/` 目录，将该目录下的所有文件上传到你的服务器即可。

## Vercel

[Vercel](https://vercel.com/) 是部署 Astro 项目最简单的平台之一。

### 方法一：通过 Vercel 控制台

1. 将你的项目推送到 GitHub / GitLab / Bitbucket
2. 登录 [Vercel](https://vercel.com/)，点击 **Add New … → Project**
3. 导入你的仓库
4. Vercel 会自动检测 Astro 框架，配置如下：
   - **Application Preset**: `Astro`
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`
   - **Install Command**: `pnpm install`
5. 设置 Node.js 版本：进入 **Settings → General → Node.js Version**，选择 `22.x`
6. 点击 **Deploy**

### 方法二：使用 vercel.json

在项目根目录创建 `vercel.json`：

```json
{
  "framework": "astro",
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "installCommand": "pnpm install"
}
```

## Netlify

[Netlify](https://www.netlify.com/) 是另一个流行的静态站点托管平台。

### 方法一：通过 Netlify 控制台

1. 将你的项目推送到 GitHub / GitLab / Bitbucket / Azure DevOps
2. 登录 [Netlify](https://app.netlify.com/)
3. 点击 **Add new project → Import a Git repository**
4. 连接你的仓库
5. 配置构建设置：
   - **Build command**: `pnpm build`
   - **Publish directory**: `dist`
6. 在 **Environment variables** 中设置 `NODE_VERSION` 为 `22`
7. 点击 **Deploy …**

### 方法二：使用 netlify.toml

在项目根目录创建 `netlify.toml`：

```toml
[build]
  command = "pnpm build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22"
```

## GitHub Pages

使用 GitHub Actions 可以将 Firefly 部署到 GitHub Pages。

### 步骤

1. 在 GitHub 仓库设置中：**Settings → Pages → Source**，选择 **GitHub Actions**

2. 在项目根目录创建 `.github/workflows/deploy.yml`：

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

3. 在 `astro.config.mjs` 中设置 `site` 和 `base`：

```js
export default defineConfig({
  site: "https://<username>.github.io",
  base: "/<repo-name>/",
});
```

::: warning
若使用自定义域名，或仓库名为 `<username>.github.io`，`base` 都无需设置。
:::

## Cloudflare Workers / Pages

[Cloudflare Workers](https://workers.cloudflare.com) 提供免费的 Serverless 边缘计算，[Cloudflare Pages](https://pages.cloudflare.com/) 提供静态站点托管。两者都可以部署 Firefly。

项目已包含 `wrangler.jsonc` 配置文件，你只需修改 `name` 为你的项目名称，`compatibility_date` 更新为今日日期：

```jsonc
{
    "name": "your-project-name",        // 修改为你的项目名称
  "compatibility_date": "YYYY-MM-DD", // 更为今日
  "compatibility_flags": ["nodejs_compat"],

  "assets": {
    "directory": "./dist"
  }
}
```

### 部署步骤

1. 将你的项目推送到 GitHub / GitLab
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. 进入 **计算 → Workers 和 Pages → 创建应用程序 → Connect Github / GitLab**
4. 选择你的仓库
5. 配置构建设置：
   - **构建命令**: `pnpm build`
   - **部署命令**: `npx wrangler deploy`
6. 点击 **部署**

::: tip 多平台部署
Cloudflare Pages 部署时不需要 Astro 适配器，直接使用静态文件。项目通过 `process.env.CF_WORKERS` 环境变量判断是否启用适配器（仅 Workers SSR 部署时使用），Pages 和其他平台（Vercel、Netlify 等）不受影响。
:::

## EdgeOne Pages

[EdgeOne Pages](https://edgeone.ai/products/pages) 是腾讯云提供的边缘计算静态站点托管服务。

### 部署步骤

1. 将你的项目推送到 GitHub / GitLab / Gitee / CNB
2. 登录 [EdgeOne 控制台](https://console.tencentcloud.com/edgeone)
3. 进入 **服务总览 → Pages**，点击 **创建项目**
4. 选择 **从 Git 仓库导入**，连接你的仓库
5. 配置构建设置：
   - **框架预设**: `Astro`
   - **输出目录**: `dist`
   - **构建命令**: `pnpm build`
   - **安装命令**: `pnpm install`
6. 在环境变量中设置 `NODE_VERSION` 为 `22`
7. 点击 **开始部署**

::: tip
EdgeOne Pages 在中国大陆有边缘节点，对国内用户访问速度友好。
:::

## 阿里云 ESA

[阿里云 ESA（边缘安全加速）](https://www.alibabacloud.com/product/esa) 提供了 Pages 静态站点托管功能。

### 部署步骤

1. 登录 [阿里云 ESA 控制台](https://esa.console.aliyun.com/)
2. 进入 **Pages** 功能，点击 **创建项目**
3. 选择 **从 Git 仓库导入**，连接 GitHub / GitLab 仓库
4. 配置构建设置：
   - **框架预设**: `Astro`
   - **构建命令**: `pnpm build`
   - **输出目录**: `dist`
5. 在环境变量中设置 `NODE_VERSION` 为 `22`
6. 点击 **开始部署**

::: tip
阿里云 ESA 在全球有大量边缘节点，尤其在中国大陆覆盖广泛，适合面向国内用户的博客。
:::

## 自定义域名

大多数平台都支持自定义域名绑定。一般步骤为：

1. 在域名解析商处添加 CNAME 记录，指向平台分配的域名
2. 在平台控制台中添加自定义域名
3. 等待 DNS 生效（通常几分钟到几小时）
4. 启用 HTTPS（大多数平台会自动申请 SSL 证书）

## 部署注意事项

- 以上大多静态资源托管平台都支持自动部署仓库的每次提交
- 确保 `astro.config.mjs` 中的 `site` 字段设置为你的实际域名
- 如果使用子路径部署（如 `https://example.com/blog/`），需要设置 `base` 字段
- 各平台的 Node.js 版本需要设置为 22 或更高
- 首次部署后，后续推送代码会自动触发重新部署
