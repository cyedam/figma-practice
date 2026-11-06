import './BannerControls.css'

/**
 * 배너 조작 버튼과 순서 (Figma: 배너인디케이터)
 * current, total: 현재 순서와 전체 개수
 * onPrev, onNext: 이전, 다음 버튼을 누르면 실행한다.
 * paused: 자동 넘김이 멈춰 있는지 여부
 * onTogglePause: 정지 버튼을 누르면 실행한다.
 */
function BannerControls({ current, total, onPrev, onNext, paused, onTogglePause }) {
  return (
    <div className="banner-controls">
      <div className="banner-controls__arrows">
        <button
          type="button"
          className="banner-controls__arrow banner-controls__arrow--prev"
          aria-label="이전 배너"
          onClick={onPrev}
        >
          <span className="banner-controls__icon banner-controls__icon--prev" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="banner-controls__arrow banner-controls__arrow--next"
          aria-label="다음 배너"
          onClick={onNext}
        >
          <span className="banner-controls__icon banner-controls__icon--next" aria-hidden="true" />
        </button>
      </div>
      <p className="banner-controls__count" aria-label={`전체 ${total}개 중 ${current}번째 배너`}>
        <span className="banner-controls__current">{current}</span>
        <span className="banner-controls__total">/{total}</span>
      </p>
      <button
        type="button"
        className="banner-controls__pause"
        aria-label={paused ? '배너 자동 넘김 다시 시작' : '배너 자동 넘김 멈춤'}
        onClick={onTogglePause}
      >
        <span className="banner-controls__icon banner-controls__icon--pause" aria-hidden="true" />
      </button>
    </div>
  )
}

export default BannerControls
