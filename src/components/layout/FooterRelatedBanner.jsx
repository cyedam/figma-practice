import { useEffect, useState } from 'react'
import './FooterRelatedBanner.css'

// tokens.css의 --banner-slide-duration과 같은 값이어야 한다.
const SLIDE_DURATION_MS = 500

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * 유관기관 배너 (Figma: 푸터우측하단의 푸터배너보기, 푸터배너)
 * banners: [{ src, alt, href }]
 * moreHref: '배너 더보기' 주소
 * interval: 배너가 멈춰 있는 시간(ms). 기본값은 Figma 프로토타입의 2초다.
 * children: 배너 창 왼쪽에 함께 놓을 내용 (Figma: 하단로고의 인증 마크)
 *
 * 한 칸에 배너 하나씩 보이고 왼쪽으로 넘어간다. (Figma: 0.5초, ease-out)
 * 끝없이 돌도록 목록 뒤에 첫 배너를 복제해 두고, 복제 칸에 닿으면 움직임 없이 첫 칸으로 옮긴다.
 * 자동 넘김은 정지 버튼, 마우스 올림, 키보드 초점이 있을 때 멈춘다.
 * 움직임을 줄이는 설정에서는 자동으로 넘기지 않는다.
 */
function FooterRelatedBanner({ banners, moreHref = '#', interval = 2000, children }) {
  const total = banners.length
  const slides = [...banners, banners[0]]
  const [position, setPosition] = useState(0)
  const [animate, setAnimate] = useState(true)
  const [paused, setPaused] = useState(() => prefersReducedMotion())
  const [hovering, setHovering] = useState(false)
  const [focused, setFocused] = useState(false)

  const current = position % total
  const isStopped = paused || hovering || focused

  function move(amount) {
    const reduced = prefersReducedMotion()
    // 복제 칸에 있으면 첫 칸으로 보고 계산한다.
    const next = (position === total ? 0 : position) + amount
    if (next < 0) {
      // 첫 칸에서 이전으로 가면 마지막 배너로 바로 옮긴다.
      setAnimate(false)
      setPosition(total - 1)
      return
    }
    setAnimate(!reduced)
    // 움직임을 줄인 설정에서는 복제 칸을 거치지 않는다.
    setPosition(reduced && next === total ? 0 : next)
  }

  useEffect(() => {
    if (isStopped || total < 2) return undefined
    const delay = animate ? interval + SLIDE_DURATION_MS : interval
    const timer = setTimeout(() => move(1), delay)
    return () => clearTimeout(timer)
  })

  function handleTransitionEnd(event) {
    if (event.target !== event.currentTarget || event.propertyName !== 'transform') return
    if (position === total) {
      setAnimate(false)
      setPosition(0)
    }
  }

  // 초점이 배너 묶음 밖으로 나갈 때만 멈춤을 푼다.
  function handleBlur(event) {
    if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
  }

  return (
    <section
      className="footer-related"
      aria-roledescription="carousel"
      aria-label="유관기관 배너"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setFocused(true)}
      onBlur={handleBlur}
    >
      <div className="footer-related__controls">
        <div className="footer-related__buttons">
          <button
            type="button"
            className="footer-related__button"
            aria-label="이전 배너"
            onClick={() => move(-1)}
          >
            <span className="footer-related__icon footer-related__icon--prev" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="footer-related__button"
            aria-label="배너 자동 넘김 정지"
            aria-pressed={paused}
            onClick={() => setPaused(true)}
          >
            <span className="footer-related__icon footer-related__icon--pause" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="footer-related__button"
            aria-label="배너 자동 넘김 시작"
            aria-pressed={!paused}
            onClick={() => setPaused(false)}
          >
            <span className="footer-related__icon footer-related__icon--play" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="footer-related__button"
            aria-label="다음 배너"
            onClick={() => move(1)}
          >
            <span className="footer-related__icon footer-related__icon--next" aria-hidden="true" />
          </button>
        </div>
        <a href={moreHref} className="footer-related__more">
          배너 더보기
          <span className="footer-related__icon footer-related__icon--more" aria-hidden="true" />
        </a>
      </div>

      <div className="footer-related__row">
        {children}
        <div className="footer-related__view">
          <ul
            className={`footer-related__track${animate ? ' footer-related__track--animate' : ''}`}
            style={{ transform: `translateX(${position * -100}%)` }}
            onTransitionEnd={handleTransitionEnd}
          >
            {slides.map((banner, index) => {
              // 지금 보이는 칸만 키보드와 화면 낭독기가 닿게 한다.
              const visible = index === position
              return (
                <li key={index} className="footer-related__slide" aria-hidden={!visible}>
                  <a href={banner.href} tabIndex={visible ? undefined : -1}>
                    <img className="footer-related__image" src={banner.src} alt={banner.alt} />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <p className="footer-related__status" aria-live="polite">
        {isStopped ? `${total}개 중 ${current + 1}번째 배너` : ''}
      </p>
    </section>
  )
}

export default FooterRelatedBanner
