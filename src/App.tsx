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
    <main id="top">
      <header className="site-header">
        <div className="brand">
          <a aria-label="前往风殿下 Rich 的 B 站主页" className="brand-avatar" href={siteConfig.bilibiliUrl} rel="noreferrer" target="_blank">
            <img alt="" src={publicPath('feng-avatar.jpg')} />
          </a>
          <div className="brand-copy">
            <div className="brand-title-row">
              <a className="brand-title" href="#top">风殿下舰长服</a>
              <ServerStatus />
            </div>
            <small>注册与登录指南</small>
          </div>
        </div>
        <nav aria-label="站点导航">
          <a className="mobile-hidden-nav" href={siteConfig.bilibiliUrl} rel="noreferrer" target="_blank">主播主页 <span className="external-arrow">↗</span></a>
          <a className="mobile-hidden-nav" href={siteConfig.statusPageUrl} rel="noreferrer" target="_blank">服务器状态 <span className="external-arrow">↗</span></a>
          <button className="text-action" type="button" onClick={() => setRegistrationOpen(true)}>舰长注册</button>
          <a href={`mailto:${siteConfig.supportEmail}`}>技术支持</a>
        </nav>
      </header>

      <section className="tutorial-hero">
        <div className="hero-copy">
          <p className="eyebrow">JAVA EDITION · CAPTAIN ONLY</p>
          <h1>舰长服注册与<br />登录指南</h1>
          <p className="intro">从注册账号、安装游戏，到进入服务器登录，按下面三步操作即可进入。</p>
          <div className="hero-actions">
            <button className="button button-primary" type="button" onClick={() => setRegistrationOpen(true)}>立即注册 →</button>
            <CopyButton value={siteConfig.serverAddress} />
          </div>
        </div>
        <aside aria-label="服务器快速信息" className="quick-card">
          <div className="quick-card-head"><span>服务器地址</span><b>Java 版</b></div>
          <strong>{siteConfig.serverAddress}</strong>
          <CopyButton value={siteConfig.serverAddress} variant="quick" />
          <dl>
            <div><dt>进入资格</dt><dd>风殿下Rich舰长</dd></div>
            <div><dt>版本</dt><dd>Java 版 1.7 及以上</dd></div>
            <div><dt>注册方式</dt><dd>网页注册</dd></div>
          </dl>
        </aside>
      </section>

      <div className="tutorial-layout">
        <GuideNavigation />
        <GuideRenderer />
      </div>

      <section aria-labelledby="streamer-title" className="streamer-footer">
        <div>
          <img alt="" src={publicPath('feng-avatar.jpg')} />
          <span><small>服务器主播</small><strong id="streamer-title">风殿下Rich</strong></span>
        </div>
        <p>正太 / 少年音唱见，喜欢唱歌。</p>
        <a href={siteConfig.bilibiliUrl} rel="noreferrer" target="_blank">前往 B 站主页 ↗</a>
      </section>

      <footer><span>风殿下舰长服 · 注册与登录指南</span><a href="#top">返回顶部 ↑</a></footer>
      <RegistrationModal open={registrationOpen} onClose={() => setRegistrationOpen(false)} />
    </main>
  )
}
