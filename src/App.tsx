import { useState } from 'react'
import { Accordion } from './components/Accordion'
import { CopyButton } from './components/CopyButton'
import { GuideNavigation } from './components/GuideNavigation'
import { GuideRenderer } from './components/GuideRenderer'
import { RegistrationModal } from './components/RegistrationModal'
import { ServerStatus } from './components/ServerStatus'
import { Tabs } from './components/Tabs'
import { siteConfig } from './lib/api'
import { publicPath } from './lib/paths'

export default function App() {
  const [registrationOpen, setRegistrationOpen] = useState(false)

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top">
          <img alt="风殿下" src={publicPath('feng-avatar.jpg')} />
          <span><strong>风殿下舰长服</strong><small>WINDKING SERVER</small></span>
        </a>
        <div className="header-actions">
          <ServerStatus />
          <a href={siteConfig.bilibiliUrl}>直播间</a>
          <a href={`mailto:${siteConfig.supportEmail}`}>联系支持</a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div>
            <p className="eyebrow">WELCOME TO WINDKING</p>
            <h1>注册与登录<br /><em>指南</em></h1>
            <p className="hero-copy">从注册资格到启动游戏，按步骤完成设置后即可进入风殿下舰长服。</p>
            <div className="hero-actions">
              <button className="button button-primary" type="button" onClick={() => setRegistrationOpen(true)}>立即注册</button>
              <CopyButton value={siteConfig.serverAddress} />
            </div>
          </div>
          <aside className="server-card">
            <p>SERVER ADDRESS</p>
            <strong>{siteConfig.serverAddress}</strong>
            <dl>
              <div><dt>版本</dt><dd>Java 1.7+</dd></div>
              <div><dt>资格</dt><dd>舰长验证</dd></div>
              <div><dt>登录</dt><dd>AuthMe</dd></div>
            </dl>
          </aside>
        </section>

        <GuideNavigation />

        <section className="interactive-guides" aria-label="快速安装提示">
          <Tabs tabs={[
            { label: '自动安装（推荐）', content: <p>下载官方启动器或导入 WindRealm `.mrpack`，让启动器自动处理所需依赖。</p> },
            { label: '手动添加服务器', content: <p>在多人游戏中添加地址 <code>{siteConfig.serverAddress}</code>；请先确认客户端和模组版本兼容。</p> },
          ]} />
          <Accordion title="安装或连接失败怎么办？"><p>优先重新导入最新版整合包；再检查 Minecraft、Fabric 与模组版本。服务器状态异常时请稍后重试。</p></Accordion>
        </section>

        <GuideRenderer />
      </main>

      <footer>
        <span>风殿下舰长服</span>
        <a href={siteConfig.statusPageUrl}>服务器状态</a>
        <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>
      </footer>

      <RegistrationModal open={registrationOpen} onClose={() => setRegistrationOpen(false)} />
    </>
  )
}
