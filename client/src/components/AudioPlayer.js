import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { getToken } from '../lib/auth'
import toast from 'react-hot-toast'

const MeditationAudioPlayer = ({ sessionData, setIsInSession }) => {
  const [soundURL, setSoundURL] = useState(null)
  const [isGuided, setIsGuided] = useState(true)
  const [totalListenedDuration, setTotalListenedDuration] = useState(0)
  const [soundTitle, setSoundTitle] = useState('')
  const audioRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken('access-token')
        const response = await axios.get(`/api/sounds/${sessionData.sound}/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setSoundTitle(response.data.theme_or_sound_name)
        setSoundURL(response.data.sound_file_location)
        setIsGuided(response.data.is_guided)
      } catch (error) {
        console.error('Error fetching sound data:', error)
        toast.error('Unable to find the sound')
      }
    }

    fetchData()
  }, [sessionData.sound])


  const updateSessionDuration = async (listenedDuration) => {
    if (!audioRef.current || !sessionData.id) return

    const duration = listenedDuration / 60
    const sessionId = sessionData.id
    const token = getToken('access-token')

    try {
      const response = await axios.patch(`/api/meditation-sessions/${sessionId}/`,
        { duration_in_minutes: duration },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      toast.success('Sucessfully saved your session')
    } catch (error) {
      console.error('Error updating session duration:', error)
      toast.error('Failed to upload session')
    }
  }

  const handleStop = () => {
    if (audioRef.current) {
      const listenedDuration = audioRef.current.currentTime
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      if (!isGuided) {
        updateSessionDuration(listenedDuration + totalListenedDuration) // Add the total duration for self-guided sessions
      } else {
        updateSessionDuration(listenedDuration)
      }
      setIsInSession(false)
    }
  }

  const handleEnd = () => {
    if (audioRef.current) {
      if (!isGuided) {
        setTotalListenedDuration(prevDuration => prevDuration + audioRef.current.duration)
        audioRef.current.currentTime = 0
        audioRef.current.play()
      } else {
        const fullDuration = audioRef.current.duration
        updateSessionDuration(fullDuration)
        setIsInSession(false)
      }
    }
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      {soundURL && (
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center space-y-4">
          <div className="text-sky-900 text-2xl font-semibold mb-4">{soundTitle}</div>
          <audio ref={audioRef} autoPlay={true} src={soundURL} controlsList="nodownload" controls onEnded={handleEnd} />
          <button className="rounded-md bg-sky-600 hover:bg-sky-500 text-white py-2 px-6 focus:outline-none transition duration-200" onClick={handleStop}>End Session</button>
        </div>
      )}
    </div>
  )
}

export default MeditationAudioPlayer
