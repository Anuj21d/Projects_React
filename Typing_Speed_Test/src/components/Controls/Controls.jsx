import React from 'react'
import LeftControls from './LeftControls/LeftControls'
import RightControls from './RightControls/RightControls'

const Controls = () => {
  return (
    <div className='flex justify-between items-center py-4 border-b border-neutral-600'>
      <LeftControls />
      <RightControls />
    </div>
  )
}

export default Controls
