import logo from '../../assets/images/logo.png'
import logoWide from '../../assets/images/logo-wide.png'
import './Header.css'

/**
 * 화면 맨 위 (Figma: 헤더)
 * onBack: 이전 버튼을 누르면 실행한다. 없으면 이전 버튼 자리를 비워 둔다.
 * onLogoClick: 로고를 누르면 실행한다.
 * onMenuClick: 메뉴 버튼을 누르면 실행한다.
 */
function Header({ onBack, onLogoClick, onMenuClick }) {
  return (
    <header className="header">
      {onBack ? (
        <button type="button" className="header__button" aria-label="이전 화면" onClick={onBack}>
          <span className="header__icon header__icon--back" aria-hidden="true" />
        </button>
      ) : (
        <span className="header__button" />
      )}
      <button
        type="button"
        className="header__button header__button--logo"
        aria-label="메인 화면"
        onClick={onLogoClick}
      >
        {/* 태블릿부터는 Figma처럼 글자가 있는 가로 로고를 쓴다. */}
        <picture>
          <source media="(min-width: 768px)" srcSet={logoWide} />
          <img className="header__logo" src={logo} alt="" />
        </picture>
      </button>
      <button type="button" className="header__button" aria-label="전체 메뉴" onClick={onMenuClick}>
        <span className="header__icon header__icon--menu" aria-hidden="true" />
      </button>
    </header>
  )
}

export default Header
