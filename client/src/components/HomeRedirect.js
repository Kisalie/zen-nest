import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function HomeRedirect() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/register')
  }, [navigate])
  return null
}