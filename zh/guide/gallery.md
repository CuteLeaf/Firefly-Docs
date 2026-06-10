# 相册

相册功能提供两级结构的图片展示页面：首页展示所有相册封面卡片，点击进入相册详情页查看照片（瀑布流布局）。

照片放在 `public/gallery/{相册id}/` 目录下，构建时自动扫描发现，无需逐张配置图片。

## 配置文件

`src/config/galleryConfig.ts`

## 启用相册

在 `src/config/siteConfig.ts` 中确保：

```ts
pages: {
  gallery: true,
}
```

## 使用方式

只需两步：

### 1. 配置相册元信息

在 `src/config/galleryConfig.ts` 中添加相册：

```ts
export const galleryConfig: GalleryConfig = {
  albums: [
    {
      id: "上海-2025",        // 对应 public/gallery/shanghai-2025/ 目录
      name: "上海之旅",
      description: "2025年上海旅行记录",
      location: "上海",
      date: "2025-04-10",
      tags: ["旅行", "上海"],
    },
  ],
  columnWidth: 240,
};
```

### 2. 放入照片

将照片放到对应目录中：

```
public/gallery/japan-2025/
  ├── cover.jpg    ← 自动作为封面（可选）
  ├── 01.jpg
  ├── 02.png
  └── 03.webp
```

构建时会自动扫描目录中所有图片文件，支持 `jpg`、`png`、`webp`、`avif`、`gif` 格式。

## 相册属性

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | `string` | 是 | 相册唯一标识符，同时作为目录名和 URL 路径 |
| `name` | `string` | 是 | 相册名称 |
| `description` | `string` | 否 | 相册描述 |
| `date` | `string` | 否 | 日期，格式 `YYYY-MM-DD` |
| `location` | `string` | 否 | 拍摄地点 |
| `tags` | `string[]` | 否 | 标签，用于首页筛选 |
| `cover` | `string` | 否 | 手动指定封面图 URL |
| `password` | `string` | 否 | 相册密码，设置后需要输入密码才能查看 |
| `passwordHint` | `string` | 否 | 密码提示信息，帮助访客回忆密码 |

## 全局配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `columnWidth` | `number` | `240` | 瀑布流最小列宽（px），浏览器根据容器宽度自动计算列数 |

::: tip `columnWidth` 说明
值越小，列数越多；值越大，列数越少。浏览器会根据容器宽度自动决定显示多少列，无需手动设置列数。
:::

## 封面图规则

封面图按以下优先级自动选取：

1. **手动指定**：设置了 `cover` 属性时使用指定的图片
2. **cover 文件**：目录中名为 `cover.*` 的文件（如 `cover.jpg`、`cover.png`）
3. **第一张图片**：按文件名排序的第一张图片

## 页面路由

| 路由 | 说明 |
|------|------|
| `/gallery/` | 相册首页，展示所有相册封面卡片，支持标签筛选 |
| `/gallery/{id}/` | 相册详情页，瀑布流展示照片，点击照片打开灯箱预览 |

## 配置示例

```ts
import type { GalleryConfig } from "@/types/galleryConfig";

export const galleryConfig: GalleryConfig = {
  albums: [
    {
      id: "firefly-2026",
      name: "可爱流萤",
      description: "飞萤之火自无梦的长夜亮起，绽放在终竟的明天。",
      location: "崩坏：星穹铁道",
      date: "2026-01-01",
      tags: ["崩坏星穹铁道", "流萤"],
    },
    {
      id: "travel-shanghai",
      name: "上海之旅",
      description: "上海的美好回忆",
      location: "上海",
      date: "2025-04-10",
      tags: ["旅行", "上海"],
      cover: "/gallery/travel-shanghai/best-photo.jpg",
    },
  ],
  columnWidth: 240,
};
```

::: tip
- 每添加一个数组项就相当于添加了一个相册，记得在 `public/gallery/` 目录下创建对应的子目录并放入图片
- 相册详情页的照片点击后会打开 FancyBox 灯箱预览，支持左右切换浏览
- 相册首页的标签筛选基于各相册的 `tags` 属性自动生成
- 图片使用浏览器原生懒加载，无需额外配置
:::
