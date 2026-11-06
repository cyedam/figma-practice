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
 * primaryVariant: 주요 버튼 종류. 기본은 청록(main-s), 대기 신청은 파랑(special-l)
 * secondaryLabel, onSecondary: 보조 버튼. 이름이 없으면 버튼 1개만 보인다.
 * open, onClose: 열림 여부와 닫을 때 실행할 동작
 * safeChoice: 열릴 때 초점을 둘 버튼. 현재 작업을 잃지 않는 쪽을 고른다.
 *   기본은 보조 버튼('이어서 작성하기' 등)이고, 주요 버튼이 안전하면 'primary'를 준다.
 */
function ConfirmModal({
  open,
  onClose,
  title,
  description,
  rows,
  primaryLabel,
  onPrimary,
  primaryVariant = 'main-s',
  secondaryLabel,
  onSecondary,
  safeChoice = 'secondary',
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
      closeOnBackdrop={false}
      initialFocusRef={secondaryLabel && safeChoice === 'secondary' ? secondaryRef : primaryRef}
      className={`confirm-modal${isLarge ? ' confirm-modal--large' : ''}`}
    >
      <div className="confirm-modal__content">
        <div className="confirm-modal__header">
          <div className="confirm-modal__text">
            <h3 className="confirm-modal__title" id={titleId}>
              {title}
            </h3>
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
          <Button ref={primaryRef} variant={primaryVariant} onClick={onPrimary}>
            {primaryLabel}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmModal
