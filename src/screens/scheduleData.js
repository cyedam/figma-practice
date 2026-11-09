// 예약 가능한 날짜와 시간 (Figma의 2026년 10월 예시)
// 신청 화면과 신청 내역의 예약 변경이 함께 쓴다. 실제 예약 현황은 아직 연결되어 있지 않다.

export const YEAR = 2026
export const MONTH = 10
export const OPEN_DAYS = [16, 18, 23, 24, 25, 30, 31]
export const WAITING_DAYS = [17]

// 날짜 상태: 'default'(예약 가능), 'waiting'(대기), 'unavailable'(불가)
export function getDateStatus({ year, month, day }) {
  if (year !== YEAR || month !== MONTH) return 'default'
  if (WAITING_DAYS.includes(day)) return 'waiting'
  return OPEN_DAYS.includes(day) ? 'default' : 'unavailable'
}

export function timeOptions(month, day, isWaiting) {
  return [
    { value: '18:00', label: `${month}월 ${day}일 18:00~19:30 (${isWaiting ? '20/20' : '18/20'})` },
    { value: '20:00', label: `${month}월 ${day}일 20:00~21:30 (${isWaiting ? '20/20' : '19/20'})` },
  ]
}

// 예약일자 글자. 예: '10월 16일 18:00'
export function formatSchedule({ month, day }, time) {
  return `${month}월 ${day}일 ${time}`
}
