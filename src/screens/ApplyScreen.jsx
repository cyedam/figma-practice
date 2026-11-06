import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import Button from '../components/button/Button'
import Calendar from '../components/calendar/Calendar'
import ProgramCard from '../components/card/ProgramCard'
import Checkbox from '../components/input/Checkbox'
import Dropdown from '../components/input/Dropdown'
import Input from '../components/input/Input'
import PasswordInput from '../components/input/PasswordInput'
import ConfirmModal from '../components/modal/ConfirmModal'
import NoticeText from './NoticeText'
import {
  MOONLIGHT_IMAGE,
  NOTICE_CAUTION,
  NOTICE_CAUTION_BOLD,
  NOTICE_PRIVACY,
  NOTICE_PRIVACY_BOLD,
} from './programData'
import ScreenLayout from './ScreenLayout'
import './ApplyScreen.css'

const YEAR = 2026
const MONTH = 10
const OPEN_DAYS = [16, 18, 23, 24, 25, 30, 31]
const WAITING_DAYS = [17]

// Figma의 2026년 10월 예시. 실제 예약 현황은 아직 연결되어 있지 않다.
function getDateStatus({ year, month, day }) {
  if (year !== YEAR || month !== MONTH) return 'default'
  if (WAITING_DAYS.includes(day)) return 'waiting'
  return OPEN_DAYS.includes(day) ? 'default' : 'unavailable'
}

function timeOptions(month, day, isWaiting) {
  return [
    { value: '18:00', label: `${month}월 ${day}일 18:00~19:30 (${isWaiting ? '20/20' : '18/20'})` },
    { value: '20:00', label: `${month}월 ${day}일 20:00~21:30 (${isWaiting ? '20/20' : '19/20'})` },
  ]
}

// 신청 (Figma: 모바일-접수탭, 모바일-접수탭-1)
function ApplyScreen() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [date, setDate] = useState({
    year: YEAR,
    month: MONTH,
    day: searchParams.get('mode') === 'waitlist' ? WAITING_DAYS[0] : OPEN_DAYS[0],
  })
  const [time, setTime] = useState('18:00')
  // 입력값은 Figma 완성본의 예시 값이다. 실제 서비스 전에 빈 값으로 바꾼다.
  const [name, setName] = useState('홍길동')
  const [phone, setPhone] = useState('01012341234')
  const [password, setPassword] = useState('1234')
  const [passwordCheck, setPasswordCheck] = useState('1234')
  const [people, setPeople] = useState(1)
  const [smsAgree, setSmsAgree] = useState(false)
  const [privacyAgree, setPrivacyAgree] = useState(false)
  const [modal, setModal] = useState('')

  const isWaiting = getDateStatus(date) === 'waiting'
  const rows = [
    { label: '예약일자', value: `${date.month}월 ${date.day}일 ${time}` },
    { label: '예약자명', value: name },
    { label: '연락처', value: phone },
    { label: '예약인원', value: String(people) },
    { label: '결제금액', value: '무료' },
  ]

  return (
    <ScreenLayout
      backTo="/programs"
      title={'[화성행궁 야간개장] 문화관광해설사와 \n함께하는 <달빛, 성곽 투어>'}
      actions={
        <>
          <Button variant="sub-l" onClick={() => setModal('cancel')}>
            목록으로
          </Button>
          <Button
            variant={isWaiting ? 'special-l' : 'main-l'}
            onClick={() => setModal('confirm')}
          >
            {isWaiting ? '대기하기' : '신청하기'}
          </Button>
        </>
      }
    >
      <div className="apply__schedule">
        <ProgramCard variant="image" imageSrc={MOONLIGHT_IMAGE} imageAlt="화성행궁 야간개장" />
        <Calendar
          defaultYear={YEAR}
          defaultMonth={MONTH}
          selectedDate={date}
          onSelectDate={(next) => {
            setDate(next)
            setTime('18:00')
          }}
          getDateStatus={getDateStatus}
        />
        <Dropdown
          label="예약 시간"
          options={timeOptions(date.month, date.day, isWaiting)}
          value={time}
          onChange={setTime}
        />
      </div>

      <div className="apply__form">
        <div className="apply__group">
          <h3 className="screen__section-title">신청자 정보</h3>
          <Input label="신청자 성명" value={name} onChange={(event) => setName(event.target.value)} />
          <Input
            label="휴대전화"
            helperText="‘-’없이 숫자만 입력해주세요. (예 01012341234)"
            inputMode="numeric"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>
        <div className="apply__group">
          <h3 className="screen__section-title">조회용 비밀번호</h3>
          <PasswordInput value={password} onChange={(event) => setPassword(event.target.value)} />
          <PasswordInput
            confirm
            value={passwordCheck}
            onChange={(event) => setPasswordCheck(event.target.value)}
          />
        </div>
        <div className="apply__group apply__group--narrow">
          <h3 className="screen__section-title">신청인원</h3>
          <Input variant="counter" label="인원" value={people} onChange={setPeople} />
        </div>
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
        <div className="apply__agree">
          <Checkbox checked={smsAgree} onChange={setSmsAgree}>
            안내 문자 수신 동의합니다.
          </Checkbox>
          <Checkbox checked={privacyAgree} onChange={setPrivacyAgree}>
            안내사항과 주의사항을 숙지했으며, 온라인 신청을 위한 개인정보수집 및 이용에 동의합니다.
          </Checkbox>
        </div>
      </div>

      <ConfirmModal
        open={modal === 'cancel'}
        onClose={() => setModal('')}
        title="작성을 중단하고 나가시겠습니까?"
        description="지금 나가시면 입력하셨던 정보가 모두 삭제됩니다."
        secondaryLabel="이어서 작성하기"
        onSecondary={() => setModal('')}
        primaryLabel="작성 취소하기"
        onPrimary={() => navigate('/programs')}
      />
      <ConfirmModal
        open={modal === 'confirm'}
        onClose={() => setModal('')}
        title="신청 정보를 확인해주세요."
        description="입력하신 내용이 맞는지 다시 한번 확인해주세요."
        rows={rows}
        secondaryLabel="수정하기"
        onSecondary={() => setModal('')}
        primaryLabel={isWaiting ? '대기 신청하기' : '최종 신청하기'}
        primaryVariant={isWaiting ? 'special-l' : 'main-s'}
        onPrimary={() => navigate('/apply/complete', { state: { rows } })}
      />
    </ScreenLayout>
  )
}

export default ApplyScreen
