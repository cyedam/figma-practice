import Tab from '../menu/Tab'
import './LocationTabs.css'

/**
 * 현재 위치 제목과 하위 탭 (Figma: 로케이션)
 * title: 제목
 * tabs: 탭 목록. [{ value, label }]
 * active: 선택된 탭의 value
 * onChange: 선택되지 않은 탭을 누르면 그 value를 받아 실행한다.
 */
function LocationTabs({ title, tabs, active, onChange }) {
  return (
    <div className="location-tabs">
      <Tab as="h2" variant="location-2depth">
        {title}
      </Tab>
      <div className="location-tabs__row">
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            variant="location-3depth"
            active={tab.value === active}
            onClick={() => onChange(tab.value)}
          >
            {tab.label}
          </Tab>
        ))}
      </div>
    </div>
  )
}

export default LocationTabs
