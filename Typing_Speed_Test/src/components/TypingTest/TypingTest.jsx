import React, { useContext } from 'react'
import PassageLayer from './PassageLayer/PassageLayer'
import OverlayLayer from './OverlayLayer/OverlayLayer'
import TypingInput from './TypingInput/TypingInput'
import { TestContext } from "/src/context/TestContext/TestContext.jsx"

const TypingTest = () => {
 const { isStarted } = useContext(TestContext);
  return (
    <div className='relative lg:p-4 p-3'>
      <PassageLayer />
      <TypingInput />
      {!isStarted && <OverlayLayer />}
    </div>
  )
}

export default TypingTest
