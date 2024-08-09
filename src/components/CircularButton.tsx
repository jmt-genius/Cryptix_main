import Image from 'next/image'
import React from 'react'

const CircularButton = ({prevChainToken,setPrevChainToken,currentFilter,setCurrentFilter,currentChainToken,setCurrentChainToken,imgURL,name,chainToken,bgColor,borderColor,textColor}:{prevChainToken:string,setPrevChainToken:any,currentFilter:string,setCurrentFilter:any,currentChainToken:string,setCurrentChainToken:any,imgURL:string,name:string,chainToken:string,bgColor:string,borderColor:string,textColor:string}) => {
  return (
    <div onClick={()=>{
        setCurrentFilter(name)
        setCurrentChainToken(chainToken)
        }} className={`flex cursor-pointer items-center text-black justify-around border-2 px-2 py-1 gap-2  rounded-full ${bgColor} ${currentFilter==name ? 'border-4 border-white p-4' : borderColor } `}>
        <Image src={imgURL} alt={name} height={30} width={30} />
        <p>{name}</p>        
    </div>
  )
}

export default CircularButton