
import Header from './components/Header'
import Login from './components/Login'
import Register from './components/Register'
import SessionStartPage from './components/SessionStartPage'
import MeditationSessions from './components/MeditationSessions'
import AllMeditations from './components/AllMeditations'
import Footer from './components/Footer'
import NotFound from './components/NotFoundPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

export default function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Header />
      <Routes>
        <Route path='/' element={<></>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/session' element={<SessionStartPage />} />
        <Route path='/meditation-sessions' element={<MeditationSessions />} />
        <Route path='/meditations' element={<AllMeditations />} />
        <Route path='*' element={<NotFound />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
