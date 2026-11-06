import { Route, Routes } from 'react-router'
import ApplyCompleteScreen from './screens/ApplyCompleteScreen'
import ApplyScreen from './screens/ApplyScreen'
import LookupScreen from './screens/LookupScreen'
import MainScreen from './screens/MainScreen'
import ProgramListScreen from './screens/ProgramListScreen'
import ReservationScreen from './screens/ReservationScreen'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainScreen />} />
      <Route path="/programs" element={<ProgramListScreen />} />
      <Route path="/apply" element={<ApplyScreen />} />
      <Route path="/apply/complete" element={<ApplyCompleteScreen />} />
      <Route path="/lookup" element={<LookupScreen />} />
      <Route path="/lookup/result" element={<ReservationScreen />} />
    </Routes>
  )
}

export default App
