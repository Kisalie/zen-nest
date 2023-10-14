import { useState, useEffect } from 'react'
import axios from 'axios'
import Spinner from './Spinner'
import { getToken } from '../lib/auth'

const SelfGuidedForm = ({
  setIsInSession,
  setSessionData,
}) => {
  const [selectedSound, setSelectedSound] = useState('')
  const [sounds, setSounds] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken('access-token')
        const response = await axios.get('/api/sounds/', {
          headers: { Authorization: `Bearer ${token}` },
        })
        const availableSounds = response.data.filter(sound => !sound.is_guided)
        setSounds(availableSounds)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching sounds:', error)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const chosenSound = sounds.find(sound => sound.id === parseInt(selectedSound))
    if (!chosenSound) return

    const payload = {
      sound: chosenSound.id,
      duration_in_minutes: 0,
    }

    try {
      const token = getToken('access-token')
      const { data } = await axios.post('/api/meditation-sessions/', payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setIsInSession(true)
      setSessionData(data)
      console.log('Self-guided session created successfully!')
    } catch (error) {
      console.error('Error creating self-guided session:', error)
    }
  }

  return (
    <div className={`p-4 sm:p-8 max-w-lg mx-auto ${isLoading ? '' : 'bg-blue-50 shadow-md rounded-md'} `}>
      {isLoading ? (
        // Render the spinner when isLoading is true
        <Spinner loading={isLoading} color="#005ec2" size={50} />
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="sound">Choose Sound:  </label>
            <select className="bg-sky-100 rounded"
              name="sound"
              id="sound"
              value={selectedSound}
              onChange={(e) => {
                setSelectedSound(e.target.value)
              }}
            >
              <option value="">Select a sound</option>
              {sounds.map(sound => (
                <option key={sound.id} value={sound.id}>
                  {sound.theme_or_sound_name}
                </option>
              ))}
            </select>
          </div>
          <br />
          <button
            className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit">Start Session</button>
        </form>
      )}
    </div>
  )
}

export default SelfGuidedForm
