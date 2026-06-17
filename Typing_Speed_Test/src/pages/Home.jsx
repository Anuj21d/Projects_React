import React from 'react'
import Controls from '../components/Controls/Controls'
import TypingTest from '../components/TypingTest/TypingTest'
import ResetButton from '../components/TypingTest/PassageLayer/ResetButton'

const Home = () => {
  return (
    <div>
      <Controls />
      <TypingTest />
      <ResetButton />
    </div>
  )
}

export default Home
