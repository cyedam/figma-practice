import { useState } from 'react'
import { useNavigate } from 'react-router'
import Button from '../components/button/Button'
import ActionBox from '../components/card/ActionBox'
import Input from '../components/input/Input'
import Tab from '../components/menu/Tab'
import PhoneModal from './PhoneModal'
import ScreenLayout from './ScreenLayout'
import './AuthScreen.css'

/**
 * 비밀번호 찾기 - 문자인증 (Figma: 모바일-비밀번호-문자인증, 모바일-비밀번호-문자인증-1)
 * 1단계: 이름과 연락처를 넣고 '인증번호'를 누른다.
 * 2단계: 인증번호 칸과 안내 박스가 나타나고, 버튼 이름이 '재발송'으로 바뀐다.
 * 실제 문자 발송과 인증번호 확인은 아직 연결되어 있지 않다.
 */
function SmsAuthScreen() {
  const navigate = useNavigate()
  const [sent, setSent] = useState(false)
  // 입력값은 Figma 완성본의 예시 값이다. 실제 서비스 전에 빈 값으로 바꾼다.
  const [name, setName] = useState('홍길동')
  const [phone, setPhone] = useState('01012341234')
  const [code, setCode] = useState('123456')
  const [phoneModalOpen, setPhoneModalOpen] = useState(false)

  return (
    <ScreenLayout
      flush
      backTo="/lookup"
      activeTab="/lookup"
      actions={
        sent && (
          <Button variant="main-l" onClick={() => navigate('/lookup/reset')}>
            비밀번호 재설정
          </Button>
        )
      }
    >
      <div className="auth">
        <Tab as="h2" variant="location-2depth" className="screen__summary-title">
          문자인증
        </Tab>
        <div className="auth__fields">
          <Input label="이름" value={name} onChange={(event) => setName(event.target.value)} />
          <div className="auth__row">
            <Input
              label="연락처"
              inputMode="numeric"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
            <Button variant="main-s" onClick={() => setSent(true)}>
              {sent ? '재발송' : '인증번호'}
            </Button>
          </div>
          {sent && (
            <Input
              label="인증번호"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={code}
              onChange={(event) => setCode(event.target.value)}
            />
          )}
        </div>
        {sent && (
          <ActionBox
            title="문자가 오지 않나요?"
            actions={[
              { label: '전화문의', icon: 'phone', onClick: () => setPhoneModalOpen(true) },
            ]}
          />
        )}
      </div>

      <PhoneModal open={phoneModalOpen} onClose={() => setPhoneModalOpen(false)} />
    </ScreenLayout>
  )
}

export default SmsAuthScreen
