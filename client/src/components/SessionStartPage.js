import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import GuidedMeditationForm from './GuidedMeditationForm'
import { useState } from 'react'

// Insert react tabs:
export default function SessionStartPage() {
  const [isInSession, setIsInSession] = useState(false)
  const [sessionData, setSessionData] = useState({})


  if (isInSession) return <>Player To Go Here!</>

  // TABS TO GO HERE:
  return (<>
    <GuidedMeditationForm setIsInSession={setIsInSession} setSessionData={setSessionData} />
  </>)

}
