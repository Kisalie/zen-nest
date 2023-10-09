import { useEffect } from 'react'
import { login, register, logout } from './lib/auth'
import axios from 'axios'

export default function App() {
  useEffect(() => {
    async function fetchSessions() {
      try {
        const { data } = await axios.get('/api/meditation-sessions/')
        console.log('Sessions data:', data)
      } catch (error) {
        console.log('Error fetching sessions:', error.response ? error.response.data : error.message)
      }
    }

    fetchSessions()
  }, [])

  return (
    <>
      <button
        onClick={() => login(
          'kisalie',
          'pass'
        )}
      >Login </button>
      <button onClick={() => register(
        'kisalie12312312',
        'pass',
        'pass'
      )}>Register</button>
      <button onClick={logout}>Logout</button>
    </>
  )
}