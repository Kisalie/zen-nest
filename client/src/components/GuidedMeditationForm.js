import { useState, useEffect } from 'react'
import { getToken } from '../lib/auth'
import Spinner from './Spinner'
import axios from 'axios'

const GuidedMeditationForm = ({
  setIsInSession,
  setSessionData,
}) => {
  const [selectedMeditation, setSelectedMeditation] = useState('')
  const [meditations, setMeditations] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken('access-token')
        const response = await axios.get('/api/guided-meditations/', {
          headers: { Authorization: `Bearer ${token}` },
        })
        const randomizedData = response.data.sort(() => Math.random() - 0.5)
        const topFifteenResults = randomizedData.slice(0, 15)
        setMeditations(topFifteenResults)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setIsLoading(false)
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

  return (
    <div className="p-4 sm:p-8 max-w-lg mx-auto bg-white shadow-md rounded-md">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Spinner loading={isLoading} color="#005ec2" size={50} />
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="meditation">
              Choose Meditation:
            </label>
            <select
              className="w-full p-2 bg-sky-100 rounded border-2 border-sky-700 focus:ring-2 focus:ring-sky-500 transition duration-200"
              name="meditation"
              id="meditation"
              value={selectedMeditation}
              onChange={(e) => setSelectedMeditation(e.target.value)}
            >
              <option value="">Select a meditation</option>
              {meditations.map(meditation => (
                <option key={meditation.id} value={meditation.id}>
                  {`${meditation.sound.theme_or_sound_name} - ${Math.floor(meditation.sound.duration)} minutes`}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button
              className="w-full flex justify-center rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-200"
              type="submit"
            >
              Start Session
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default GuidedMeditationForm
