import { useState } from 'react'
import { CopyButton } from './components/CopyButton'
import { GuideNavigation } from './components/GuideNavigation'
import { GuideRenderer } from './components/GuideRenderer'
import { RegistrationModal } from './components/RegistrationModal'
import { ServerStatus } from './components/ServerStatus'
import { siteConfig } from './lib/api'
import { publicPath } from './lib/paths'

export default function App() {
  const [registrationOpen, setRegistrationOpen] = useState(false)

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top">
          <img alt="风殿下 Rich" className="brand-avatar" src={publicPath('feng-avatar.jpg')} />
          <span className="brand-copy">
            <span className="brand-title-row"><strong className="brand-title">风殿下舰长服</strong><ServerStatus /></span>
            <small>WINDKING SERVER</small>
          </span>
        </a>
        <nav aria-label="站点导航">
          <a href={siteConfig.bilibiliUrl}>主播主页</a>
          <a href={siteConfig.statusPageUrl}>服务器状态</a>
          <button type="button" onClick={() => setRegistrationOpen(true)}>舰长注册</button>
          <a href={`mailto:${siteConfig.supportEmail}`}>技术支持</a>
        </nav>
      </header>

      <section className="tutorial-hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">JAVA EDITION · CAPTAIN ONLY</p>
          <h1>舰长服注册与<br />登录指南</h1>
          <p className="intro">从注册账号、安装游戏，到进入服务器登录，按下面三步操作即可进入。</p>
          <div className="hero-actions">
            <button className="primary-action" type="button" onClick={() => setRegistrationOpen(true)}>立即注册 →</button>
            <CopyButton value={siteConfig.serverAddress} />
          </div>
        </div>
        <aside className="quick-card">
          <div className="quick-card-head"><span>SERVER ADDRESS</span><b>JAVA</b></div>
          <strong>{siteConfig.serverAddress}</strong>
          <CopyButton value={siteConfig.serverAddress} />
          <dl>
            <div><dt>资格</dt><dd>舰长验证</dd></div>
            <div><dt>版本</dt><dd>Java 1.7+</dd></div>
            <div><dt>注册</dt><dd>网页登记</dd></div>
          </dl>
        </aside>
      </section>

      <div className="tutorial-layout">
        <GuideNavigation />
        <GuideRenderer />
      </div>

      <section className="streamer-footer">
        <img alt="风殿下 Rich" src={publicPath('feng-avatar.jpg')} />
        <div><p>风殿下 Rich</p><span>舰长服由风殿下与社区共同维护。</span></div>
        <a href={siteConfig.bilibiliUrl}>前往 B 站主页 →</a>
      </section>

      <footer>© 风殿下舰长服 · <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a></footer>
      <RegistrationModal open={registrationOpen} onClose={() => setRegistrationOpen(false)} />
    </main>
  )
}
