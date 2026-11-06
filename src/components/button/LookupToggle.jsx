import './LookupToggle.css'

const OPTIONS = [
  { value: 'receipt-number', label: '접수번호 조회' },
  { value: 'name-contact', label: '성명·연락처 조회' },
]

/**
 * 조회 방법을 고르는 버튼 (Figma: 조회버튼)
 * value: 선택된 방법. 'receipt-number'(접수번호) 또는 'name-contact'(성명·연락처)
 * onChange: 다른 방법을 누르면 그 방법의 value를 받아 실행한다.
 * 선택 상태는 이 컴포넌트를 쓰는 화면이 useState로 관리한다.
 */
function LookupToggle({ value, onChange }) {
  return (
    <div className="lookup-toggle" role="group" aria-label="조회 방법">
      {OPTIONS.map((option) => {
        const isSelected = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            className={`lookup-toggle__item${isSelected ? ' lookup-toggle__item--selected' : ''}`}
            aria-pressed={isSelected}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

export default LookupToggle
