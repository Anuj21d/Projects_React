import React from 'react'
import LeftControls from './LeftControls/LeftControls'
import RightControls from './RightControls/RightControls'

const Controls = () => {
  return (
    <div className='flex justify-between items-center py-4 border-b-2 border-neutral-800'>
      <LeftControls />
      <RightControls />
    </div>
  )
}

export default Controls
