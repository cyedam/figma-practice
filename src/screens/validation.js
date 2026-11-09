// 입력 검증 규칙과 오류 문구 (사용자와 확정, PRD FR-4)
// 신청 화면에서 쓴다.
// 각 함수는 오류 문구를 돌려주고, 오류가 없으면 빈 문자열을 돌려준다.

export const PHONE_GUIDE = '‘-’없이 숫자만 입력해주세요. (예 01012341234)'

const PHONE_PATTERN = /^01\d{8,9}$/ // 01로 시작하는 숫자 10~11자리
const PASSWORD_PATTERN = /^\d{4}$/ // 숫자 4자리

export const ERROR_TEXT = {
  nameEmpty: '신청자 성명을 입력해주세요.',
  phoneEmpty: '휴대전화 번호를 입력해주세요.',
  phoneFormat: `휴대전화 번호 형식이 맞지 않습니다. ${PHONE_GUIDE}`,
  passwordRule: '비밀번호는 숫자 4자리로 입력해주세요.',
  passwordMismatch: '비밀번호가 다릅니다. 다시 입력해주세요.',
}

// 비어 있으면 emptyText를 돌려준다.
export function checkRequired(value, emptyText) {
  return value.trim() ? '' : emptyText
}

export function checkPhone(phone) {
  const value = phone.trim()
  if (!value) return ERROR_TEXT.phoneEmpty
  return PHONE_PATTERN.test(value) ? '' : ERROR_TEXT.phoneFormat
}

export function checkPassword(password) {
  return PASSWORD_PATTERN.test(password) ? '' : ERROR_TEXT.passwordRule
}

export function checkPasswordMatch(password, passwordCheck) {
  return passwordCheck && passwordCheck === password ? '' : ERROR_TEXT.passwordMismatch
}
