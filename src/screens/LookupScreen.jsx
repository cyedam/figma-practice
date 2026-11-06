import { useState } from 'react'
import { useNavigate } from 'react-router'
import Button from '../components/button/Button'
import LookupToggle from '../components/button/LookupToggle'
import ActionBox from '../components/card/ActionBox'
import Input from '../components/input/Input'
import PasswordInput from '../components/input/PasswordInput'
import ConfirmModal from '../components/modal/ConfirmModal'
import { SAMPLE_RESERVATION_NUMBER } from './programData'
import ScreenLayout from './ScreenLayout'
import './LookupScreen.css'

// 접수 조회 (Figma: 모바일-접수조회, 모바일-접수조회-1)
function LookupScreen() {
  const navigate = useNavigate()
  const [method, setMethod] = useState('receipt-number')
  // 입력값은 Figma 완성본의 예시 값이다. 실제 서비스 전에 빈 값으로 바꾼다.
  const [receiptNumber, setReceiptNumber] = useState(SAMPLE_RESERVATION_NUMBER)
  const [name, setName] = useState('홍길동')
  const [phone, setPhone] = useState('01012341234')
  const [password, setPassword] = useState('1234')
  const [phoneModalOpen, setPhoneModalOpen] = useState(false)

  return (
    <ScreenLayout
      flush
      backTo="/programs"
      activeTab="/lookup"
      actions={
        <Button variant="main-l" onClick={() => navigate('/lookup/result')}>
          조회하기
        </Button>
      }
    >
      <div className="lookup">
        <div className="lookup__toggle">
          <LookupToggle value={method} onChange={setMethod} />
        </div>
        <div className="lookup__fields">
          {method === 'receipt-number' ? (
            <Input
              label="접수번호"
              value={receiptNumber}
              onChange={(event) => setReceiptNumber(event.target.value)}
            />
          ) : (
            <>
              <Input
                label="신청자 성명"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <Input
                label="휴대전화"
                helperText="‘-’없이 숫자만 입력해주세요. (예 01012341234)"
                inputMode="numeric"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </>
          )}
          <PasswordInput value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        <div>
          <h4 className="lookup__help-title">비밀번호를 잊으셨나요?</h4>
          <ActionBox
            title="본인확인 인증 방법"
            actions={[
              { label: '전화문의', icon: 'phone', onClick: () => setPhoneModalOpen(true) },
              { label: '문자인증', icon: 'mail' },
            ]}
          />
        </div>
      </div>

      <ConfirmModal
        open={phoneModalOpen}
        onClose={() => setPhoneModalOpen(false)}
        title={'재단 대표전화\n031-290-3600'}
        description="운영시간 09:00 - 18:00"
        secondaryLabel="닫기"
        onSecondary={() => setPhoneModalOpen(false)}
        primaryLabel="전화연결"
        onPrimary={() => {
          window.location.href = 'tel:0312903600'
        }}
      />
    </ScreenLayout>
  )
}

export default LookupScreen
