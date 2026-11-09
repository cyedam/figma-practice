import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router'
import BottomActions from '../components/layout/BottomActions'
import DesktopHeader from '../components/layout/DesktopHeader'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import LocationTabs from '../components/layout/LocationTabs'
import MobileMenu from '../components/menu/MobileMenu'
import Tab from '../components/menu/Tab'
import { MOBILE_MENUS } from '../components/menu/menuData'
import Modal from '../components/modal/Modal'
import useIsMobile from '../hooks/useIsMobile'
import './ScreenLayout.css'

const LOCATION_TABS = [
  { value: '/programs', label: '온라인접수' },
  { value: '/lookup', label: '접수내역확인' },
]

// 데스크탑 상위 메뉴 경로 (Figma: 상위메뉴)
const LOCATION_CRUMBS = ['열린공간', '통합 온라인접수']

/**
 * 화면 공통 틀: 헤더, 위치 탭, 내용, 맨 아래 버튼, 푸터, 전체 메뉴
 * backTo: 이전 버튼을 눌렀을 때 갈 주소. 없으면 이전 버튼을 숨긴다.
 * activeTab: 위치 탭에서 선택된 주소. 없으면 위치 탭을 숨긴다.
 * title: 모바일에서 위치 탭 대신 보여 줄 제목.
 *   activeTab도 함께 주면 태블릿부터는 위치 탭을 보여 주고 제목은 숨긴다. (화면 안에서 제목을 보여 준다.)
 * actions: 맨 아래 버튼
 * flush: 윗부분과 내용 사이 간격을 없앤다. Figma에서 간격이 없는 화면에 쓴다.
 * onLeave: 주면 이전·뒤로가기 버튼과 로고가 바로 이동하지 않고, 갈 주소를 받아 이 함수를 실행한다.
 *   작성 중인 화면에서 작성 중단 모달을 먼저 띄울 때 쓴다.
 *
 * 화면 폭별 헤더
 *   모바일·태블릿: Header와 오른쪽에서 열리는 전체메뉴 패널
 *   데스크탑(1440px부터): DesktopHeader와 아래로 펼쳐지는 전체메뉴
 */
function ScreenLayout({ backTo, activeTab, title, actions, flush = false, onLeave, children }) {
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const [menuOpen, setMenuOpen] = useState(false)
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false)
  const closeDesktopMenu = useCallback(() => setDesktopMenuOpen(false), [])
  // onLeave가 있으면 바로 이동하지 않고 화면에 맡긴다.
  const leaveTo = (path) => (onLeave ? onLeave(path) : navigate(path))
  const handleBack = backTo ? () => leaveTo(backTo) : undefined
  const handleLogo = () => leaveTo('/')

  function handleMenuItem(item) {
    // 이동할 화면은 menuData.js 항목의 path에 적혀 있다.
    const path = item.path
    if (!path) return
    setMenuOpen(false)
    setDesktopMenuOpen(false)
    navigate(path)
  }

  const hasTitleAndTabs = Boolean(title && activeTab)

  return (
    <div className={`screen${flush ? ' screen--flush' : ''}`}>
      <div className="screen__top">
        <Header
          onBack={handleBack}
          onLogoClick={handleLogo}
          onMenuClick={() => setMenuOpen(true)}
        />
        <DesktopHeader
          menuOpen={desktopMenuOpen}
          onMenuToggle={() => setDesktopMenuOpen(!desktopMenuOpen)}
          onMenuClose={closeDesktopMenu}
          onLogoClick={handleLogo}
          onMenuItem={handleMenuItem}
        />
        {activeTab && (
          <div className={hasTitleAndTabs ? 'screen__wide-only' : undefined}>
            <LocationTabs
              title="통합온라인접수"
              crumbs={LOCATION_CRUMBS}
              onBack={handleBack}
              tabs={LOCATION_TABS}
              active={activeTab}
              onChange={(path) => navigate(path)}
            />
          </div>
        )}
        {title && (
          <Tab
            as="h2"
            variant="location-2depth"
            className={hasTitleAndTabs ? 'screen__mobile-only' : undefined}
          >
            {title}
          </Tab>
        )}
      </div>

      <main className="screen__content">{children}</main>

      {actions && <BottomActions>{actions}</BottomActions>}

      <Footer />

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
        {/* 검색은 아직 동작이 없어 회색 비활성으로 둔다. (사용자 요청) */}
        <Tab variant="mobile-search" icon="search" disabled>
          검색
        </Tab>
        {MOBILE_MENUS.map((menu) => (
          <MobileMenu
            key={menu.title}
            {...menu}
            // 모바일 Figma는 열린공간을 펼쳐 두고, 태블릿 Figma는 모두 접어 둔다.
            defaultOpen={isMobile && menu.title === '열린공간'}
            onItemClick={handleMenuItem}
          />
        ))}
      </Modal>
    </div>
  )
}

export default ScreenLayout
