import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import GuidedMeditationForm from './GuidedMeditationForm'
import SelfGuidedForm from './SelfGuidedForm'
import 'react-tabs/style/react-tabs.scss'
import { useState } from 'react'
import AudioPlayer from './AudioPlayer'

// Insert react tabs:
export default function SessionStartPage() {
  // 1. Meditation sessions --> 2. redirect here with query params --> 3. Check here for query params and if so set state.
  const [isInSession, setIsInSession] = useState(false)
  const [sessionData, setSessionData] = useState({})

  if (isInSession) return <AudioPlayer sessionData={sessionData} setIsInSession={setIsInSession} />

  return (
    <Tabs direction='ltr' className="w-full">
      <TabList className="flex w-full border-b">
        <Tab className="flex-1 text-center py-2 px-4 hover:bg-gray-200 cursor-pointer">Guided Meditation</Tab>
        <Tab className="flex-1 text-center py-2 px-4 hover:bg-gray-200 cursor-pointer">Self Guided Meditation</Tab>
      </TabList>

      <TabPanel>
        <div className='py-8 pl-4 sm:py-16'>
          <GuidedMeditationForm setIsInSession={setIsInSession} setSessionData={setSessionData} />
        </div>

      </TabPanel>
      <TabPanel >
        <div className='py-8 pl-4 sm:py-16'>
          <SelfGuidedForm setIsInSession={setIsInSession} setSessionData={setSessionData} />
        </div>
      </TabPanel>
    </Tabs>
  )

}
