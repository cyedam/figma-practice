import { useLocation, useNavigate } from 'react-router'
import Button from '../components/button/Button'
import ListBox from '../components/card/ListBox'
import Tab from '../components/menu/Tab'
import { SAMPLE_RESERVATION_NUMBER, SAMPLE_RESERVATION_ROWS } from './programData'
import ScreenLayout from './ScreenLayout'
import './ApplyCompleteScreen.css'

// 신청 완료 (Figma: 모바일-접수완료)
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
        <div className="apply-complete__message">
          <span className="apply-complete__icon" aria-hidden="true" />
          <h1 className="apply-complete__title">
            신청하신 사항이
            <br />
            정상적으로 등록되었습니다.
          </h1>
        </div>
        <div className="screen__summary">
          <Tab as="h2" variant="location-2depth" className="screen__summary-title">
            예약번호 {SAMPLE_RESERVATION_NUMBER}
          </Tab>
          <ListBox rows={rows} />
        </div>
        <p className="apply-complete__note">
          신청 내역은 알림톡으로 발송됩니다. 수정사항 발생 시 상단의{' '}
          <span className="apply-complete__note-point">접수내역확인</span>에서 변경하실 수 있습니다.
        </p>
      </div>
    </ScreenLayout>
  )
}

export default ApplyCompleteScreen
