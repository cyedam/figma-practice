import { useEffect, useId, useRef } from 'react'
import logo from '../../assets/images/logo-wide.png'
import DesktopMenu from '../menu/DesktopMenu'
import Tab from '../menu/Tab'
import { DESKTOP_MENUS, GNB_MENUS, hasPath, MOBILE_MENUS } from '../menu/menuData'
import './DesktopHeader.css'

// 전체메뉴 칸: 모바일 메뉴의 묶음과 같고, '기타'는 Figma처럼 뺀다.
const PANEL_COLUMNS = MOBILE_MENUS.filter((menu) => menu.title !== '기타')

function findSubItems(label) {
  return DESKTOP_MENUS.find((menu) => menu.title === label)?.items ?? []
}

/**
 * 데스크탑 헤더 (Figma: 헤더-유틸리티탭, 헤더-메인메뉴, 데스크탑-전체메뉴)
 * 1440px부터 보인다. 그보다 좁으면 Header가 대신 보인다.
 * menuOpen: 전체메뉴가 펼쳐져 있는지 여부
 * onMenuToggle: 메뉴 버튼이나 메인 메뉴를 누르면 실행한다.
 * onMenuClose: Esc를 누르거나 메뉴 바깥을 누르면 실행한다.
 * onLogoClick: 로고를 누르면 실행한다.
 * onMenuItem: 전체메뉴의 하위 메뉴를 누르면 그 항목을 받아 실행한다.
 */
function DesktopHeader({ menuOpen, onMenuToggle, onMenuClose, onLogoClick, onMenuItem }) {
  const panelId = useId()
  const rootRef = useRef(null)

  useEffect(() => {
    if (!menuOpen) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') onMenuClose()
    }
    function handlePointerDown(event) {
      if (!rootRef.current?.contains(event.target)) onMenuClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [menuOpen, onMenuClose])

  return (
    <header className="desktop-header" ref={rootRef}>
      <div className="desktop-header__inner">
        <div className="desktop-header__utility">
          <button
            type="button"
            className="desktop-header__logo"
            aria-label="메인 화면"
            onClick={onLogoClick}
          >
            <img src={logo} alt="" />
          </button>
          <div className="desktop-header__tools">
            <button
              type="button"
              className="desktop-header__tool"
              aria-label="전체 메뉴"
              aria-expanded={menuOpen}
              aria-controls={panelId}
              onClick={onMenuToggle}
            >
              <span className="desktop-header__icon desktop-header__icon--menu" aria-hidden="true" />
            </button>
            {/* 검색·언어 선택은 아직 동작이 없어 회색 비활성으로 둔다. (사용자 요청) */}
            <button type="button" className="desktop-header__tool" aria-label="검색" disabled>
              <span
                className="desktop-header__icon desktop-header__icon--search"
                aria-hidden="true"
              />
            </button>
            <button type="button" className="desktop-header__tool" aria-label="언어 선택" disabled>
              <span
                className="desktop-header__icon desktop-header__icon--language"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        <nav className="desktop-header__gnb" aria-label="주 메뉴">
          {/* 메인 메뉴는 MOBILE_MENUS와 같은 순서다. 이동할 화면이 있는 묶음(열린공간)만 진한 글씨이고, 나머지는 글씨만 회색이다. */}
          {GNB_MENUS.map((label, index) => (
            <Tab
              key={label}
              variant="gnb-main"
              muted={!hasPath(MOBILE_MENUS[index]?.items)}
              aria-expanded={menuOpen}
              aria-controls={panelId}
              onClick={onMenuToggle}
            >
              {label}
            </Tab>
          ))}
        </nav>

        {menuOpen && (
          <div className="desktop-header__panel" id={panelId}>
            {PANEL_COLUMNS.map((column) => (
              <ul className="desktop-header__column" key={column.title} aria-label={column.title}>
                {column.items.map((item) => (
                  <li key={item.label}>
                    {item.hasChildren ? (
                      <DesktopMenu
                        title={item.label}
                        items={findSubItems(item.label)}
                        defaultOpen={item.label === '통합 온라인접수'}
                        onItemClick={onMenuItem}
                      />
                    ) : (
                      <Tab
                        variant="gnb-sub"
                        disabled={!item.path}
                        onClick={() => onMenuItem?.(item)}
                      >
                        {item.label}
                      </Tab>
                    )}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}

export default DesktopHeader
