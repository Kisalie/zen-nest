import { useState, useEffect } from 'react'
import { getToken } from '../lib/auth'
import axios from '../lib/axios'
import EditModal from '../components/EditModal'
import { useNavigate } from 'react-router-dom'
import Layout from './Layout'
import Spinner from './Spinner'
import toast from 'react-hot-toast'

export default function MeditationSessions() {

  const [sessions, setSessions] = useState([])
  const [singleSession, setSingleSession] = useState({})
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {

    const fetchSessions = async () => {
      try {
        const response = await axios.get('/api/meditation-sessions/')
        setSessions(response.data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching sessions:', error)
        toast.error('Unable to fetch your previous meditation sessions')
        setIsLoading(false)
      }
    }
    fetchSessions()
  }, [open])

  const handleEdit = (sessionId) => {
    setSingleSession(
      sessions.filter(session => session.id === sessionId)[0]
    )
    setOpen(true)
  }

  const handleDelete = async (sessionId) => {
    try {
      const token = getToken('access-token')
      await axios.delete(`/api/meditation-sessions/${sessionId}/`)
      // Remove the session from the local state
      const updatedSessions = sessions.filter(session => session.id !== sessionId)
      toast.success('Session Deleted!')
      setSessions(updatedSessions)
    } catch (error) {
      console.error('Error deleting session:', error)
      toast.error('Failed to delete your meditation session')
    }
  }

  return (
    <>
      <Layout>
        <EditModal open={open} setOpen={setOpen} singleSession={singleSession} />
        {isLoading ? (
          <div className='flex justify-center'>
            <Spinner loading={true} color="#005ec2" size={50} />
          </div>
        ) : (
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-sky-900">My Meditation Sessions</h1>
                <p className="mt-2 text-sm text-gray-700">
                  {
                    sessions.length > 0 ? <>You have currently completed {sessions.length} sessions. Well done!</> : <>You currently do not have any meditation sessions. You should create one! </>
                  }
                </p>
              </div>
              <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button
                  type="button"
                  onClick={() => {
                    navigate('/session')
                  }}
                  className="w-full flex justify-center rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-200"
                >
                  Create Session
                </button>
              </div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-sky-900 sm:pl-0">
                          Theme
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-sky-900">
                          Duration In Minutes
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {sessions.map((session) => (
                        <tr key={session.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {session.sound.theme_or_sound_name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{parseFloat(session.duration_in_minutes).toFixed(2)}</td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <a href="#" onClick={() => handleEdit(session.id)} className="text-sky-900 hover:text-sky-700">
                              Edit
                            </a>
                            <span> | </span>
                            <a href="#" onClick={() => handleDelete(session.id)} className="text-red-600 hover:text-red-900">
                              Delete
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </>

  )
}
