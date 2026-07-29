import { useId, useState, type ReactNode } from 'react'

type Tab = { label: string; content: ReactNode }

export function Tabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(0)
  const id = useId()

  return (
    <div className="tabs">
      <div className="tab-list" role="tablist" aria-label="安装方式">
        {tabs.map((tab, index) => (
          <button
            aria-controls={`${id}-panel-${index}`}
            aria-selected={active === index}
            className={active === index ? 'active' : ''}
            id={`${id}-tab-${index}`}
            key={tab.label}
            role="tab"
            tabIndex={active === index ? 0 : -1}
            type="button"
            onClick={() => setActive(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, index) => (
        <div
          aria-labelledby={`${id}-tab-${index}`}
          hidden={active !== index}
          id={`${id}-panel-${index}`}
          key={tab.label}
          role="tabpanel"
        >
          {tab.content}
        </div>
      ))}
    </div>
  )
}
