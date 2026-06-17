import React from 'react'
import PassageLayer from './PassageLayer/PassageLayer'
import OverlayLayer from './OverlayLayer/OverlayLayer'

const TypingTest = () => {
  return (
    <div className='relative p-4'>
      <PassageLayer />
      <OverlayLayer />
    </div>
  )
}

export default TypingTest
