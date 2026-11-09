import './Tab.css'

/**
 * 메뉴 한 칸 (Figma: 탭)
 * variant: Figma '종류' 속성과 대응한다.
 *   location-2depth(로케이션 2depth), location-3depth(로케이션 3depth)
 *   gnb-utility(유틸리티), gnb-main(메인), gnb-sub(하위), gnb-leaf(최하위)
 *   mobile-1depth(모바일 1depth), mobile-2depth(모바일 2depth), mobile-search(모바일 검색)
 * icon: 'plus'(더보기), 'minus'(덜보기), 'search'(검색) 중 하나. 없으면 표시하지 않는다.
 * active: location-3depth의 선택 상태 (Figma: 3depth-active)
 * href: 있으면 링크(a), 없으면 버튼(button)으로 만든다.
 * as: 누를 수 없는 제목으로 쓸 때 태그 이름을 준다. (예: 'h2')
 * disabled: 아직 동작이 없는 항목. 회색 글씨로 보이고 누를 수 없다. (사용자 요청)
 * muted: 동작은 그대로 두고 글씨만 회색으로 보인다. (사용자 요청)
 * 그 밖의 속성(onClick, aria-expanded 등)은 태그에 그대로 전달한다.
 */
function Tab({
  children,
  variant,
  icon,
  active = false,
  href,
  as,
  disabled = false,
  muted = false,
  className = '',
  ...rest
}) {
  const Element = as ?? (href && !disabled ? 'a' : 'button')
  const elementProps = as ? {} : href && !disabled ? { href } : { type: 'button', disabled }
  const staticClass = as ? 'tab--static' : ''
  const disabledClass = disabled ? 'tab--disabled' : muted ? 'tab--muted' : ''
  const classNames =
    `tab tab--${variant} ${active ? 'tab--active' : ''} ${staticClass} ${disabledClass} ${className}`
      .replace(/\s+/g, ' ')
      .trim()

  return (
    <Element
      className={classNames}
      aria-current={active ? 'page' : undefined}
      {...elementProps}
      {...rest}
    >
      {icon === 'search' && <span className="tab__icon tab__icon--search" aria-hidden="true" />}
      <span className="tab__label">{children}</span>
      {(icon === 'plus' || icon === 'minus') && (
        <span className={`tab__icon tab__icon--${icon}`} aria-hidden="true" />
      )}
    </Element>
  )
}

export default Tab
