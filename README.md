# 风殿下舰长服指南

本仓库会将原始页面的**生产构建产物原样发布**，以保证 GitHub Pages 上的界面、排版、颜色、响应式布局和交互与交付的原页面一致。

## 页面内容与资源

- `public/index.html`：原页面入口。
- `public/assets/index-4r9nLhkC.js`：原页面的交互实现。
- `public/assets/index-B-3b_oxy.css`：原页面的完整样式。
- `public/tutorial/`、`public/downloads/`、`public/*.jpg`：页面所需图片与下载文件。
- `src/content/guide.md`：教程内容的 Markdown 备份与编辑草稿；目前线上页面仍由原始 bundle 渲染，编辑该文件**不会自动改变线上页面**。

> 选择直接发布原始 bundle 是为了严格保持页面“一模一样”。原 bundle 把教程文本、复杂的安装方式菜单、语音安装 tabs、折叠内容和注册弹窗都固化在一起。若要让 Markdown 改动自动反映到网站，需要先逐项把这些原始 DOM 和交互重建为可维护源码，并用截图比对保证不产生任何视觉差异。

## 本地预览

需要 Node.js 24 或更高版本：

```bash
npm ci
npm run dev
```

构建：

```bash
npm run build
```

在 GitHub Pages 仓库子路径下模拟构建：

```powershell
$env:VITE_BASE_PATH = '/你的仓库名/'
npm run build
```

## GitHub Pages 自动部署

1. 将仓库推送到 `main`。
2. 在 **Settings → Pages** 中选择 **GitHub Actions**。
3. 每次推送到 `main` 时，[deploy.yml](.github/workflows/deploy.yml) 自动构建并发布 `dist/`。
4. 默认访问地址为 `https://<用户名>.github.io/<仓库名>/`。

工作流会把 `VITE_BASE_PATH` 设为 `/<仓库名>/`。构建入口和 bundle 内页面资源均使用相对路径，因此图片、截图和下载文件可在 Pages 子路径下正常访问。

### 自定义域名

若配置自定义域名根路径，将工作流中的构建变量改为：

```yaml
VITE_BASE_PATH: /
```

## 外部服务

页面会从浏览器请求：

- `https://status.windking.fans/api/v1/status/simple`
- `https://reg.windking.fans/api/`

GitHub Pages 上线后，请确认接口 CORS 允许 `https://<用户名>.github.io`；使用自定义域名后也需加入该域名。生产环境必须使用 HTTPS，以支持浏览器剪贴板功能。
