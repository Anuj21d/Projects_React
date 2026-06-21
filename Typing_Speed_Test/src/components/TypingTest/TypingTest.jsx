import { useContext } from 'react'
import PassageLayer from './PassageLayer/PassageLayer'
import OverlayLayer from './OverlayLayer/OverlayLayer'
import TypingInput from './TypingInput/TypingInput'
import { TestContext } from "/src/context/TestContext/test-context.js"

const TypingTest = () => {
 const { isStarted } = useContext(TestContext);
  return (
    <div className='relative lg:p-4 p-3 h-full'>
      <PassageLayer />
      <TypingInput />
      {!isStarted && <OverlayLayer />}
    </div>
  )
}

export default TypingTest
