import Checkbox from './Checkbox'
import './CheckboxGroup.css'

/**
 * 소제목과 체크박스 묶음 (Figma: 소제목 + 체크항목)
 * title: 소제목
 * options: 체크박스 글자 목록
 * values: 선택된 글자 목록
 * onChange: 선택이 바뀌면 바뀐 목록을 받아 실행한다.
 */
function CheckboxGroup({ title, options, values, onChange }) {
  function handleChange(option, checked) {
    onChange(checked ? [...values, option] : values.filter((value) => value !== option))
  }

  return (
    <fieldset className="checkbox-group">
      <legend className="checkbox-group__title">{title}</legend>
      <div className="checkbox-group__list">
        {options.map((option) => (
          <Checkbox
            key={option}
            checked={values.includes(option)}
            onChange={(checked) => handleChange(option, checked)}
          >
            {option}
          </Checkbox>
        ))}
      </div>
    </fieldset>
  )
}

export default CheckboxGroup
