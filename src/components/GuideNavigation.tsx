const items = [
  ['register', '注册账号'],
  ['install', '安装游戏'],
  ['login', '登录服务器'],
  ['troubleshooting', '常见问题'],
] as const

export function GuideNavigation() {
  return (
    <nav aria-label="指南目录" className="guide-navigation">
      {items.map(([id, label], index) => <a href={`#${id}`} key={id}><span>0{index + 1}</span>{label}</a>)}
    </nav>
  )
}
