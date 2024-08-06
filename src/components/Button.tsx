import React from 'react'

const Button = ({text,onClick}:{text:string,onClick?:any}) => {
  return (
    <button onClick={onClick} className="px-4 py-2 border-2 rounded-xl border-black hover:bg-black hover:text-white">
        {text}
      </button>
  )
}

export default Button