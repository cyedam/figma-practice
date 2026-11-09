import { useId, useRef } from 'react'
import Button from '../components/button/Button'
import Modal from '../components/modal/Modal'
import ApplyCompleteSummary from './ApplyCompleteSummary'
import './ApplyCompleteModal.css'

/**
 * 데스크탑 신청 완료 모달 (Figma: 데스크탑-최종확인모달)
 * 데스크탑에서는 완료 화면으로 넘어가지 않고 이 모달을 띄운다.
 * open, onClose: 열림 여부와 닫기 버튼을 누를 때 실행할 동작
 * rows: 신청 내역
 * onMorePrograms: '프로그램 더보기'를 누르면 실행한다.
 * onLookup: '접수내역확인'을 누르면 실행한다.
 */
function ApplyCompleteModal({ open, onClose, rows, onMorePrograms, onLookup }) {
  const titleId = useId()
  const lookupRef = useRef(null)

  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy={titleId}
      closeOnBackdrop={false}
      initialFocusRef={lookupRef}
      className="complete-modal"
    >
      <div className="complete-modal__content">
        <div className="complete-modal__top">
          <button type="button" className="complete-modal__close" aria-label="닫기" onClick={onClose}>
            <span className="complete-modal__close-icon" aria-hidden="true" />
          </button>
        </div>
        <ApplyCompleteSummary rows={rows} titleId={titleId} />
        <div className="complete-modal__actions">
          <Button variant="sub-l" onClick={onMorePrograms}>
            프로그램 더보기
          </Button>
          <Button ref={lookupRef} variant="main-l" onClick={onLookup}>
            접수내역확인
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ApplyCompleteModal
