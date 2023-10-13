import { useState, useEffect } from 'react'
import { getToken } from '../lib/auth'
import axios from 'axios'

const GuidedMeditationForm = ({
  setIsInSession,
  setSessionData,
}) => {
  const [selectedMeditation, setSelectedMeditation] = useState('')
  const [meditations, setMeditations] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken('access-token')
        const response = await axios.get('/api/guided-meditations/', {
          headers: { Authorization: `Bearer ${token}` },
        })
        // Randomize the data
        const randomizedData = response.data.sort(() => Math.random() - 0.5)
        // Return the top 15
        const topFifteenResults = randomizedData.slice(0, 15)
        setMeditations(topFifteenResults)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const chosenMeditation = meditations.find(meditation => meditation.id === parseInt(selectedMeditation))
    if (!chosenMeditation) return
    // console.log(chosenMeditation)

    const payload = {
      sound: chosenMeditation.sound.id,
      duration_in_minutes: 0,
    }

    try {
      const token = getToken('access-token')
      const { data } = await axios.post('/api/meditation-sessions/', payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setIsInSession(true)
      setSessionData(data)
      console.log('Meditation session created successfully!')
    } catch (error) {
      console.error('Error creating meditation session:', error)
    }
  }

  // TODO: If !meditations return spinner here

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="meditation">Choose Meditation:</label>
          <select
            name="meditation"
            id="meditation"
            value={selectedMeditation}
            onChange={(e) => {
              setSelectedMeditation(e.target.value)
            }
            }
          >
            <option value="">Select a meditation</option>
            {meditations.map(meditation => (
              <option key={meditation.id} value={meditation.id}>
                {`${meditation.sound.theme_or_sound_name} - ${Math.floor(meditation.sound.duration)} minutes`}
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

export default GuidedMeditationForm
