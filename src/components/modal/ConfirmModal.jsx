import { useId, useRef } from 'react'
import Button from '../button/Button'
import ListBox from '../card/ListBox'
import Modal from './Modal'
import './ConfirmModal.css'

/**
 * 확인 모달 (Figma: 모달의 투버튼, 원버튼, 모바일 확인)
 * title, description: 제목과 설명문
 * rows: 확인 내용. [{ label, value }] 형태이며 없으면 숨긴다.
 * primaryLabel, onPrimary: 주요 버튼
 * secondaryLabel, onSecondary: 보조 버튼. 이름이 없으면 버튼 1개만 보인다.
 * open, onClose: 열림 여부와 닫을 때 실행할 동작
 * 보조 버튼이 있으면 열릴 때 초점을 보조 버튼에 둔다.
 * 보조 버튼에는 현재 작업을 잃지 않는 선택지(예: 계속 작성)를 넣는다.
 */
function ConfirmModal({
  open,
  onClose,
  title,
  description,
  rows,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
}) {
  const titleId = useId()
  const primaryRef = useRef(null)
  const secondaryRef = useRef(null)
  const isLarge = Boolean(secondaryLabel || rows)

  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy={titleId}
      initialFocusRef={secondaryLabel ? secondaryRef : primaryRef}
      className={`confirm-modal${isLarge ? ' confirm-modal--large' : ''}`}
    >
      <div className="confirm-modal__content">
        <div className="confirm-modal__header">
          <div className="confirm-modal__text">
            <h3 id={titleId}>{title}</h3>
            {description && <p className="confirm-modal__description">{description}</p>}
          </div>
          <button
            type="button"
            className="confirm-modal__close"
            aria-label="닫기"
            onClick={onClose}
          >
            <span className="confirm-modal__close-icon" aria-hidden="true" />
          </button>
        </div>
        {rows && <ListBox rows={rows} />}
        <div className="confirm-modal__actions">
          {secondaryLabel && (
            <Button ref={secondaryRef} variant="sub-s" onClick={onSecondary}>
              {secondaryLabel}
            </Button>
          )}
          <Button ref={primaryRef} variant="main-s" onClick={onPrimary}>
            {primaryLabel}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmModal
