import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Spinner from './Spinner'


export default function AllMeditations() {
  const [meditations, setMeditations] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/guided-meditations/')
        setMeditations(response.data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching meditations:', error)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    )
  }


  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-3xl mb-6 text-center">All Meditations</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {meditations.map(meditation => (
          <div key={meditation.id} className="border rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <img src={meditation.image_url} alt={meditation.sound.theme_or_sound_name} className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-4">
              <h2 className="text-xl mb-2">{meditation.sound.theme_or_sound_name}</h2>
              <p className="text-gray-600 mb-2">{Math.floor(meditation.sound.duration)} minutes</p>
              <Link to={`/meditation/${meditation.id}`} className="text-blue-500 hover:underline">Learn more</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
