import './BannerDots.css'

/**
 * 모바일·태블릿 배너의 순서 표시 (Figma: 인디케이터)
 * total: 전체 개수
 * current: 현재 순서. 0부터 시작한다.
 * 보기 전용이라 누를 수 없고, 화면 낭독기에는 읽히지 않는다.
 */
function BannerDots({ total, current }) {
  return (
    <div className="banner-dots" aria-hidden="true">
      {Array.from({ length: total }, (_, index) => (
        <span
          key={index}
          className={`banner-dots__dot${index === current ? ' banner-dots__dot--active' : ''}`}
        />
      ))}
    </div>
  )
}

export default BannerDots
