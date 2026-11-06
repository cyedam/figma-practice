import './Checkbox.css'

/**
 * 글자가 있는 체크박스 (Figma: 체크박스)
 * children: 체크박스 옆 글자
 * checked: 선택 여부
 * onChange: 누르면 바뀐 선택 여부(true/false)를 받아 실행한다.
 */
function Checkbox({ children, checked, onChange }) {
  return (
    <label className="checkbox">
      <input
        className="checkbox__input"
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className="checkbox__icon" aria-hidden="true" />
      <span>{children}</span>
    </label>
  )
}

export default Checkbox
