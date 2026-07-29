# 注册与登录指南

欢迎来到风殿下舰长服。本页会带你完成注册、安装整合包、进入服务器和常见问题排查。

> 服务器地址：`windking.fans`  
> 支持 Minecraft Java Edition 1.7 及以上版本；建议按下方整合包流程安装。

## 注册舰长服账号 {#register}

### 注册前请准备

1. 已进入风殿下舰长（或符合当前服务器公告的资格）。
2. 你的 **Bilibili 数字 UID**，不是昵称或个人空间链接。
3. 一个 Minecraft Java 用户名。
4. 专用于服务器的密码；请勿复用邮箱、Bilibili 或其他重要账号的密码。

点击页面中的“立即注册”打开表单。填写 Minecraft 用户名、Bilibili UID、密码和可选邮箱后提交即可。

| 字段 | 说明 |
| --- | --- |
| Minecraft 用户名 | 你进入服务器使用的游戏名。 |
| Bilibili UID | 纯数字 UID，用于验证资格。 |
| 密码 | 服务器登录密码，请妥善保存。 |
| 邮箱 | 可选；建议填写，便于后续协助找回。 |

> 注册成功不代表客户端已登录。请继续完成安装，并在游戏内按“登录服务器”章节操作。

## 安装游戏与整合包 {#install}

### 自动安装（推荐）

使用官方启动器时，请下载最新版安装包并按启动器提示完成安装：

- [下载 WindRealm 官方启动器安装包](downloads/WindRealm-official-launcher-installer-windows-v2.0.1.zip)
- 启动器内选择 **WindRealm** 实例后启动游戏。

![在官方启动器中选择 WindRealm](tutorial/official-launcher-select-windrealm.png)

### 使用 PCL2 / Modrinth

如果你习惯第三方启动器，可导入 `.mrpack` 整合包：

1. 下载 [WindRealm Modrinth 整合包](downloads/WindRealm-26.2.mrpack)。
2. 在 PCL2 或支持 Modrinth 格式的启动器中导入该文件。
3. 按启动器提示下载依赖并启动对应实例。

PCL2 可从 [PCL2 官网](https://pcl2.aoe.top/) 获取。有关 `.mrpack` 的格式说明请参考 [Modrinth 文档](https://docs.modrinth.com/docs/modpacks/format_definition/)。

### 手动添加服务器

若你已使用兼容的客户端，也可以在多人游戏中手动添加：

1. 打开“多人游戏”→“添加服务器”。
2. 服务器名称可任意填写。
3. 服务器地址填写：`windking.fans`。
4. 保存后进入服务器。

![多人游戏服务器列表](tutorial/multiplayer-server-list.png)

### 可选：语音与模组兼容

建议使用整合包，以自动安装 Fabric、Fabric API 和 Simple Voice Chat 等依赖。手动配置时请确认客户端版本与服务器版本匹配，并参考：

- [Fabric 安装文档](https://docs.fabricmc.net/players/installing-fabric/)
- [Fabric API](https://modrinth.com/mod/fabric-api)
- [Simple Voice Chat](https://modrinth.com/plugin/simple-voice-chat)

遇到旧版本协议或模组兼容问题时，先确认游戏版本和加载器版本；不要随意混用不同版本的模组文件。

## 登录服务器 {#login}

首次进入服务器时，请根据客户端提示完成 AuthMeReloaded 登录：

1. 打开图形登录界面并输入注册时设置的密码。
2. 若旧客户端没有显示图形界面，在聊天栏输入：`/login 你的密码`。
3. 登录成功后再开始游戏；重新进入服务器通常仍需进行登录验证。

![AuthMe 登录界面](authme-login-screen.png)

如果忘记密码，请通过下方支持邮箱联系管理员，并准备你的游戏名与 Bilibili UID。请不要在公开频道发送密码。

## 常见问题 {#troubleshooting}

### 提示 UID 或资格不符合

确认填写的是 Bilibili **数字 UID**，并确认舰长资格已经生效。资格信息有同步延迟时，请稍后再试或联系管理员。

### 注册成功但进服无法登录

检查游戏名是否与注册时一致，并确认输入的是服务器密码而非其他平台密码。旧客户端可使用 `/login 你的密码`。

### 无法连接或服务器显示离线

先查看页面顶部的状态卡片与 [服务器状态页](https://status.windking.fans/)。服务器可能处于维护、部分故障或网络波动状态。

### 游戏版本不兼容

优先重新导入最新整合包。手动客户端请检查 Minecraft、Fabric 和所有模组的版本是否一致。

### 仍然需要帮助

请将游戏名、Bilibili UID、报错截图和发生时间发送到 [f@fan1k.cn](mailto:f@fan1k.cn)。不要附带密码、令牌或其他敏感信息。
