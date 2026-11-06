import { useState } from 'react'
import { useNavigate } from 'react-router'
import Button from '../components/button/Button'
import ListBox from '../components/card/ListBox'
import ProgramCard from '../components/card/ProgramCard'
import Checkbox from '../components/input/Checkbox'
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
import './ReservationScreen.css'

// 신청 내역 (Figma: 모바일-신청내역)
function ReservationScreen() {
  const navigate = useNavigate()
  const [smsAgree, setSmsAgree] = useState(false)
  const [modal, setModal] = useState('')

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
          <ListBox rows={SAMPLE_RESERVATION_ROWS} />
          <div>
            <Button variant="sub-s">예약 변경</Button>
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
