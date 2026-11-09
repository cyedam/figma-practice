import { useLocation, useNavigate } from 'react-router'
import Button from '../components/button/Button'
import ApplyCompleteSummary from './ApplyCompleteSummary'
import { SAMPLE_RESERVATION_ROWS } from './programData'
import ScreenLayout from './ScreenLayout'
import './ApplyCompleteScreen.css'

// 신청 완료 (Figma: 모바일-접수완료, 태블릿-접수완료)
// 데스크탑 Figma는 이 화면 대신 완료 모달(ApplyCompleteModal)을 쓴다.
function ApplyCompleteScreen() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const rows = state?.rows ?? SAMPLE_RESERVATION_ROWS

  return (
    <ScreenLayout
      flush
      backTo="/programs"
      activeTab="/programs"
      actions={
        <>
          <Button variant="sub-l" onClick={() => navigate('/')}>
            홈으로
          </Button>
          <Button variant="main-l" onClick={() => navigate('/programs')}>
            프로그램 더보기
          </Button>
        </>
      }
    >
      <div className="apply-complete">
        <ApplyCompleteSummary rows={rows} />
        <p className="apply-complete__note">
          신청 내역은 알림톡으로 발송됩니다. 수정사항 발생 시 상단의{' '}
          <span className="apply-complete__note-point">접수내역확인</span>에서 변경하실 수 있습니다.
        </p>
      </div>
    </ScreenLayout>
  )
}

export default ApplyCompleteScreen
