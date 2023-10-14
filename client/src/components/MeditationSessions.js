import { useState, useEffect } from 'react'
import { getToken } from '../lib/auth'
import axios from 'axios'



export default function MeditationSessions() {

  const [sessions, setSessions] = useState([])

  useEffect(() => {

    const fetchSessions = async () => {
      try {
        const token = getToken('access-token')
        const response = await axios.get('/api/meditation-sessions/', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setSessions(response.data)
      } catch (error) {
        console.error('Error fetching sessions:', error)
      }
    }
    fetchSessions()
  }, [])

  console.log(sessions)
  const handleEdit = (sessionId) => {
    // Navigate to the edit page for the session with the given ID
    // Alternatively, you can open a modal or any other UI to handle editing
  }

  const handleDelete = async (sessionId) => {
    try {
      const token = getToken('access-token')
      await axios.delete(`/api/meditation-sessions/${sessionId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      // Remove the session from the local state
      const updatedSessions = sessions.filter(session => session.id !== sessionId)
      setSessions(updatedSessions)
    } catch (error) {
      console.error('Error deleting session:', error)
    }
  }


  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">My Meditation Sessions</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the meditations sessions in your account that you have created.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create a session
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Theme
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Duration
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
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.sound.duration}</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a href="#" onClick={() => handleEdit(session.id)} className="text-indigo-600 hover:text-indigo-900">
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
  )
}
