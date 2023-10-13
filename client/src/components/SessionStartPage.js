import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import GuidedMeditationForm from './GuidedMeditationForm'
import { useState } from 'react'
import AudioPlayer from './AudioPlayer'

// Insert react tabs:
export default function SessionStartPage() {
  const [isInSession, setIsInSession] = useState(false) // after testing change this back to false 
  const [sessionData, setSessionData] = useState({})

  if (isInSession) return <AudioPlayer sessionData={sessionData} setIsInSession={setIsInSession} />

  // TABS TO GO HERE:
  return (<>
    <GuidedMeditationForm setIsInSession={setIsInSession} setSessionData={setSessionData} />
  </>)
}
