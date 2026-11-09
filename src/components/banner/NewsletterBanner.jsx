import desktopImage from '../../assets/images/newsletter-desktop.jpg'
import mobileImage from '../../assets/images/newsletter-mobile.jpg'
import './NewsletterBanner.css'

// 이미지 안의 글을 그대로 옮긴 대체 글
const ALT =
  '수원문화재단 뉴스레터 구독. 수원문화재단의 문화·예술·관광 소식을 메일로 받아보세요! 구독신청 바로가기'

/**
 * 뉴스레터 배너 (Figma: 뉴스레터, 메인 배너 아래 CTA-뉴스레터)
 * href: 구독 신청 주소. 주면 배너 전체가 링크가 되고, 없으면 이미지만 보여 준다.
 *
 * 화면 폭별 이미지
 *   모바일(~767px): 모바일 이미지 (700×280)
 *   태블릿·데스크탑(768px부터): 데스크탑 이미지 (1600×266). 화면 폭에 맞춰 줄어든다.
 */
function NewsletterBanner({ href }) {
  const picture = (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktopImage} width="1600" height="266" />
      <img
        className="newsletter-banner__image"
        src={mobileImage}
        alt={ALT}
        width="700"
        height="280"
      />
    </picture>
  )

  return (
    <div className="newsletter-banner">
      {href ? (
        <a href={href} className="newsletter-banner__link">
          {picture}
        </a>
      ) : (
        picture
      )}
    </div>
  )
}

export default NewsletterBanner
