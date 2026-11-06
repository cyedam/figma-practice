import './Badge.css'

const BADGE_LABELS = {
  open: '접수중',
  waitlist: '대기신청',
  closed: '접수마감',
  free: '무료',
  paid: '유료',
  selected: '선택',
  unavailable: '예약불가',
  waiting: '대기예약',
}

/**
 * 뱃지 (Figma: 뱃지)
 * type: Figma '상태' 속성과 대응한다.
 *   카드1: open(접수중), waitlist(대기신청), closed(접수마감)
 *   카드2: free(무료), paid(유료)
 *   캘린더: selected(선택), unavailable(예약불가), waiting(대기예약)
 */
function Badge({ type }) {
  return <span className={`badge badge--${type}`}>{BADGE_LABELS[type]}</span>
}

export default Badge
