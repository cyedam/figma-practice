import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import Button from '../components/button/Button'
import ListBox from '../components/card/ListBox'
import Calendar from '../components/calendar/Calendar'
import ProgramCard from '../components/card/ProgramCard'
import Checkbox from '../components/input/Checkbox'
import Dropdown from '../components/input/Dropdown'
import Input from '../components/input/Input'
import Tab from '../components/menu/Tab'
import ConfirmModal from '../components/modal/ConfirmModal'
import {
  MOONLIGHT_IMAGE,
  NOTICE_CAUTION,
  NOTICE_CAUTION_BOLD,
  NOTICE_INFO,
  NOTICE_PRIVACY,
  NOTICE_PRIVACY_BOLD,
  SAMPLE_RESERVATION_NUMBER,
  SAMPLE_RESERVATION_ROWS,
} from './programData'
import NoticeText from './NoticeText'
import ScreenLayout from './ScreenLayout'
import { formatSchedule, getDateStatus, MONTH, timeOptions, YEAR } from './scheduleData'
import './ReservationScreen.css'

function findValue(label) {
  return SAMPLE_RESERVATION_ROWS.find((row) => row.label === label)?.value ?? ''
}

// Figma 예시 신청 내역: 10월 16일 18:00, 2명
const INITIAL_RESERVATION = {
  date: { year: YEAR, month: MONTH, day: 16 },
  time: '18:00',
  people: Number(findValue('예약인원')) || 1,
}
// 예약자명·연락처는 접수내역 조회에도 쓰는 값이라 바꿀 수 없다.
const FIXED_ROWS = {
  name: { label: '예약자명', value: findValue('예약자명') },
  phone: { label: '연락처', value: findValue('연락처') },
  fee: { label: '결제금액', value: findValue('결제금액') },
}

// 예약 변경에서는 대기(정원 마감) 날짜로 옮길 수 없게 불가로 보여 준다.
function getChangeDateStatus(date) {
  const status = getDateStatus(date)
  return status === 'waiting' ? 'unavailable' : status
}

/**
 * 신청 내역 (Figma: 모바일-신청내역, 태블릿-신청내역, 데스크탑-신청내역)
 * '예약 변경'을 누르면 예약일자(달력·시간)와 인원을 그 자리에서 고칠 수 있다. (Figma 시안 없음, 사용자 요청)
 * 예약자명·연락처는 고정이다. 실제 서버 저장은 아직 연결되어 있지 않다.
 */
function ReservationScreen() {
  const navigate = useNavigate()
  // Figma처럼 안내 문자 수신 동의는 처음에 체크되어 있다.
  const [smsAgree, setSmsAgree] = useState(true)
  const [modal, setModal] = useState('')
  const [reservation, setReservation] = useState(INITIAL_RESERVATION)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(INITIAL_RESERVATION)
  const editRef = useRef(null)

  // 예약 변경을 열면 편집 영역으로 초점을 옮겨 화면 낭독기가 바로 읽게 한다.
  useEffect(() => {
    if (editing) editRef.current?.focus()
  }, [editing])

  const rows = [
    { label: '예약일자', value: formatSchedule(reservation.date, reservation.time) },
    FIXED_ROWS.name,
    FIXED_ROWS.phone,
    { label: '예약인원', value: String(reservation.people) },
    FIXED_ROWS.fee,
  ]

  function startEdit() {
    setDraft(reservation)
    setEditing(true)
  }

  function handleSave() {
    setReservation(draft)
    setEditing(false)
    setModal('changed')
  }

  return (
    <ScreenLayout
      backTo="/lookup"
      activeTab="/lookup"
      actions={
        <>
          <Button variant="special-urgent" onClick={() => setModal('cancel')}>
            예약 취소
          </Button>
          <Button variant="main-l" onClick={() => navigate('/')}>
            홈으로
          </Button>
        </>
      }
    >
      <div className="reservation">
        <div className={`reservation__info${editing ? ' reservation__info--editing' : ''}`}>
          <ProgramCard
            variant="image"
            imageSrc={MOONLIGHT_IMAGE}
            imageAlt="화성행궁 야간개장"
            showBadges={false}
          />
          <div className="screen__summary">
            <Tab as="h2" variant="location-2depth" className="screen__summary-title">
              예약번호 {SAMPLE_RESERVATION_NUMBER}
            </Tab>
            {editing ? (
              <>
                <div
                  className="reservation__edit"
                  ref={editRef}
                  tabIndex={-1}
                  role="group"
                  aria-label="예약 변경"
                >
                  <Calendar
                    defaultYear={draft.date.year}
                    defaultMonth={draft.date.month}
                    selectedDate={draft.date}
                    onSelectDate={(date) => setDraft({ ...draft, date, time: '18:00' })}
                    getDateStatus={getChangeDateStatus}
                  />
                  <Dropdown
                    label="예약 시간"
                    options={timeOptions(draft.date.month, draft.date.day, false)}
                    value={draft.time}
                    onChange={(time) => setDraft({ ...draft, time })}
                  />
                  <Input
                    variant="counter"
                    label="예약인원"
                    value={draft.people}
                    onChange={(people) => setDraft({ ...draft, people })}
                  />
                </div>
                {/* 고칠 수 없는 항목은 그대로 보여 준다. */}
                <ListBox rows={[FIXED_ROWS.name, FIXED_ROWS.phone, FIXED_ROWS.fee]} />
                <div className="reservation__change">
                  <Button variant="sub-s" onClick={() => setEditing(false)}>
                    취소
                  </Button>
                  <Button variant="main-s" onClick={handleSave}>
                    저장
                  </Button>
                </div>
              </>
            ) : (
              <>
                <ListBox rows={rows} />
                <div className="reservation__change">
                  <Button variant="sub-s" onClick={startEdit}>
                    예약 변경
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="reservation__notices">
          <Input variant="box" label="알림사항" value={NOTICE_INFO} />
          <Input
            variant="box"
            label="주의사항"
            value={<NoticeText text={NOTICE_CAUTION} bold={NOTICE_CAUTION_BOLD} />}
          />
          <Input
            variant="box"
            label="정보수집동의"
            value={<NoticeText text={NOTICE_PRIVACY} bold={NOTICE_PRIVACY_BOLD} />}
          />
          <div>
            <Checkbox checked={smsAgree} onChange={setSmsAgree}>
              안내 문자 수신 동의합니다.
            </Checkbox>
          </div>
        </div>
      </div>

      <ConfirmModal
        open={modal === 'cancel'}
        onClose={() => setModal('')}
        title="정말 신청을 취소하시겠습니까?"
        description="'예'를 누르면 신청이 취소되고, '아니오'를 누르면 접수내역으로 돌아갑니다."
        secondaryLabel="예"
        onSecondary={() => setModal('canceled')}
        primaryLabel="아니오"
        onPrimary={() => setModal('')}
        safeChoice="primary"
      />
      <ConfirmModal
        open={modal === 'changed'}
        onClose={() => setModal('')}
        title="예약 정보가 변경되었습니다."
        primaryLabel="확인"
        onPrimary={() => setModal('')}
      />
      <ConfirmModal
        open={modal === 'canceled'}
        onClose={() => navigate('/')}
        title="신청이 취소되었습니다."
        primaryLabel="홈으로"
        onPrimary={() => navigate('/')}
      />
    </ScreenLayout>
  )
}

export default ReservationScreen
