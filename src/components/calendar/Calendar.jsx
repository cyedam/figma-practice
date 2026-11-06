import { useState } from 'react'
import Badge from '../card/Badge'
import CalendarCell from './CalendarCell'
import './Calendar.css'

const WEEKDAYS = [
  { label: '일', status: 'sunday' },
  { label: '월', status: 'default' },
  { label: '화', status: 'default' },
  { label: '수', status: 'default' },
  { label: '목', status: 'default' },
  { label: '금', status: 'default' },
  { label: '토', status: 'saturday' },
]

const STATUS_NAMES = { unavailable: '예약불가', waiting: '대기예약' }

/**
 * 달력 (Figma: 달력)
 * defaultYear, defaultMonth: 처음 보여 줄 연도와 월
 * selectedDate: 선택된 날짜. { year, month, day }
 * onSelectDate: 날짜를 누르면 { year, month, day }를 받아 실행한다.
 * getDateStatus: { year, month, day }를 받아 날짜 상태를 돌려주는 함수.
 *   'default', 'unavailable'(불가), 'waiting'(대기) 중 하나이며 없으면 모두 default다.
 */
function Calendar({ defaultYear, defaultMonth, selectedDate, onSelectDate, getDateStatus }) {
  const [view, setView] = useState({ year: defaultYear, month: defaultMonth })
  const { year, month } = view

  // Date의 월은 0부터 시작한다. 일을 0으로 주면 전달의 마지막 날이 된다.
  const blankCount = new Date(year, month - 1, 1).getDay()
  const dayCount = new Date(year, month, 0).getDate()

  function moveMonth(amount) {
    const next = new Date(year, month - 1 + amount, 1)
    setView({ year: next.getFullYear(), month: next.getMonth() + 1 })
  }

  function isSelected(day) {
    return selectedDate?.year === year && selectedDate?.month === month && selectedDate?.day === day
  }

  return (
    <div className="calendar">
      <div className="calendar__header">
        <div className="calendar__nav">
          <button
            type="button"
            className="calendar__arrow"
            aria-label="이전 달"
            onClick={() => moveMonth(-1)}
          >
            <span className="calendar__arrow-icon calendar__arrow-icon--prev" aria-hidden="true" />
          </button>
          <CalendarCell kind="title" aria-live="polite">
            <span>{year}년</span>
            <span>{month}월</span>
          </CalendarCell>
          <button
            type="button"
            className="calendar__arrow"
            aria-label="다음 달"
            onClick={() => moveMonth(1)}
          >
            <span className="calendar__arrow-icon calendar__arrow-icon--next" aria-hidden="true" />
          </button>
        </div>
        <div className="calendar__legend">
          <Badge type="selected" />
          <Badge type="waiting" />
          <Badge type="unavailable" />
        </div>
      </div>
      <div className="calendar__grid">
        {WEEKDAYS.map((weekday) => (
          <CalendarCell key={weekday.label} kind="weekday" status={weekday.status}>
            {weekday.label}
          </CalendarCell>
        ))}
        {Array.from({ length: blankCount }, (_, index) => (
          <span key={`blank-${index}`} />
        ))}
        {Array.from({ length: dayCount }, (_, index) => {
          const day = index + 1
          const status = getDateStatus?.({ year, month, day }) ?? 'default'
          const selected = isSelected(day)
          const stateNames = [STATUS_NAMES[status], selected && '선택됨'].filter(Boolean)
          return (
            <CalendarCell
              key={day}
              kind="date"
              status={status}
              selected={selected}
              aria-label={[`${month}월 ${day}일`, ...stateNames].join(', ')}
              onClick={() => onSelectDate?.({ year, month, day })}
            >
              {day}
            </CalendarCell>
          )
        })}
      </div>
    </div>
  )
}

export default Calendar
