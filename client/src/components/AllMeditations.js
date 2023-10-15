import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
// import axiosAuth as axios from '../lib/axios'


import Spinner from './Spinner'
import toast from 'react-hot-toast'
import { capitalizeFirstLetter } from '../lib/helpers'

export default function AllMeditations() {
  const [meditations, setMeditations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const coloursObject = {
    sleep: {
      low: 'bg-blue-100',
      medium: 'bg-blue-200',
      high: 'bg-blue-300',
    },
    mindfulness: {
      low: 'bg-pink-100',
      medium: 'bg-pink-200',
      high: 'bg-pink-300',
    },
    focus: {
      low: 'bg-emerald-50',
      medium: 'bg-emerald-100',
      high: 'bg-emerald-200',
    },
    'stress relief': {
      low: 'bg-indigo-100',
      medium: 'bg-indigo-200',
      high: 'bg-indigo-300',
    },
    'deep relaxation': {
      low: 'bg-purple-100',
      medium: 'bg-purple-200',
      high: 'bg-purple-300',
    },
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/guided-meditations/')
        setMeditations(response.data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching meditations:', error)
        toast.error('Error fetching meditations:')
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className='min-h-screen'>
        <Spinner loading={true} />
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-8">
      <h1 className="mt-6 text-center text-3xl font-bold leading-9 tracking-tight text-sky-900">All Meditations</h1>
      <p className='text-lg text-center text-sky-800 my-8'>The darker the colour, the more intense the meditation session is!</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {meditations.map(meditation => (
          <Link
            to={`/session?guidedMeditationID=${meditation.id}`}
            key={meditation.id} >
            <div
              className={`border rounded-lg shadow-md hover:shadow-xl transition duration-300 ${coloursObject[meditation.sound.theme_or_sound_name.toLowerCase()][meditation.intensity]}`}>
              <div className="p-4">
                <h2 className="text-xl mb-2">{meditation.sound.theme_or_sound_name}</h2>
                <p className="text-gray-600 mb-2">Duration: {Math.floor(meditation.sound.duration)} minutes</p>
                <div>Intensity: {capitalizeFirstLetter(meditation.intensity)}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
