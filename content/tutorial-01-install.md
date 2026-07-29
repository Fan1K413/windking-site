---
id: install
navLabel: 安装游戏
order: 20
title: 安装游戏与整合包
---

建议优先使用官方启动器或导入 WindRealm 整合包，它们会自动安装所需版本和依赖。

## 官方启动器（推荐）

1. 下载 [WindRealm 官方启动器安装包](downloads/WindRealm-official-launcher-installer-windows-v2.0.1.zip)。
2. 安装并启动启动器。
3. 选择 **WindRealm** 实例并启动游戏。

![在官方启动器中选择 WindRealm](tutorial/official-launcher-select-windrealm.png)

## PCL2 / Modrinth 整合包

1. 下载 [WindRealm Modrinth 整合包](downloads/WindRealm-26.2.mrpack)。
2. 在 PCL2 或支持 Modrinth 格式的启动器中导入它。
3. 等待启动器下载依赖后启动实例。

可参考 [PCL2](https://pcl2.aoe.top/) 和 [Modrinth 整合包格式文档](https://docs.modrinth.com/docs/modpacks/format_definition/)。

## 手动添加服务器

已使用兼容客户端时，也可以在“多人游戏 → 添加服务器”中填写：

```text
windking.fans
```

![多人游戏服务器列表](tutorial/multiplayer-server-list.png)

## 语音和版本兼容

请确保 Minecraft、Fabric 和模组版本一致。整合包会自动包含常用依赖；手动配置可参考 [Fabric 安装文档](https://docs.fabricmc.net/players/installing-fabric/)、[Fabric API](https://modrinth.com/mod/fabric-api) 和 [Simple Voice Chat](https://modrinth.com/plugin/simple-voice-chat)。
