# 风殿下舰长服指南

本网站使用 Markdown 管理教程内容，并由 GitHub Actions 自动构建、发布到 GitHub Pages。

## 日常修改教程

所有内容文件都在 [content/](content/)：

| 文件 | 用途 |
| --- | --- |
| `tutorial-01-*.md` | 教程步骤；所有符合这个命名的文件都会被自动发现、排序并显示在页面目录中。 |
| `faq.md` | 单独的常见问题/故障排查章节。 |
| `tutorial-format-example.md` | 格式模板；不会显示在页面中。 |

新增教程时，复制 [tutorial-format-example.md](content/tutorial-format-example.md)，并改名为：

```text
content/tutorial-01-你的教程名称.md
```

每篇教程必须包含以下 frontmatter：

```yaml
---
id: stable-anchor
navLabel: 目录显示名称
order: 40
title: 页面标题
---
```

- `id`：唯一的小写 kebab-case 锚点，例如 `voice-chat`。
- `navLabel`：目录中的短标题。
- `order`：正整数；决定显示顺序，不能重复。
- `title`：教程章节标题。

FAQ 只编辑 [faq.md](content/faq.md)，其 `id` 固定为 `troubleshooting`。

## 置顶公告

编辑 [announcement.md](content/announcement.md) 可以在网站最顶部显示红色公告横幅，支持普通 Markdown 和链接。文件为空或只包含空白时，公告不会显示；清空并提交即可撤下公告。

## 图片与下载链接

图片和下载文件位于 `public/`。Markdown 中必须写相对于 `public/` 的路径，**不要以 `/` 开头**：

```md
![教程截图](tutorial/official-launcher-select-windrealm.png)
[下载整合包](downloads/WindRealm-26.2.mrpack)
```

构建会自动添加 GitHub Pages 仓库路径，避免 `/<仓库名>/` 部署下图片丢失。

## 本地开发

需要 Node.js 24：

```bash
npm ci
npm run dev
```

构建生产版本：

```bash
npm run build
```

在 PowerShell 模拟 GitHub Pages 的仓库子路径：

```powershell
$env:VITE_BASE_PATH = '/你的仓库名/'
npm run build
```

## 自动部署

推送到 `main` 后，[GitHub Actions 工作流](.github/workflows/deploy.yml) 会自动构建 `dist/` 并发布。首次使用时，在 GitHub 仓库 **Settings → Pages** 中选择 **GitHub Actions**。

默认页面地址：`https://<用户名>.github.io/<仓库名>/`。

页面会请求状态和注册接口。请确认接口 CORS 允许 `https://<用户名>.github.io`；若绑定自定义域名，也应加入该域名。HTTPS 是剪贴板复制功能正常工作的必要条件。
