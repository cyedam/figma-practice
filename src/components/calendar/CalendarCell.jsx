import './CalendarCell.css'

/**
 * 달력 한 칸 (Figma: 달력-요소)
 * kind: title(연월), weekday(요일), date(날짜)
 * status
 *   weekday: default, sunday(공휴일), saturday(토요일)
 *   date: default, unavailable(불가), waiting(대기)
 * selected: 날짜의 선택 여부 (Figma: active). status와 함께 쓸 수 있어,
 *   대기 날짜를 선택하면 대기 배경과 선택 테두리가 함께 보인다.
 * date는 버튼이며 unavailable이면 누를 수 없다. 그 밖의 속성은 태그에 그대로 전달한다.
 */
function CalendarCell({ kind, status = 'default', selected = false, children, ...rest }) {
  const className = `calendar-cell calendar-cell--${kind} calendar-cell--${status}${
    selected ? ' calendar-cell--selected' : ''
  }`

  if (kind === 'date') {
    return (
      <button
        type="button"
        className={className}
        disabled={status === 'unavailable'}
        aria-pressed={selected}
        {...rest}
      >
        {children}
      </button>
    )
  }

  return (
    <span className={className} {...rest}>
      {children}
    </span>
  )
}

export default CalendarCell
