import FooterLinks from './FooterLinks'
import FooterRelatedBanner from './FooterRelatedBanner'
import {
  FOOTER_COPYRIGHT,
  FOOTER_INFO,
  FOOTER_LINKS,
  FOOTER_LOGO,
  FOOTER_MARKS,
  RELATED_BANNERS,
} from './footerData'
import './Footer.css'

const PRIVACY_LINK = FOOTER_LINKS[0]
const SITEMAP_LINK = FOOTER_LINKS.find((link) => link.label === '사이트맵')

// 화면 맨 위로 올리고, 키보드 초점도 화면에서 가장 처음 누를 수 있는 곳으로 옮긴다.
function scrollToTop() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
  const first = [...document.querySelectorAll('a[href], button:not([disabled])')].find(
    (element) => element.offsetParent !== null,
  )
  first?.focus({ preventScroll: true })
}

/**
 * 푸터 (Figma: 요소-푸터섹션)
 *
 * 화면 폭별 모양
 *   모바일(~767px): 푸터-모바일. '사이트맵'·'위로 이동' 버튼, 개인정보처리방침, 저작권 문구
 *   태블릿·데스크탑(768px부터): 푸터-데스크탑. 링크 줄, 로고와 정보 글, 유관기관 배너
 * 두 모양을 모두 그리고 CSS로 하나만 보여 준다.
 */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__mobile">
        <div className="footer__mobile-buttons">
          <a href={SITEMAP_LINK.href} className="footer__mobile-button">
            사이트맵
          </a>
          <button type="button" className="footer__mobile-button" onClick={scrollToTop}>
            위로 이동
            <span className="footer__up-icon" aria-hidden="true" />
          </button>
        </div>
        <div className="footer__mobile-bottom">
          <a href={PRIVACY_LINK.href} className="footer__privacy">
            {PRIVACY_LINK.label}
          </a>
          <p className="footer__copyright">ⓒ SUWON CULTURAL FOUNDATION.</p>
        </div>
      </div>

      <div className="footer__desktop">
        <nav className="footer__links" aria-label="푸터 메뉴">
          <FooterLinks links={FOOTER_LINKS} />
        </nav>
        <div className="footer__bottom">
          <div className="footer__info">
            <img className="footer__logo" src={FOOTER_LOGO.src} alt={FOOTER_LOGO.alt} />
            <address className="footer__address">
              {FOOTER_INFO.map((line) => (
                <p key={line[0]} className="footer__address-line">
                  {line.map((part) => (
                    <span key={part} className="footer__address-part">
                      {part}
                    </span>
                  ))}
                </p>
              ))}
              <p>{FOOTER_COPYRIGHT}</p>
            </address>
          </div>
          <div className="footer__right">
            <FooterRelatedBanner banners={RELATED_BANNERS}>
              {FOOTER_MARKS.map((mark) => (
                <img key={mark.alt} className={mark.className} src={mark.src} alt={mark.alt} />
              ))}
            </FooterRelatedBanner>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
