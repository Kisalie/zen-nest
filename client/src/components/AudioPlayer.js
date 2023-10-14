import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { getToken } from '../lib/auth'

const MeditationAudioPlayer = ({ sessionData, setIsInSession }) => {
  const [soundURL, setSoundURL] = useState(null)
  const [isGuided, setIsGuided] = useState(true)
  const [totalListenedDuration, setTotalListenedDuration] = useState(0)
  const audioRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken('access-token')
        const response = await axios.get(`/api/sounds/${sessionData.sound}/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setSoundURL(response.data.sound_file_location)
        setIsGuided(response.data.is_guided)
      } catch (error) {
        console.error('Error fetching sound data:', error)
      }
    }

    fetchData()
  }, [sessionData.sound])


  const updateSessionDuration = async (listenedDuration) => {
    if (!audioRef.current || !sessionData.id) return // Ensure we have both audio reference and session data

    const duration = listenedDuration / 60
    const sessionId = sessionData.id
    const token = getToken('access-token')

    try {
      console.log()
      const response = await axios.patch(`/api/meditation-sessions/${sessionId}/`,
        { duration_in_minutes: duration },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (response.status === 200) {
        console.log('Session duration updated successfully!')
      } else {
        console.error('Failed to update session duration:', response.data)
      }
    } catch (error) {
      console.error('Error updating session duration:', error)
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
        setTotalListenedDuration(prevDuration => prevDuration + audioRef.current.duration) // Update total listened duration
        audioRef.current.currentTime = 0 // Setting the audio file back to 0 sedcs
        audioRef.current.play() // Re-playing the audio file
      } else {
        const fullDuration = audioRef.current.duration
        updateSessionDuration(fullDuration)
        setIsInSession(false)
      }
    }
  }


  return (
    <div>
      {soundURL && (
        <div>
          <audio ref={audioRef} autoPlay={true} src={soundURL} controls onEnded={handleEnd} />
          <button onClick={handleStop}>Stop</button>
        </div>
      )}
    </div>
  )
}

export default MeditationAudioPlayer
