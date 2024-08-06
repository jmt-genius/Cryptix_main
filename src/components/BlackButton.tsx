import React from 'react'

const BlackButton = ({text,onClick}:{text:string,onClick?:any}) => {
  return (
    <button onClick={onClick} className="px-4 py-2 border-2 rounded-xl border-black bg-black text-white hover:bg-white hover:text-black">
        {text}
      </button>
  )
}

export default BlackButton