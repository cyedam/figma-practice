import { useEffect, useRef, useState } from 'react'
import SelectSheet from '../modal/SelectSheet'
import useIsMobile from '../../hooks/useIsMobile'
import './Dropdown.css'

/**
 * 드롭다운 (Figma: 드롭다운의 공통 default·click, 데스크탑·모바일 항목)
 * options: 고를 항목 목록. [{ value, label }]
 * value: 선택된 항목의 value
 * onChange: 다른 항목을 고르면 그 value를 받아 실행한다.
 * placeholder: 아무것도 고르지 않았을 때 보이는 문구
 * label: 화면 낭독기가 읽는 이름
 * 바깥을 누르거나 Esc를 누르면 닫힌다.
 * 목록은 태블릿부터 버튼 아래에, 모바일에서는 아래에서 올라오는 시트로 열린다.
 */
function Dropdown({ options, value, onChange, placeholder = '선택해주세요', label }) {
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()
  const rootRef = useRef(null)
  const triggerRef = useRef(null)
  const selected = options.find((option) => option.value === value)

  useEffect(() => {
    if (!open) return undefined

    function handleOutsidePress(event) {
      if (!rootRef.current.contains(event.target)) setOpen(false)
    }

    document.addEventListener('mousedown', handleOutsidePress)
    return () => document.removeEventListener('mousedown', handleOutsidePress)
  }, [open])

  function handleKeyDown(event) {
    if (open && event.key === 'Escape') {
      setOpen(false)
      triggerRef.current.focus()
    }
  }

  // Tab 키로 드롭다운 밖으로 나가면 닫는다.
  function handleBlur(event) {
    if (event.relatedTarget && !rootRef.current.contains(event.relatedTarget)) setOpen(false)
  }

  function handleSelect(optionValue) {
    onChange(optionValue)
    setOpen(false)
    triggerRef.current.focus()
  }

  return (
    <div className="dropdown" ref={rootRef} onKeyDown={handleKeyDown} onBlur={handleBlur}>
      <button
        type="button"
        className={`dropdown__trigger${open ? ' dropdown__trigger--open' : ''}`}
        ref={triggerRef}
        aria-label={label ? `${label}: ${selected ? selected.label : placeholder}` : undefined}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span className="dropdown__text">{selected ? selected.label : placeholder}</span>
        <span
          className={`dropdown__icon dropdown__icon--${open ? 'up' : 'down'}`}
          aria-hidden="true"
        />
      </button>
      {isMobile && (
        <SelectSheet
          open={open}
          onClose={() => setOpen(false)}
          label={label ?? placeholder}
          options={options}
          value={value}
          onChange={handleSelect}
        />
      )}
      {!isMobile && open && (
        <ul className="dropdown__list">
          {options.map((option) => {
            const isSelected = option.value === value
            return (
              <li key={option.value}>
                <button
                  type="button"
                  className={`dropdown__option${isSelected ? ' dropdown__option--selected' : ''}`}
                  aria-current={isSelected || undefined}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
