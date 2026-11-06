import Banner from '../components/banner/Banner'
import ScreenLayout from './ScreenLayout'

// 메인 (Figma: 모바일-메인메뉴)
function MainScreen() {
  return (
    <ScreenLayout flush>
      <Banner />
    </ScreenLayout>
  )
}

export default MainScreen
