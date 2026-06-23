import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Firefly Docs',
  description: 'Documentation for Firefly Astro Blog Theme Template',

  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', href: '/images/logo.png' }],
    ['script', { src: 'https://cloud.umami.is/script.js', 'data-website-id': '87bc9afb-976c-42dd-9c2e-348e79779bfb' }]
  ],

  themeConfig: {
    logo: '/images/logo.png',
    search: {
      provider: 'local',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/CuteLeaf/Firefly' },
    ],
    footer: {
      message: 'Released under the <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">CC BY-NC-SA 4.0</a> License.',
      copyright: 'Copyright © 2026 <a href="https://github.com/CuteLeaf" target="_blank">CuteLeaf</a> | <a href="https://beian.miit.gov.cn/" target="_blank">桂ICP备20005240号-7</a>',
    },
  },

  locales: {
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh/' },
          { text: '指南', link: '/zh/guide/getting-started' },
        ],
        sidebar: {
          '/zh/guide/': [
            {
              text: '入门',
              items: [
                { text: '快速开始', link: '/zh/guide/getting-started' },
                { text: '编写文章', link: '/zh/guide/writing' },
                { text: '部署指南', link: '/zh/guide/deploy' },
                { text: '更新主题', link: '/zh/guide/update' },
              ],
            },
            {
              text: '基础配置',
              items: [
                { text: '站点配置', link: '/zh/guide/site' },
                { text: '个人资料', link: '/zh/guide/profile' },
                { text: '背景壁纸', link: '/zh/guide/wallpaper' },
                { text: '导航栏', link: '/zh/guide/navbar' },
                { text: '侧边栏', link: '/zh/guide/sidebar' },
                { text: '侧边栏小组件', link: '/zh/guide/widgets' },
              ],
            },
            {
              text: '功能配置',
              items: [
                { text: '字体', link: '/zh/guide/font' },
                { text: '代码块', link: '/zh/guide/code-block' },
                { text: '评论系统', link: '/zh/guide/comment' },
                { text: '封面图片', link: '/zh/guide/cover-image' },
                { text: '文章加密', link: '/zh/guide/password' },
                { text: '音乐播放器', link: '/zh/guide/music' },
                { text: 'Mermaid 图表', link: '/zh/guide/mermaid' },
                { text: 'PlantUML 图表', link: '/zh/guide/plantuml' }, 
              ],
            },
            {
              text: '页面配置',
              items: [
                { text: '友链', link: '/zh/guide/friends' },
                { text: '相册', link: '/zh/guide/gallery' },
                { text: '番组计划', link: '/zh/guide/bangumi' },
                { text: '追番', link: '/zh/guide/anime' },
                { text: '打赏', link: '/zh/guide/sponsor' },
              ],
            },
            {
              text: '扩展功能',
              items: [
                { text: '特效设置', link: '/zh/guide/effects' },
                { text: '公告', link: '/zh/guide/announcement' },
                { text: '页脚', link: '/zh/guide/footer' },
                { text: '广告', link: '/zh/guide/ad' },
                { text: '许可证', link: '/zh/guide/license' },
                { text: 'Live2D / Spine 模型', link: '/zh/guide/pio' },
              ],
            },
          ],
        },
        outline: {
          label: '页面导航',
        },
        lastUpdated: {
          text: '最后更新于',
        },
        editLink: {
          pattern: 'https://github.com/CuteLeaf/Firefly-docs/edit/main/:path',
          text: '在 GitHub 上编辑此页',
        },
        docFooter: {
          prev: '上一页',
          next: '下一页',
        },
      },
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Guide', link: '/en/guide/getting-started' },
        ],
        sidebar: {
          '/en/guide/': [
            {
              text: 'Getting Started',
              items: [
                { text: 'Quick Start', link: '/en/guide/getting-started' },
                { text: 'Writing Posts', link: '/en/guide/writing' },
                { text: 'Deployment Guide', link: '/en/guide/deploy' },
                { text: 'Updating', link: '/en/guide/update' },
              ],
            },
            {
              text: 'Basic Configuration',
              items: [
                { text: 'Site Config', link: '/en/guide/site' },
                { text: 'Profile', link: '/en/guide/profile' },
                { text: 'Background Wallpaper', link: '/en/guide/wallpaper' },
                { text: 'Navbar', link: '/en/guide/navbar' },
                { text: 'Sidebar', link: '/en/guide/sidebar' },
                { text: 'Sidebar Widgets', link: '/en/guide/widgets' },
              ],
            },
            {
              text: 'Feature Configuration',
              items: [
                { text: 'Font', link: '/en/guide/font' },
                { text: 'Code Block', link: '/en/guide/code-block' },
                { text: 'Comment System', link: '/en/guide/comment' },
                { text: 'Music Player', link: '/en/guide/music' },
                { text: 'Encryption Post', link: '/en/guide/password' },
                { text: 'Cover Image', link: '/en/guide/cover-image' },
                { text: 'Mermaid Diagram', link: '/en/guide/mermaid' },
                { text: 'PlantUML Diagram', link: '/en/guide/plantuml' },
              ],
            },
            {
              text: 'Page Configuration',
              items: [
                { text: 'Friends', link: '/en/guide/friends' },
                { text: 'Gallery', link: '/en/guide/gallery' },
                { text: 'Bangumi', link: '/en/guide/bangumi' },
                { text: 'Anime', link: '/en/guide/anime' },
                { text: 'Sponsor', link: '/en/guide/sponsor' },
              ],
            },
            {
              text: 'Extended Features',
              items: [
                { text: 'Effects', link: '/en/guide/effects' },
                { text: 'Announcement', link: '/en/guide/announcement' },
                { text: 'Footer', link: '/en/guide/footer' },
                { text: 'Advertisement', link: '/en/guide/ad' },
                { text: 'License', link: '/en/guide/license' },
                { text: 'Live2D / Spine Model', link: '/en/guide/pio' },
              ],
            },
          ],
        },
        outline: {
          label: 'On this page',
        },
        lastUpdated: {
          text: 'Last updated',
        },
        editLink: {
          pattern: 'https://github.com/CuteLeaf/Firefly-docs/edit/main/:path',
          text: 'Edit this page on GitHub',
        },
        docFooter: {
          prev: 'Previous',
          next: 'Next',
        },
      },
    },
  },
})
