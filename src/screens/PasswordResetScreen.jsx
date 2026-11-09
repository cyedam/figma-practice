import { useState } from 'react'
import { useNavigate } from 'react-router'
import Button from '../components/button/Button'
import Input from '../components/input/Input'
import PasswordInput from '../components/input/PasswordInput'
import Tab from '../components/menu/Tab'
import ConfirmModal from '../components/modal/ConfirmModal'
import ScreenLayout from './ScreenLayout'
import './AuthScreen.css'

/**
 * 비밀번호 재설정 (Figma: 모바일-비밀번호재설정, 완료 모달)
 * '비밀번호 수정 완료'를 누르면 완료 모달을 띄우고, '조회하기'로 접수 조회 화면에 돌아간다.
 * 실제 비밀번호 변경은 아직 연결되어 있지 않다.
 */
function PasswordResetScreen() {
  const navigate = useNavigate()
  // 입력값은 Figma 완성본의 예시 값이다. 실제 서비스 전에 빈 값으로 바꾼다.
  const [password, setPassword] = useState('1234')
  const [passwordCheck, setPasswordCheck] = useState('1234')
  const [doneOpen, setDoneOpen] = useState(false)

  return (
    <ScreenLayout
      flush
      backTo="/lookup"
      activeTab="/lookup"
      actions={
        <Button variant="main-l" onClick={() => setDoneOpen(true)}>
          비밀번호 수정 완료
        </Button>
      }
    >
      <div className="auth">
        <Tab as="h2" variant="location-2depth" className="screen__summary-title">
          비밀번호 재설정
        </Tab>
        <div className="auth__fields">
          <PasswordInput
            label="새 비밀번호"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {/* Figma처럼 확인 칸에는 안내 문구가 없다. */}
          <Input
            variant="password"
            label="새 비밀번호 확인"
            inputMode="numeric"
            value={passwordCheck}
            onChange={(event) => setPasswordCheck(event.target.value)}
          />
        </div>
      </div>

      <ConfirmModal
        open={doneOpen}
        onClose={() => navigate('/lookup')}
        title="비밀번호 재설정이 완료되었습니다."
        primaryLabel="조회하기"
        onPrimary={() => navigate('/lookup')}
      />
    </ScreenLayout>
  )
}

export default PasswordResetScreen
