import { useEffect, useRef } from 'react'
import './Modal.css'

/**
 * 모든 모달의 바탕
 * open: 열림 여부
 * onClose: Esc를 누르거나 바깥을 누르면 실행한다.
 * sheet: true면 화면 폭과 상관없이 아래에서 올라오는 시트로 보인다.
 * label: 화면 낭독기가 읽는 이름. 제목 요소가 있으면 labelledBy에 그 id를 넘긴다.
 * initialFocusRef: 열릴 때 초점을 둘 요소
 * 브라우저의 dialog를 써서 모달 안에서만 Tab이 돌고, 닫으면 초점이 원래 자리로 돌아간다.
 */
function Modal({
  open,
  onClose,
  sheet = false,
  label,
  labelledBy,
  initialFocusRef,
  className = '',
  children,
}) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (open && !dialog.open) {
      dialog.showModal()
      initialFocusRef?.current?.focus()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open, initialFocusRef])

  return (
    <dialog
      ref={dialogRef}
      className={`modal ${sheet ? 'modal--sheet' : ''} ${className}`.replace(/\s+/g, ' ').trim()}
      aria-label={label}
      aria-labelledby={labelledBy}
      onCancel={(event) => {
        event.preventDefault()
        onClose?.()
      }}
      onClick={(event) => {
        // dialog 자체가 눌렸다면 내용 바깥의 배경을 누른 것이다.
        if (event.target === dialogRef.current) onClose?.()
      }}
    >
      {open && children}
    </dialog>
  )
}

export default Modal
