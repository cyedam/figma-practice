import './BannerInfo.css'

/**
 * 배너 제목과 설명 (Figma: D배너정보)
 * title: 제목
 * description: 설명. 줄바꿈 문자(\n)는 그대로 줄이 바뀐다.
 */
function BannerInfo({ title, description }) {
  return (
    <div className="banner-info">
      <h3 className="banner-info__title">{title}</h3>
      <p className="banner-info__description">{description}</p>
    </div>
  )
}

export default BannerInfo
