import { useEffect } from 'react'
import { login, register, logout } from './lib/auth'
import Header from './components/Header'
import Login from './components/Login'
import Register from './components/Register'
import SessionStartPage from './components/SessionStartPage'
import SelfGuidedForm from './components/SelfGuidedForm'
import GuidedMeditationForm from './components/GuidedMeditationForm'
import axios from 'axios'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export default function App() {
  // useEffect(() => {
  //   async function fetchSessions() {
  //     try {
  //       const { data } = await axios.get('/api/meditation-sessions/')
  //       console.log('Sessions data:', data)
  //     } catch (error) {
  //       console.log('Error fetching sessions:', error.response ? error.response.data : error.message)
  //     }
  //   }

  //   fetchSessions()
  // }, [])

  return (

    <BrowserRouter>

      <Header />
      <Routes>
        <Route path='/' element={<></>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/session' element={<SessionStartPage />} />
      </Routes>

    </BrowserRouter>

  )
}
