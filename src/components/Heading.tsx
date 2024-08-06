import React from 'react'

const Heading = ({text}:{text:string}) => {
  return (
    <div className='font-extrabold text-4xl'>
        {text}
    </div>
  )
}

export default Heading