import { useState, useEffect } from 'react'
import axios from 'axios'
import { getToken } from '../lib/auth'

const SelfGuidedForm = ({
  setIsInSession,
  setSessionData,
}) => {
  const [selectedSound, setSelectedSound] = useState('')
  const [sounds, setSounds] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken('access-token')
        const response = await axios.get('/api/sounds/', {  // Assuming the endpoint for sounds is '/api/sounds/'
          headers: { Authorization: `Bearer ${token}` },
        })
        const availableSounds = response.data.filter(sound => !sound.is_guided)
        setSounds(availableSounds)
      } catch (error) {
        console.error('Error fetching sounds:', error)
      }
    }
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const chosenSound = sounds.find(sound => sound.pk === parseInt(selectedSound))
    if (!chosenSound) return

    const payload = {
      sound: chosenSound.pk,
      duration_in_minutes: 0,  // Keeping this 0 as in your previous form, modify as needed
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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="sound">Choose Sound:</label>
          <select
            name="sound"
            id="sound"
            value={selectedSound}
            onChange={(e) => {
              setSelectedSound(e.target.value)
            }}
          >
            <option value="">Select a sound</option>
            {sounds.map(sound => (
              <option key={sound.pk} value={sound.pk}>
                {`${sound.fields.theme_or_sound_name} - ${Math.floor(sound.fields.duration)} minutes`}
              </option>
            ))}
          </select>
        </div>
        <br />
        <button type="submit">Start Session</button>
      </form>
    </div>
  )
}

export default SelfGuidedForm
