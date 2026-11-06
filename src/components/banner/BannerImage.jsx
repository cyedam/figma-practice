import './BannerImage.css'

/**
 * 배너 이미지 (Figma: 배너/가로형, 배너/세로형)
 * landscape: 데스크탑(1440px부터)에서 쓰는 가로 이미지
 * portrait: 모바일과 태블릿에서 쓰는 세로 이미지
 * alt: 이미지 설명
 * 크기는 부모를 꽉 채우므로, 부모가 정한 비율대로 잘려 보인다.
 */
function BannerImage({ landscape, portrait, alt }) {
  return (
    <picture className="banner-image">
      <source media="(min-width: 1440px)" srcSet={landscape} />
      <img src={portrait} alt={alt} />
    </picture>
  )
}

export default BannerImage
