import ConfirmModal from '../components/modal/ConfirmModal'

/**
 * 재단 대표전화 안내 모달 (Figma: 대표전화모달)
 * 접수 조회와 문자인증 화면의 '전화문의'가 함께 쓴다.
 * open, onClose: 열림 여부와 닫을 때 실행할 동작
 */
function PhoneModal({ open, onClose }) {
  return (
    <ConfirmModal
      open={open}
      onClose={onClose}
      title={'재단 대표전화\n031-290-3600'}
      description="운영시간 09:00 - 18:00"
      secondaryLabel="닫기"
      onSecondary={onClose}
      primaryLabel="전화연결"
      onPrimary={() => {
        window.location.href = 'tel:0312903600'
      }}
    />
  )
}

export default PhoneModal
