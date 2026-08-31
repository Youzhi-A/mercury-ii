# 水卫二 Mercury II

`mercury2.space` 的 Astro 静态站点。Markdown 是文章的唯一事实源。

## 本地运行

```bash
npm install
npm run dev
```

正式构建：

```bash
npm run build
```

构建结果在 `dist/`。

## 写文章

在 `src/content/posts/` 新建 Markdown 文件。每篇至少包含：

```yaml
---
title: 文章标题
date: 2026-08-30
tags:
  - 标签
summary: 一句话摘要
---
```

文件名会成为文章 URL。需要暂不发布时添加 `draft: true`。

正文中的单次换行会按原样显示，不需要在行尾添加反斜杠。空行仍然用于另起一个段落。

## 修改 About

直接编辑 `src/content/pages/about.md`。

## GitHub Pages 临时部署

1. 创建名为 `mercury-ii` 的 GitHub Public 仓库。
2. 把本项目推送到仓库的 `main` 分支。
3. 在仓库的 `Settings → Pages` 中把 Source 设为 `GitHub Actions`。
4. 等待 `Deploy to GitHub Pages` 工作流完成。

GitHub Actions 构建时会自动使用 `https://<用户名>.github.io/mercury-ii/`，每次 push 都会重新部署。

## 长期维护边界

- 不引入数据库和后端。
- 不把正文存到框架组件里。
- 新功能先判断是否会增加长期维护成本。
- 第一版稳定后，优先写内容。
