import Banner from '../components/banner/Banner'
import NewsletterBanner from '../components/banner/NewsletterBanner'
import ScreenLayout from './ScreenLayout'
import './MainScreen.css'

// 메인 (Figma: 모바일-메인메뉴, 태블릿-메인화면, 데스크탑-메인메뉴)
function MainScreen() {
  return (
    <ScreenLayout flush>
      <div className="main-screen__banner">
        <Banner />
      </div>
      {/* 메인 배너 아래 뉴스레터 배너 (Figma: CTA-뉴스레터, 구역 사이 40px) */}
      <div className="main-screen__newsletter">
        <NewsletterBanner />
      </div>
    </ScreenLayout>
  )
}

export default MainScreen
