import { Route, Routes } from 'react-router'
import useScrollToTop from './hooks/useScrollToTop'
import ApplyCompleteScreen from './screens/ApplyCompleteScreen'
import ApplyScreen from './screens/ApplyScreen'
import LookupScreen from './screens/LookupScreen'
import MainScreen from './screens/MainScreen'
import PasswordResetScreen from './screens/PasswordResetScreen'
import ProgramListScreen from './screens/ProgramListScreen'
import ReservationScreen from './screens/ReservationScreen'
import SmsAuthScreen from './screens/SmsAuthScreen'

function App() {
  // 다른 화면으로 넘어가면 맨 위부터 보이게 한다.
  useScrollToTop()

  return (
    <Routes>
      <Route path="/" element={<MainScreen />} />
      <Route path="/programs" element={<ProgramListScreen />} />
      <Route path="/apply" element={<ApplyScreen />} />
      <Route path="/apply/complete" element={<ApplyCompleteScreen />} />
      <Route path="/lookup" element={<LookupScreen />} />
      <Route path="/lookup/result" element={<ReservationScreen />} />
      <Route path="/lookup/sms" element={<SmsAuthScreen />} />
      <Route path="/lookup/reset" element={<PasswordResetScreen />} />
    </Routes>
  )
}

export default App
