import { useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import Button from '../components/button/Button'
import Calendar from '../components/calendar/Calendar'
import ProgramCard from '../components/card/ProgramCard'
import Checkbox from '../components/input/Checkbox'
import Dropdown from '../components/input/Dropdown'
import Input from '../components/input/Input'
import PasswordInput from '../components/input/PasswordInput'
import Tab from '../components/menu/Tab'
import ConfirmModal from '../components/modal/ConfirmModal'
import useIsMobile from '../hooks/useIsMobile'
import ApplyCompleteModal from './ApplyCompleteModal'
import NoticeText from './NoticeText'
import {
  MOONLIGHT_IMAGE,
  MOONLIGHT_INFO,
  NOTICE_CAUTION,
  NOTICE_CAUTION_BOLD,
  NOTICE_PRIVACY,
  NOTICE_PRIVACY_BOLD,
} from './programData'
import {
  formatSchedule,
  getDateStatus,
  MONTH,
  OPEN_DAYS,
  timeOptions,
  WAITING_DAYS,
  YEAR,
} from './scheduleData'
import ScreenLayout from './ScreenLayout'
import {
  checkPassword,
  checkPasswordMatch,
  checkPhone,
  checkRequired,
  ERROR_TEXT,
  PHONE_GUIDE,
} from './validation'
import './ApplyScreen.css'

const TITLE = '[화성행궁 야간개장] 문화관광해설사와 함께하는 <달빛, 성곽 투어>'
// 모바일 Figma는 제목을 두 줄로 나눠 보여 준다.
const MOBILE_TITLE = '[화성행궁 야간개장] 문화관광해설사와 \n함께하는 <달빛, 성곽 투어>'

// 칸별 오류 문구를 돌려준다. 오류가 없는 칸은 빈 문자열이다. (규칙: validation.js)
function validate({ name, phone, password, passwordCheck }) {
  return {
    name: checkRequired(name, ERROR_TEXT.nameEmpty),
    phone: checkPhone(phone),
    password: checkPassword(password),
    passwordCheck: checkPasswordMatch(password, passwordCheck),
  }
}

// 오류가 있을 때 초점을 옮기는 순서 (화면 위에서 아래)
const FIELD_ORDER = ['name', 'phone', 'password', 'passwordCheck']

// 신청 (Figma: 모바일-접수탭, 모바일-접수탭-1, 태블릿-접수탭, 데스크탑-접수탭)
function ApplyScreen() {
  const navigate = useNavigate()
  const isMobile = useIsMobile()
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
  // 작성 중단 모달에서 '작성 취소하기'를 누르면 갈 주소. '목록으로'는 프로그램 목록이다.
  const [leavePath, setLeavePath] = useState('/programs')

  // '목록으로', 이전·뒤로가기 버튼, 로고를 누르면 바로 나가지 않고 작성 중단 모달을 먼저 띄운다.
  function confirmLeave(path) {
    setLeavePath(path)
    setModal('cancel')
  }
  // '신청하기'를 한 번 누른 뒤부터 오류를 보여 준다. 값을 고치면 그 자리에서 오류가 사라진다.
  const [showErrors, setShowErrors] = useState(false)
  const nameRef = useRef(null)
  const phoneRef = useRef(null)
  const passwordRef = useRef(null)
  const passwordCheckRef = useRef(null)

  const currentErrors = validate({ name, phone, password, passwordCheck })
  const errors = showErrors ? currentErrors : {}

  function handleSubmit() {
    const firstError = FIELD_ORDER.find((field) => currentErrors[field])
    if (!firstError) {
      setModal('confirm')
      return
    }
    setShowErrors(true)
    // 첫 번째 오류 칸으로 화면을 옮기고 초점을 둔다. (입력값은 그대로 둔다.)
    const refs = { name: nameRef, phone: phoneRef, password: passwordRef, passwordCheck: passwordCheckRef }
    const input = refs[firstError].current
    input?.focus({ preventScroll: true })
    input?.scrollIntoView({ block: 'center' })
  }

  const isWaiting = getDateStatus(date) === 'waiting'
  const rows = [
    { label: '예약일자', value: formatSchedule(date, time) },
    { label: '예약자명', value: name },
    { label: '연락처', value: phone },
    { label: '예약인원', value: String(people) },
    { label: '결제금액', value: '무료' },
  ]

  return (
    <ScreenLayout
      backTo="/programs"
      onLeave={confirmLeave}
      activeTab="/programs"
      title={MOBILE_TITLE}
      actions={
        <>
          <Button variant="sub-l" onClick={() => confirmLeave('/programs')}>
            목록으로
          </Button>
          <Button
            variant={isWaiting ? 'special-l' : 'main-l'}
            onClick={handleSubmit}
          >
            {isWaiting ? '대기하기' : '신청하기'}
          </Button>
        </>
      }
    >
      <div className="apply__main">
        {/* 태블릿부터 보이는 제목. 모바일은 ScreenLayout 윗부분에 제목이 있다. */}
        <Tab as="h2" variant="location-2depth" className="apply__title">
          {TITLE}
        </Tab>
        <div className="apply__schedule">
          <ProgramCard
            variant={isMobile ? 'image' : 'horizontal'}
            imageSrc={MOONLIGHT_IMAGE}
            imageAlt="화성행궁 야간개장"
            info={MOONLIGHT_INFO}
          />
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

        {/* 데스크탑에서 일정과 입력 칸 사이의 세로선 */}
        <span className="apply__divider" aria-hidden="true" />

        <div className="apply__fields">
          <div className="apply__group">
            <h3 className="screen__section-title">신청자 정보</h3>
            <Input
              ref={nameRef}
              label="신청자 성명"
              helperText={errors.name}
              error={Boolean(errors.name)}
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <Input
              ref={phoneRef}
              label="휴대전화"
              helperText={errors.phone || PHONE_GUIDE}
              error={Boolean(errors.phone)}
              inputMode="numeric"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>
          <div className="apply__group">
            <h3 className="screen__section-title">조회용 비밀번호</h3>
            <PasswordInput
              ref={passwordRef}
              error={Boolean(errors.password)}
              // 오류일 때만 오류 문구로 바꾼다. 평소에는 PasswordInput의 규칙 안내가 보인다.
              {...(errors.password && { helperText: errors.password })}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <PasswordInput
              ref={passwordCheckRef}
              confirm
              error={Boolean(errors.passwordCheck)}
              value={passwordCheck}
              onChange={(event) => setPasswordCheck(event.target.value)}
            />
          </div>
          <div className="apply__group apply__group--narrow">
            <h3 className="screen__section-title">신청인원</h3>
            <Input variant="counter" label="인원" value={people} onChange={setPeople} />
          </div>
        </div>
      </div>

      <div className="apply__notices">
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
        onPrimary={() => navigate(leavePath)}
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
        // 모든 폭에서 완료 화면 대신 완료 모달을 띄운다. (사용자 요청, Figma는 데스크탑만 모달)
        onPrimary={() => setModal('complete')}
      />
      <ApplyCompleteModal
        open={modal === 'complete'}
        onClose={() => navigate('/programs')}
        rows={rows}
        onMorePrograms={() => navigate('/programs')}
        onLookup={() => navigate('/lookup')}
      />
    </ScreenLayout>
  )
}

export default ApplyScreen
