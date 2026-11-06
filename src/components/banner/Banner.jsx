import { useEffect, useState } from 'react'
import BannerControls from './BannerControls'
import BannerDots from './BannerDots'
import BannerImage from './BannerImage'
import BannerInfo from './BannerInfo'
import BannerMobileTitle from './BannerMobileTitle'
import { BANNERS } from './bannerData'
import './Banner.css'

// tokens.css의 --banner-slide-duration과 같은 값이어야 한다.
const SLIDE_DURATION_MS = 500

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * 메인 배너 (Figma: 메인배너완성)
 * banners: 배너 목록. 기본값은 bannerData.js의 BANNERS다.
 * interval: 배너가 멈춰 있는 시간(ms). 기본값은 Figma의 2초다.
 *
 * 화면 폭별 모양
 *   모바일, 태블릿: 세로 이미지, 순서 표시, 제목. 이미지를 누르면 다음 배너로 넘어간다.
 *   데스크탑(1440px부터): 왼쪽 정보와 조작 버튼, 오른쪽 가로 이미지
 *
 * 끝없이 도는 방법
 *   목록 앞뒤에 마지막·첫 배너를 복제해 두고, 복제 칸까지 움직인 뒤
 *   움직임 없이 진짜 칸으로 옮긴다. position은 복제 칸을 포함한 위치다.
 *
 * 자동 넘김은 정지 버튼, 마우스 올림, 키보드 초점이 있을 때 멈춘다.
 */
function Banner({ banners = BANNERS, interval = 2000 }) {
  const total = banners.length
  const slides = [banners[total - 1], ...banners, banners[0]]

  const [position, setPosition] = useState(1)
  const [animate, setAnimate] = useState(true)
  const [paused, setPaused] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [focused, setFocused] = useState(false)

  const currentIndex = (position - 1 + total) % total
  const isStopped = paused || hovering || focused

  function move(amount) {
    const reduced = prefersReducedMotion()
    setAnimate(!reduced)
    setPosition((previous) => {
      // 복제 칸에 있으면 먼저 진짜 칸 번호로 바꾼다.
      const start = previous === 0 ? total : previous === total + 1 ? 1 : previous
      const next = start + amount
      if (!reduced) return next
      // 움직임을 줄인 설정에서는 복제 칸을 거치지 않고 바로 옮긴다.
      return next === 0 ? total : next === total + 1 ? 1 : next
    })
  }

  useEffect(() => {
    if (isStopped || total < 2) return undefined
    // Figma처럼 옆으로 움직이는 시간이 끝난 뒤부터 interval을 기다린다.
    const delay = animate ? interval + SLIDE_DURATION_MS : interval
    const timer = setTimeout(() => move(1), delay)
    return () => clearTimeout(timer)
  })

  function handleTransitionEnd(event) {
    if (event.target !== event.currentTarget || event.propertyName !== 'transform') return
    if (position === 0 || position === total + 1) {
      setAnimate(false)
      setPosition(position === 0 ? total : 1)
    }
  }

  const trackClass = `banner__track${animate ? ' banner__track--animate' : ''}`
  const trackStyle = { transform: `translateX(-${position * 100}%)` }

  return (
    <section
      className="banner"
      aria-roledescription="carousel"
      aria-label="메인 배너"
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') setHovering(true)
      }}
      onPointerLeave={() => setHovering(false)}
      onFocus={(event) => {
        // 키보드로 옮겨 왔을 때만 멈춘다. 터치 후에도 자동 넘김은 계속된다.
        if (event.target.matches(':focus-visible')) setFocused(true)
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
      }}
    >
      <div className="banner__side">
        <div className="banner__view banner__view--info">
          <div className={trackClass} style={trackStyle}>
            {slides.map((banner, index) => (
              <div
                className="banner__slide"
                key={`${banner.id}-${index}`}
                aria-hidden={index !== position}
              >
                <BannerInfo title={banner.title} description={banner.description} />
              </div>
            ))}
          </div>
        </div>
        <BannerControls
          current={currentIndex + 1}
          total={total}
          onPrev={() => move(-1)}
          onNext={() => move(1)}
          paused={paused}
          onTogglePause={() => setPaused(!paused)}
        />
      </div>

      <div className="banner__view banner__view--image">
        <div className={trackClass} style={trackStyle} onTransitionEnd={handleTransitionEnd}>
          {slides.map((banner, index) => (
            <div
              className="banner__slide"
              key={`${banner.id}-${index}`}
              aria-hidden={index !== position}
            >
              <BannerImage
                landscape={banner.landscape}
                portrait={banner.portrait}
                alt={banner.title}
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          className="banner__next-area"
          aria-label="다음 배너"
          onClick={() => move(1)}
        />
      </div>

      <BannerDots total={total} current={currentIndex} />

      <div className="banner__view banner__view--title">
        <div className={trackClass} style={trackStyle}>
          {slides.map((banner, index) => (
            <div
              className="banner__slide"
              key={`${banner.id}-${index}`}
              aria-hidden={index !== position}
            >
              <BannerMobileTitle>{banner.mobileTitle}</BannerMobileTitle>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Banner
