import Image from 'next/image'
import React from 'react'

const CircularButton = ({currentFilter,setCurrentFilter,setCurrentToken,imgURL,name,bgColor,borderColor,textColor}:{currentFilter:string,setCurrentFilter:any,setCurrentToken:any,imgURL:string,name:string,bgColor:string,borderColor:string,textColor:string}) => {
  return (
    <div onClick={()=>{
        setCurrentFilter(name)
        setCurrentToken(name)
        }} className={`flex cursor-pointer items-center jjustify-around border-2 text-${textColor} border-${borderColor} bg-${bgColor} ${currentFilter==name && 'bg-gray-300'} px-2 py-1 gap-2  rounded-full`}>
        <Image src={imgURL} alt={name} height={30} width={30} />
        <p>{name}</p>        
    </div>
  )
}

export default CircularButton