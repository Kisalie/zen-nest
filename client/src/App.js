
import Header from './components/Header'
import Login from './components/Login'
import Register from './components/Register'
import SessionStartPage from './components/SessionStartPage'
import MeditationSessions from './components/MeditationSessions'
import AllMeditations from './components/AllMeditations'
import Footer from './components/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


export default function App() {


  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<></>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/session' element={<SessionStartPage />} />
        <Route path='/meditation-sessions' element={<MeditationSessions />} />
        <Route path='/all-meditations' element={<AllMeditations />} />

      </Routes>
      <Footer />
    </BrowserRouter>

  )
}
