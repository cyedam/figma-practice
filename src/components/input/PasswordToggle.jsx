import './PasswordToggle.css'

/**
 * 비밀번호 표시/숨김 버튼 (Figma: 비밀번호표시)
 * visible: 지금 비밀번호가 보이는지 여부
 * onToggle: 버튼을 누르면 실행한다.
 * Figma처럼 숨김 상태는 뜬 눈, 표시 상태는 감은 눈으로 보여 준다.
 */
function PasswordToggle({ visible, onToggle }) {
  return (
    <button
      type="button"
      className="password-toggle"
      aria-label={visible ? '비밀번호 숨기기' : '비밀번호 표시'}
      onClick={onToggle}
    >
      <span
        className={`password-toggle__icon password-toggle__icon--${visible ? 'closed' : 'open'}`}
        aria-hidden="true"
      />
    </button>
  )
}

export default PasswordToggle
