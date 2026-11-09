import { Fragment } from 'react'
import Tab from '../menu/Tab'
import './LocationTabs.css'

/**
 * 현재 위치 제목과 하위 탭 (Figma: 로케이션, 데스크탑은 상위메뉴와 3depth)
 * title: 제목. 모바일·태블릿에서 보인다.
 * crumbs: 데스크탑 상위 메뉴 경로. 예: ['열린공간', '통합 온라인접수']
 * onBack: 데스크탑 상위 메뉴의 뒤로가기 버튼을 누르면 실행한다. 없으면 버튼을 숨긴다.
 * tabs: 탭 목록. [{ value, label }]
 * active: 선택된 탭의 value
 * onChange: 선택되지 않은 탭을 누르면 그 value를 받아 실행한다.
 */
function LocationTabs({ title, crumbs = [], onBack, tabs, active, onChange }) {
  return (
    <div className="location-tabs">
      {crumbs.length > 0 && (
        <nav className="location-tabs__crumbs" aria-label="현재 위치">
          <div className="location-tabs__crumbs-inner">
            {onBack && (
              <button
                type="button"
                className="location-tabs__back"
                aria-label="이전 화면"
                onClick={onBack}
              >
                <span className="location-tabs__icon location-tabs__icon--back" aria-hidden="true" />
              </button>
            )}
            {crumbs.map((crumb, index) => (
              <Fragment key={crumb}>
                {index > 0 && (
                  <span className="location-tabs__icon location-tabs__icon--next" aria-hidden="true" />
                )}
                <span className="location-tabs__crumb">{crumb}</span>
              </Fragment>
            ))}
          </div>
        </nav>
      )}
      <div className="location-tabs__body">
        <Tab as="h2" variant="location-2depth" className="location-tabs__title">
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
    </div>
  )
}

export default LocationTabs
