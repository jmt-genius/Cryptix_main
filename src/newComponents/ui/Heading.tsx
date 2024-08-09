import React from 'react'

const Heading = ({text}:{text:String}) => {
  return (
    <p className="m-2 p-2 text-center text-3xl sm:text-5xl md:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 ">
        {text}
    </p>
  )
}

export default Heading