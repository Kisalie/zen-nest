import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import GuidedMeditationForm from './GuidedMeditationForm'
import SelfGuidedForm from './SelfGuidedForm'
import 'react-tabs/style/react-tabs.scss'
import { useState, useEffect } from 'react'
import AudioPlayer from './AudioPlayer'
import Layout from './Layout'
import { getToken } from '../lib/auth'
import axios from 'axios'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import Spinner from './Spinner'
import toast from 'react-hot-toast'

export default function SessionStartPage() {
  const [isInSession, setIsInSession] = useState(false)
  const [sessionData, setSessionData] = useState({})
  const [searchParams, setSearchParams] = useSearchParams()
  const guidedMeditationID = searchParams.get('guidedMeditationID')
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (guidedMeditationID) {
      const fetchGuidedMeditation = async () => {
        try {
          const { data } = await axios.get(`/api/guided-meditations/${parseInt(guidedMeditationID)}/`)
          const token = getToken('access-token')

          if (!data && !data.sound) {
            toast.error('Unable to find or access the right meditation session.')
            throw new Error('Unable to find or access the right meditation session.')
          }

          const payload = {
            sound: data.sound.id,
            duration_in_minutes: 0,
          }

          const sessionResponse = await axios.post('/api/meditation-sessions/', payload, {
            headers: { Authorization: `Bearer ${token}` },
          })
          const newSessionData = sessionResponse.data
          if (newSessionData) {
            setIsInSession(true)
            setSessionData(newSessionData)
            // Remove query parameters from the URL:
            navigate(location.pathname)
          }
        } catch (error) {
          console.error('Error creating meditation session:', error)
          toast.error('Error creating meditation session:')
        }
      }
      fetchGuidedMeditation()
    }
  }, [guidedMeditationID])

  if (guidedMeditationID && !isInSession) {
    return (
      <Layout>
        <Spinner loading={true} color="#005ec2" size={50} />
      </Layout>
    )
  }

  if (isInSession) {
    return (
      <Layout>
        <AudioPlayer sessionData={sessionData} setIsInSession={setIsInSession} />
      </Layout>
    )
  }

  return (
    < Layout>
      <Tabs direction='ltr' className="w-full">
        <TabList className="flex w-full border-b">
          <Tab className="flex-1 text-center py-2 px-4 hover:bg-sky-200 cursor-pointer">Guided Meditation</Tab>
          <Tab className="flex-1 text-center py-2 px-4 hover:bg-sky-200 cursor-pointer">Self Guided Meditation</Tab>
        </TabList>

        <TabPanel>
          <div className='mx-auto max-w-7xl sm:px-6 lg:px-8 py-8 pl-4 sm:py-16 flex justify-center'>
            <GuidedMeditationForm setIsInSession={setIsInSession} setSessionData={setSessionData} />
          </div>

        </TabPanel>
        <TabPanel >
          <div className=' mx-auto max-w-7xl sm:px-6 lg:px-8 py-8 pl-4 sm:py-16 flex justify-center'>
            <SelfGuidedForm setIsInSession={setIsInSession} setSessionData={setSessionData} />
          </div>
        </TabPanel>
      </Tabs>
    </Layout>
  )

}
