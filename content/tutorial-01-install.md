---
id: install
navLabel: 安装
order: 20
title: 安装游戏
layout: install
---

推荐使用自动安装；如果已经有自己的游戏环境，也可以切换到手动安装。两种方式任选其一，不要混用。

## 官方启动器（推荐）

自动安装最新正式版 Minecraft、Fabric 和语音模组，创建独立游戏配置并预置服务器。

1. **下载安装包**：点击“下载官方启动器安装包”，把 ZIP 保存到桌面或下载文件夹；不需要放进游戏目录。
2. **完全退出启动器**：关闭游戏和官方启动器。如果启动器仍在任务栏右下角运行，也要右键退出，避免它覆盖新建的启动配置。
3. **解压并运行**：解压 ZIP，打开解压后的文件夹，双击 `安装WindRealm.bat`，等待窗口显示“安装成功”。不要直接在压缩包预览窗口里运行文件。
4. **选择新配置启动**：重新打开官方启动器，在 Java 版的版本列表中选择“风殿下舰长服 Fabric”，然后点击“开始游戏”。
5. **进入服务器**：打开“多人游戏”，双击“风殿下舰长服”。首次进入后按 `V` 选择麦克风和扬声器，完成语音测试。

![Minecraft 官方启动器中已选择风殿下舰长服 Fabric 配置](tutorial/official-launcher-select-windrealm.png)

安装完成后，启动器左下角会出现“风殿下舰长服 Fabric”。确认选中它，再点击“开始游戏”。

![Minecraft 多人游戏列表中的风殿下舰长服](tutorial/multiplayer-server-list.png)

安装器已经预置“风殿下舰长服”。进入多人游戏后，直接双击这条服务器即可。

## 第三方启动器（PCL2）

下载整合包后直接拖到 PCL2 窗口，即可安装 Minecraft 26.2 和所需组件；安装后的默认名称为 WindRealm-26.2。

1. **准备 PCL2**：如果还没有启动器，前往 [PCL2 官方下载页](https://pcl2.aoe.top/) 下载正式版，解压后打开 PCL2 并登录自己的 Minecraft 账号。
2. **下载整合包**：下载 [WindRealm-26.2.mrpack](downloads/WindRealm-26.2.mrpack)，将文件保存到桌面或下载文件夹。保持 `.mrpack` 后缀不变。
3. **拖进 PCL2 窗口**：用鼠标按住下载的 `.mrpack` 文件，把它直接拖到已经打开的 PCL2 窗口中，然后松开鼠标。PCL2 会直接开始安装，不会先弹出确认窗口。
4. **等待下载完成**：PCL2 会自动安装 Minecraft 26.2 和整合包所需组件；不需要再手动安装加载器或模组。
5. **启动并进入服务器**：选择刚安装的版本并启动。多人游戏列表已经预置“风殿下舰长服”；如果没有显示，手动添加 `windking.fans`。进服后按 `V` 完成语音设置。

[下载第三方启动器 ↗](https://pcl2.aoe.top/)　[了解 Modrinth 整合包 ↗](https://support.modrinth.com/en/articles/8802351-modrinth-modpack-format-mrpack)

## 手动安装

已经有 Minecraft Java 版时，可以直接手动添加服务器进入。游戏内语音是可选功能，需要时再展开后面的教程安装。

Java 版 1.7 及以上均可进入。服务器使用 ViaVersion 与 ViaBackwards 处理跨版本连接；客户端版本低于服务器版本时，该客户端本身不存在的物品、方块和机制可能无法完整显示或使用。

1. **准备 Java 版游戏**：在启动器中安装一个 Minecraft Java 版游戏。推荐使用当前正式版；Java 版 1.7 及以上也能进入。
2. **启动一次游戏**：选择刚安装的版本并启动。进入游戏主菜单后，点击“多人游戏”；首次出现在线游戏警告时，阅读提示后点击“继续”。
3. **打开添加服务器**：在多人游戏页面点击“添加服务器”。如果窗口较窄，按钮可能显示在页面底部。
4. **填写服务器信息**：“服务器名称”填写“风殿下舰长服”，“服务器地址”填写 `windking.fans`，然后点击“完成”保存。
5. **进入服务器**：等待服务器显示在线后，双击“风殿下舰长服”，或选中后点击“加入服务器”。进入后继续完成 STEP 03 的登录。

## 可选：手动安装游戏内语音

不安装语音模组也能正常进入服务器。需要使用游戏内语音时，再按下面步骤操作。

1. **选择游戏版本**：先确定准备使用的 Minecraft 版本。建议选择当前正式版，以便下载匹配的模组。
2. **安装 Fabric Loader**：按照 [Fabric 官方 Windows 教程](https://docs.fabricmc.net/zh_cn/players/installing-fabric/windows) 下载并运行安装器，选择与游戏相同的版本，保持“创建配置文件”勾选后安装。
3. **先启动一次 Fabric**：在启动器中选择刚创建的 Fabric 配置，启动到游戏主菜单后退出，让游戏建立需要的目录。
4. **下载 Fabric API**：打开 [Fabric API 下载页](https://modrinth.com/mod/fabric-api/versions?l=fabric)，筛选你的 Minecraft 版本与 Fabric，下载最新正式版 `.jar`。
5. **下载语音模组**：打开 [Simple Voice Chat 下载页](https://modrinth.com/plugin/simple-voice-chat/versions?l=fabric)，筛选相同的 Minecraft 版本与 Fabric，下载最新正式版 `.jar`。
6. **放入 mods 文件夹**：输入 `%appdata%\.minecraft` 并回车，打开 `mods` 文件夹；没有就新建一个。将两个 `.jar` 文件直接放进去，不要解压。
7. **启动并测试语音**：再次选择 Fabric 配置启动，进入服务器后按 `V`，选择麦克风和扬声器；能打开语音设置即表示安装完成。
