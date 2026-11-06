import { useState } from 'react'
import { useNavigate } from 'react-router'
import BottomActions from '../components/layout/BottomActions'
import Header from '../components/layout/Header'
import LocationTabs from '../components/layout/LocationTabs'
import MobileMenu from '../components/menu/MobileMenu'
import Tab from '../components/menu/Tab'
import { MOBILE_MENUS } from '../components/menu/menuData'
import Modal from '../components/modal/Modal'
import './ScreenLayout.css'

const LOCATION_TABS = [
  { value: '/programs', label: '온라인접수' },
  { value: '/lookup', label: '접수내역확인' },
]

/**
 * 화면 공통 틀: 헤더, 위치 탭, 내용, 맨 아래 버튼, 전체 메뉴
 * backTo: 이전 버튼을 눌렀을 때 갈 주소. 없으면 이전 버튼을 숨긴다.
 * activeTab: 위치 탭에서 선택된 주소. 없으면 위치 탭을 숨긴다.
 * title: 위치 탭 대신 보여 줄 제목
 * actions: 맨 아래 버튼
 * flush: 윗부분과 내용 사이 간격을 없앤다. Figma에서 간격이 없는 화면에 쓴다.
 */
function ScreenLayout({ backTo, activeTab, title, actions, flush = false, children }) {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  function handleMenuItem(item) {
    if (item.label === '통합 온라인접수') {
      setMenuOpen(false)
      navigate('/programs')
    }
  }

  return (
    <div className={`screen${flush ? ' screen--flush' : ''}`}>
      <div className="screen__top">
        <Header
          onBack={backTo ? () => navigate(backTo) : undefined}
          onLogoClick={() => navigate('/')}
          onMenuClick={() => setMenuOpen(true)}
        />
        {activeTab && (
          <LocationTabs
            title="통합온라인접수"
            tabs={LOCATION_TABS}
            active={activeTab}
            onChange={(path) => navigate(path)}
          />
        )}
        {title && (
          <Tab as="h2" variant="location-2depth">
            {title}
          </Tab>
        )}
      </div>

      <main className="screen__content">{children}</main>

      {actions && <BottomActions>{actions}</BottomActions>}

      <Modal
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        sheet
        label="전체 메뉴"
        className="screen__menu"
      >
        <div className="screen__menu-top">
          <button
            type="button"
            className="screen__menu-close"
            aria-label="메뉴 닫기"
            onClick={() => setMenuOpen(false)}
          >
            <span className="screen__menu-close-icon" aria-hidden="true" />
          </button>
        </div>
        <Tab variant="mobile-search" icon="search">
          검색
        </Tab>
        {MOBILE_MENUS.map((menu) => (
          <MobileMenu
            key={menu.title}
            {...menu}
            defaultOpen={menu.title === '열린공간'}
            onItemClick={handleMenuItem}
          />
        ))}
      </Modal>
    </div>
  )
}

export default ScreenLayout
