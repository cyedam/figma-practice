import './FooterLinks.css'

/**
 * 푸터 위 링크 줄 (Figma: 푸터상단탭, 푸터탭)
 * links: [{ label, href, tone }] tone이 'yellow'·'blue'면 강조 색과 굵은 글씨로 보인다.
 *   href가 없으면 아직 동작이 없는 항목이라 회색 글씨로 보이고 누를 수 없다. (사용자 요청)
 * 링크 사이에는 세로 구분선이 들어간다. 폭이 좁으면 다음 줄로 넘어간다.
 */
function FooterLinks({ links }) {
  return (
    <ul className="footer-links">
      {links.map((link) => (
        <li key={link.label} className="footer-links__item">
          {link.href ? (
            <a
              href={link.href}
              className={`footer-links__link${link.tone ? ` footer-links__link--${link.tone}` : ''}`}
            >
              {link.label}
            </a>
          ) : (
            <span
              className={`footer-links__link footer-links__link--disabled${link.tone ? ` footer-links__link--${link.tone}` : ''}`}
            >
              {link.label}
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}

export default FooterLinks
