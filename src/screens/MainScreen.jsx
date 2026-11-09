import Banner from '../components/banner/Banner'
import ScreenLayout from './ScreenLayout'
import './MainScreen.css'

// 메인 (Figma: 모바일-메인메뉴, 태블릿-메인화면, 데스크탑-메인메뉴)
function MainScreen() {
  return (
    <ScreenLayout flush>
      <div className="main-screen__banner">
        <Banner />
      </div>
    </ScreenLayout>
  )
}

export default MainScreen
