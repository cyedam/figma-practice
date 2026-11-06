import './BannerMobileTitle.css'

/**
 * 모바일 배너 제목 (Figma: M배너제목)
 * children: 제목. 줄바꿈 문자(\n)는 그대로 줄이 바뀐다.
 */
function BannerMobileTitle({ children }) {
  return (
    <div className="banner-mobile-title">
      <h3 className="banner-mobile-title__text">{children}</h3>
    </div>
  )
}

export default BannerMobileTitle
