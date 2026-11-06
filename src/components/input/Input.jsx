import { useId, useState } from 'react'
import PasswordToggle from './PasswordToggle'
import PeopleCounter from './PeopleCounter'
import './Input.css'

/**
 * 제목이 있는 입력 칸 (Figma: 인풋)
 * variant: Figma '기능' 속성과 대응한다.
 *   text(일반), password(비밀번호), box(박스형, 여러 줄 읽기 전용), counter(숫자버튼)
 * label: 제목
 * helperText: 입력 칸 아래 안내 문구. text, password에서만 보인다.
 * error: 오류 상태. text, password에서만 적용되며 안내 문구가 오류 문구로 표시된다.
 * 그 밖의 속성은 입력 칸에 그대로 전달한다. (value, onChange, ref 등)
 * counter는 value, onChange, min, max를 PeopleCounter에 전달한다.
 */
function Input({
  variant = 'text',
  label,
  helperText,
  error = false,
  id,
  className = '',
  ...rest
}) {
  const generatedId = useId()
  const [passwordVisible, setPasswordVisible] = useState(false)
  const inputId = id ?? generatedId
  const labelId = `${inputId}-label`
  const messageId = `${inputId}-message`

  const canShowMessage = variant === 'text' || variant === 'password'
  const hasError = canShowMessage && error
  const rootClass = `input input--${variant} ${hasError ? 'input--error' : ''} ${className}`
    .replace(/\s+/g, ' ')
    .trim()

  if (variant === 'counter') {
    return (
      <div className={rootClass}>
        <span className="input__label" id={labelId}>
          {label}
        </span>
        <PeopleCounter labelledBy={labelId} {...rest} />
      </div>
    )
  }

  // 박스형은 고칠 수 없는 안내 글이라 입력 칸 대신 여러 줄 글로 보여 준다.
  if (variant === 'box') {
    return (
      <div className={rootClass}>
        <span className="input__label">{label}</span>
        <div className="input__field">
          <p className="input__text">{rest.value}</p>
        </div>
      </div>
    )
  }

  const isPassword = variant === 'password'
  const inputType = isPassword && !passwordVisible ? 'password' : 'text'

  return (
    <div className={rootClass}>
      <label className="input__label" htmlFor={inputId}>
        {label}
      </label>
      <div className="input__field">
        <input
          className="input__control"
          id={inputId}
          type={inputType}
          aria-invalid={hasError || undefined}
          aria-describedby={canShowMessage && helperText ? messageId : undefined}
          {...rest}
        />
        {isPassword && (
          <PasswordToggle
            visible={passwordVisible}
            onToggle={() => setPasswordVisible(!passwordVisible)}
          />
        )}
        {variant === 'text' && hasError && <span className="input__edit-icon" aria-hidden="true" />}
      </div>
      {canShowMessage && !hasError && helperText && (
        <p className="input__message" id={messageId}>
          {helperText}
        </p>
      )}
      {/* 화면 낭독기가 오류를 바로 읽도록 aria-live 영역을 미리 만들어 둔다. */}
      {canShowMessage && (
        <div aria-live="assertive">
          {hasError && helperText && (
            <p className="input__message input__message--error" id={messageId}>
              <span aria-hidden="true">❗</span>
              {helperText}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default Input
