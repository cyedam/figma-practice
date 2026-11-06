import './Button.css'

// Figma에서 아이콘이 있는 버튼 종류
const VARIANTS_WITH_ICON = ['main-l', 'special-l', 'special-urgent', 'line-l']

/**
 * variant: Figma '사이즈' 속성과 1:1로 대응한다.
 *   main-s(메인S), sub-s(보조S), main-l(메인L), sub-l(보조L),
 *   special-urgent-s(특수S), special-l(특수L), special-urgent(특수-urgent), line-l(라인L)
 * icon: true면 + 아이콘을 보여 준다. VARIANTS_WITH_ICON에 있는 버튼에만 적용된다.
 *   'phone', 'mail'을 주면 해당 아이콘이 글자 왼쪽에 나온다. (Figma: 박스의 라인L 버튼)
 * type: 폼 안에서 의도치 않게 제출되지 않도록 기본값은 'button'이다.
 * 그 밖의 속성(onClick, disabled 등)은 button 태그에 그대로 전달한다.
 */
function Button({
  children,
  variant = 'main-l',
  icon = false,
  type = 'button',
  className = '',
  ...rest
}) {
  const showIcon = icon === true && VARIANTS_WITH_ICON.includes(variant)
  const namedIcon = icon === 'phone' || icon === 'mail' ? icon : null
  const classNames = `button button--${variant} ${className}`.trim()

  return (
    <button type={type} className={classNames} {...rest}>
      {namedIcon && (
        <span className={`button__icon button__icon--${namedIcon}`} aria-hidden="true" />
      )}
      <span>{children}</span>
      {showIcon && <span className="button__icon" aria-hidden="true" />}
    </button>
  )
}

export default Button
