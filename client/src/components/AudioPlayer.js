import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { getToken } from '../lib/auth'

const MeditationAudioPlayer = ({ sessionData, setIsInSession }) => {
  const [soundURL, setSoundURL] = useState(null)
  const audioRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken('access-token')
        const response = await axios.get(`/api/sounds/${sessionData.sound}/`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        setSoundURL(response.data.url)
      } catch (error) {
        console.error('Error fetching sound data:', error)
      }
    }

    fetchData()
  }, [sessionData.sound])

  const handlePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play()
      setIsInSession(true)
    } else {
      audioRef.current.pause()
      setIsInSession(false)
    }
  }

  const handleEnd = () => {
    // make an API call here to update the session
    setIsInSession(false)
  }

  return (
    <div>
      {soundURL && (
        <div>
          <audio ref={audioRef} src={soundURL} onEnded={handleEnd} />
          <button onClick={handlePlayPause}>
            {audioRef.current && audioRef.current.paused ? 'Play' : 'Pause'}
          </button>
        </div>
      )}
    </div>
  )
}

export default MeditationAudioPlayer