# 风殿下舰长服指南

这是可部署到 GitHub Pages 的静态网站源码。教程正文独立储存在 Markdown 中，推送到 `main` 后由 GitHub Actions 自动构建和发布。

## 日常修改内容

绝大多数文字只需编辑 [src/content/guide.md](src/content/guide.md)：

- 标题、步骤、表格、常见问题；
- 外部文档链接；
- 教程截图与下载链接。

图片、安装包与图标位于 `public/`。例如：

- `public/tutorial/`：教程截图；
- `public/downloads/`：启动器和整合包；
- `public/feng-avatar.jpg`：站点头像。

Markdown 中写资源路径时不要以 `/` 开头，例如使用 `tutorial/example.png` 而不是 `/tutorial/example.png`。构建过程会自动适配 GitHub Pages 的仓库子路径。

## 本地开发

需要 Node.js 22 或更新的 LTS 版本：

```bash
npm ci
npm run dev
```

构建与本地预览：

```bash
npm run build
npm run preview
```

模拟仓库 Pages 子路径：

```bash
VITE_BASE_PATH=/你的仓库名/ npm run build
```

Windows PowerShell：

```powershell
$env:VITE_BASE_PATH = '/你的仓库名/'
npm run build
```

## GitHub Pages 自动部署

1. 将此目录初始化/推送到 GitHub 仓库，默认分支应为 `main`。
2. 在 GitHub 仓库 **Settings → Pages**，将 Source 设为 **GitHub Actions**。
3. 推送到 `main` 后，[.github/workflows/deploy.yml](.github/workflows/deploy.yml) 会构建 `dist/` 并自动发布。
4. 默认网址为 `https://<用户名>.github.io/<仓库名>/`。

工作流会为项目页面设置 `VITE_BASE_PATH=/<仓库名>/`，因此图片、样式、下载和 favicon 可在子路径正常加载。

### 切换到自定义域名

自定义域名部署在站点根路径，需要将工作流构建环境变量改为：

```yaml
VITE_BASE_PATH: /
```

随后在 GitHub Pages 设置中配置域名与 DNS。切换后请重新验证图片、教程截图、下载和 favicon 的路径。

## 可配置的环境变量

以下环境变量都有当前服务的默认值，通常无需修改：

| 变量 | 用途 |
| --- | --- |
| `VITE_BASE_PATH` | 静态站点的部署路径。 |
| `VITE_SERVER_ADDRESS` | 游戏服务器地址。 |
| `VITE_STATUS_API_URL` | 状态 API 地址。 |
| `VITE_REGISTRATION_API_URL` | 注册 API 地址。 |

## 外部接口、CORS 与安全

页面会在用户浏览器中请求：

- `https://status.windking.fans/api/v1/status/simple`
- `https://reg.windking.fans/api/`

GitHub Pages 上线后，请确认这两个服务的 CORS 策略允许 `https://<用户名>.github.io`；绑定自定义域名后，也要把新域名加入允许列表。否则状态查询和站内注册会被浏览器拦截，但教程和外部注册入口仍可使用。

生产环境必须使用 HTTPS，才能可靠使用浏览器剪贴板功能。请勿在日志、Issue 或截图中记录注册表单的密码。
