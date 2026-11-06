import './BannerDetailLink.css'

/**
 * 상세 내용 보기 링크 (Figma: 상세버튼)
 * href: 이동할 주소
 * children: 글자. 기본값은 Figma의 '상세 내용 보기'다.
 */
function BannerDetailLink({ href, children = '상세 내용 보기' }) {
  return (
    <a className="banner-detail-link" href={href}>
      <span>{children}</span>
      <span className="banner-detail-link__icon" aria-hidden="true" />
    </a>
  )
}

export default BannerDetailLink
