# 超级宅王小路

个人博客,记录人生三大主线:**身体健康、提高认知、陪伴家人**。

基于 **Astro 5 + TypeScript + Tailwind CSS 4**,部署在 GitHub Pages。
主题模板来自 [Ulysses Yang 的 blog](https://github.com/Ulysses-G-Yang/blog),在此致谢。

## 本地开发

```bash
npm install        # 安装依赖
npm run dev        # 开发模式(http://localhost:4321)
npm run build      # 构建 + 生成搜索索引(输出到 dist/)
npm run preview    # 本地预览构建产物
```

## 怎么写新文章

在 `src/content/blog/` 下新建一个 `.md` 文件,文件名就是 URL(如 `my-post.md` → `/my-post/`):

```markdown
---
title: 文章标题
description: 一句话摘要(列表卡片、RSS、SEO 都用它)
pubDate: 2026-11-04
category: essay      # tech = 技术分享 / essay = 杂谈随笔
tags: [随笔, 记录]
draft: false         # true = 草稿,不会发布
---

正文用 Markdown 随便写……
```

推送到 `main` 分支后约 2 分钟自动上线。

## 常用配置(`src/config.ts`)

| 配置 | 说明 |
| --- | --- |
| `SITE` | 站点名、作者、描述、GitHub、邮箱 |
| `GISCUS` | 评论系统(已配置,基于 GitHub Discussions) |
| `UMAMI` | 访问统计(注册 Umami Cloud 后填入脚本地址与网站 ID) |
| `NAV` | 导航栏 |

## 部署

推送到 `main` → GitHub Actions 自动构建 → 发布 GitHub Pages。

线上地址:https://wangxiaolu0716.github.io/

## 目录结构

```
src/
├── config.ts              # 全局配置(改这里)
├── content.config.ts      # 文章 frontmatter 校验规则
├── content/blog/          # 文章(Markdown)
├── content/notes/         # 「本周折腾」短内容
├── components/            # Header/Footer/幕布/搜索/评论/卡片等
├── layouts/BaseLayout.astro  # 布局 + 全站动效引擎
├── pages/                 # 路由:首页/博客/标签/归档/关于/留言板/RSS
├── styles/global.css      # 设计 tokens + 双主题 + 排版
└── utils/posts.ts         # base 路径 / 排序 / 标签汇总等工具
```

## 致谢

- 主题与动效模板:[Ulysses-G-Yang/blog](https://github.com/Ulysses-G-Yang/blog)
- 框架:[Astro](https://astro.build)
