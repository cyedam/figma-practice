import './PeopleCounter.css'

/**
 * 인원 수를 늘리고 줄이는 입력 (Figma: 인원)
 * value: 현재 인원 수
 * onChange: 바뀐 인원 수를 받아 실행한다.
 * min, max: 최소·최대 인원. 기본값은 Figma의 1~5명이다.
 * labelledBy: 이름 역할을 하는 요소의 id
 * 끝값에서도 버튼의 키보드 초점이 사라지지 않도록 disabled 대신 aria-disabled를 쓴다.
 */
function PeopleCounter({ value, onChange, min = 1, max = 5, labelledBy }) {
  const isMin = value <= min
  const isMax = value >= max

  return (
    <div className="people-counter" role="group" aria-labelledby={labelledBy}>
      <button
        type="button"
        className="people-counter__button"
        aria-label="인원 줄이기"
        aria-disabled={isMin}
        onClick={() => {
          if (!isMin) onChange(value - 1)
        }}
      >
        <span className="people-counter__icon people-counter__icon--minus" aria-hidden="true" />
      </button>
      <output className="people-counter__value">{value}</output>
      <span className="people-counter__unit">명</span>
      <button
        type="button"
        className="people-counter__button"
        aria-label="인원 늘리기"
        aria-disabled={isMax}
        onClick={() => {
          if (!isMax) onChange(value + 1)
        }}
      >
        <span className="people-counter__icon people-counter__icon--plus" aria-hidden="true" />
      </button>
    </div>
  )
}

export default PeopleCounter
