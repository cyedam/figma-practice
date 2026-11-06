import { useId, useState } from 'react'
import Tab from './Tab'
import './MobileMenu.css'

/**
 * 모바일 메뉴 한 묶음 (Figma: 모바일메뉴)
 * title: 묶음 이름
 * items: 하위 메뉴 목록. [{ label, href, hasChildren }] 형태이며 menuData.js의 MOBILE_MENUS를 쓴다.
 *   hasChildren이 true면 + 아이콘을 보여 준다.
 * defaultOpen: 처음에 펼쳐 둘지 여부
 * onItemClick: 하위 메뉴를 누르면 그 항목을 받아 실행한다.
 */
function MobileMenu({ title, items, defaultOpen = false, onItemClick }) {
  const [open, setOpen] = useState(defaultOpen)
  const listId = useId()

  return (
    <div className="mobile-menu">
      <Tab
        variant="mobile-1depth"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen(!open)}
      >
        {title}
      </Tab>
      {open && (
        <ul id={listId}>
          {items.map((item) => (
            <li key={item.label}>
              <Tab
                variant="mobile-2depth"
                icon={item.hasChildren ? 'plus' : undefined}
                href={item.href}
                onClick={() => onItemClick?.(item)}
              >
                {item.label}
              </Tab>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MobileMenu
