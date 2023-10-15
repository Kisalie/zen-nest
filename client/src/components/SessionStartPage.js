import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import GuidedMeditationForm from './GuidedMeditationForm'
import SelfGuidedForm from './SelfGuidedForm'
import 'react-tabs/style/react-tabs.scss'
import { useState } from 'react'
import AudioPlayer from './AudioPlayer'
import Layout from './Layout'

// Insert react tabs:
export default function SessionStartPage() {
  // 1. Meditation sessions --> 2. redirect here with query params --> 3. Check here for query params and if so set state.
  const [isInSession, setIsInSession] = useState(false)
  const [sessionData, setSessionData] = useState({})

  // Add a query parameter for guidedMeditationID=2, if there is one do a useEffect and create a meditation session using:
  // 1. Get the guided meditation
  // 2. Get the sound id from that
  // 3. Create the session --> update isInSession and sessionData

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
