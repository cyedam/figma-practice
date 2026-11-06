import Modal from './Modal'
import './SelectSheet.css'

/**
 * 항목을 고르는 시트 (Figma: 모달의 모바일 선택)
 * options: 고를 항목 목록. [{ value, label }]
 * value: 선택된 항목의 value
 * onChange: 항목을 누르면 그 value를 받아 실행한다.
 * label: 화면 낭독기가 읽는 이름
 * open, onClose: 열림 여부와 닫을 때 실행할 동작
 */
function SelectSheet({ open, onClose, options, value, onChange, label }) {
  return (
    <Modal open={open} onClose={onClose} sheet label={label}>
      <div className="select-sheet">
        <span className="modal__grabber" aria-hidden="true" />
        <ul className="select-sheet__list">
          {options.map((option) => {
            const isSelected = option.value === value
            return (
              <li key={option.value}>
                <button
                  type="button"
                  className={`select-sheet__option${isSelected ? ' select-sheet__option--selected' : ''}`}
                  aria-current={isSelected || undefined}
                  onClick={() => onChange(option.value)}
                >
                  {option.label}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </Modal>
  )
}

export default SelectSheet
