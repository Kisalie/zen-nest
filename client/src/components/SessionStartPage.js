import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import GuidedMeditationForm from './GuidedMeditationForm'
import { useState } from 'react'

// Insert react tabs:
export default function SessionStartPage() {
  const [isInSession, setIsInSession] = useState(true) // after testing change this back to false 
  const [sessionData, setSessionData] = useState({ // after testing change this back to {}
    'id': 18,
    'duration_in_minutes': 0,
    'sound': 19,
  })

  if (isInSession) return <>Player To Go Here!</>

  // TABS TO GO HERE:
  return (<>
    <GuidedMeditationForm setIsInSession={setIsInSession} setSessionData={setSessionData} />
  </>)
}
