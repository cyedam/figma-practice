import Input from './Input'

const RULE_TEXT = '숫자 4자리를 입력해주세요.'
const MISMATCH_TEXT = '비밀번호가 다릅니다. 다시 입력해주세요.'

/**
 * 비밀번호 입력 (Figma: 비밀번호)
 * confirm: true면 '비밀번호 확인' 칸이 된다. (Figma: check-)
 * error: 오류 상태. 비밀번호는 규칙 문구, 비밀번호 확인은 불일치 문구를 보여 준다.
 * 표시/숨김은 Input 안에서 처리한다. (Figma: active)
 * 입력값 검증은 이 컴포넌트를 쓰는 화면에서 하고 결과를 error로 넘긴다.
 * 그 밖의 속성은 입력 칸에 그대로 전달한다. (value, onChange, ref 등)
 */
function PasswordInput({ confirm = false, error = false, ...rest }) {
  return (
    <Input
      variant="password"
      label={confirm ? '비밀번호 확인' : '비밀번호'}
      helperText={confirm && error ? MISMATCH_TEXT : RULE_TEXT}
      error={error}
      inputMode="numeric"
      {...rest}
    />
  )
}

export default PasswordInput
