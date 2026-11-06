import { useId, useState } from 'react'
import Tab from './Tab'
import './DesktopMenu.css'

/**
 * 데스크탑 메뉴 한 묶음 (Figma: 데스크탑메뉴)
 * title: 묶음 이름
 * items: 하위 메뉴 목록. [{ label, href }] 형태이며 menuData.js의 DESKTOP_MENUS를 쓴다.
 * defaultOpen: 처음에 펼쳐 둘지 여부
 * onItemClick: 하위 메뉴를 누르면 그 항목을 받아 실행한다.
 */
function DesktopMenu({ title, items, defaultOpen = false, onItemClick }) {
  const [open, setOpen] = useState(defaultOpen)
  const listId = useId()

  return (
    <div className="desktop-menu">
      <Tab
        variant="gnb-sub"
        icon={open ? 'minus' : 'plus'}
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen(!open)}
      >
        {title}
      </Tab>
      {open && (
        <ul className="desktop-menu__list" id={listId}>
          {items.map((item) => (
            <li key={item.label}>
              <Tab variant="gnb-leaf" href={item.href} onClick={() => onItemClick?.(item)}>
                {item.label}
              </Tab>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default DesktopMenu
