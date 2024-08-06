'use client'

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { Button, ButtonShimmer, CircularButton, Heading, SubHeading, Text } from '@/components';

const HomePage = () => {
  // const [responseVal, setResponseVal] = useState([]);

  const [currentFilter,setCurrentFilter] =useState("Polygon")
  const [currentChainToken,setCurrentChainToken] = useState("MATIC")

  const responseVal = [
    {
      imgURL:"/logoipsum-300.svg",
      tokenName:"Token - 1",
      tokenSymbol:"Tk1",
      price:"100",
      projectName:"Project-1",
      id:"proj-1"
    },
    {
      imgURL:"/logoipsum-300.svg",
      tokenName:"Token - 2",
      tokenSymbol:"Tk2",
      price:"200",
      projectName:"Project-2",
      id:"proj-2"
    },
    {
      imgURL:"/logoipsum-300.svg",
      tokenName:"Token - 1",
      tokenSymbol:"Tk1",
      price:"100",
      projectName:"Project-1",
      id:"proj-3"
    },
    {
      imgURL:"/logoipsum-300.svg",
      tokenName:"Token - 2",
      tokenSymbol:"Tk2",
      price:"200",
      projectName:"Project-2",
      id:"proj-4"
    }
  ]

  const filter=[
    {
      imageURL:"/arbitrum.png",
      name:"Arbitrum",
      bgColor:"orange-500",
      borderColor:"orange-600",
      textColor:"white",
      chainToken:"ARB"
    },
    {
      imageURL:"/btc.png",
      name:"Bitcoin",
      bgColor:"orange-500",
      borderColor:"orange-600",
      textColor:"white",
      chainToken:"BTC"
    },
    {
      imageURL:"/binance.png",
      name:"Binanace",
      bgColor:"orange-500",
      borderColor:"orange-600",
      textColor:"white",
      chainToken:"BNB"
    },
    {
      imageURL:"/solana.png",
      name:"Solana",
      bgColor:"orange-500",
      borderColor:"orange-600",
      textColor:"white",
      chainToken:"SOL"
    },
    {
      imageURL:"/polygon.png",
      name:"Polygon",
      bgColor:"orange-500",
      borderColor:"orange-600",
      textColor:"white",
      chainToken:"MATIC"
    },
  ]

  // useEffect(() => {
  //   fetch('https://6667f9c6f53957909ff5fe12.mockapi.io/api/v1/QuizDatabase')
  //     .then((response) => response.json())
  //     .then((data) => setResponseVal(data))
  //     .catch((error) => console.error('Error fetching data:', error));
  // }, []);

  return (
    <div className='flex flex-col gap-8 mt-10 px-8'>
      <div className='flex gap-4'>
        {filter.map((item,index)=>{
          return(
            <CircularButton currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} setCurrentChainToken={setCurrentChainToken} key={index} imgURL={item.imageURL} name={item.name} chainToken={item.chainToken} bgColor={item.bgColor} borderColor={item.borderColor} textColor={item.textColor}/>
          )
        })}
      </div>     
      {responseVal.length > 0 ? (
        <ul className='flex gap-8 w-[60vw] flex-wrap'>
          {responseVal.map((item, index) => (
            <li>
                <CoinCard src={item.imgURL} tokenName={item.tokenName} tokenSymbol={item.tokenSymbol} price={item.price} projectName={item.projectName} currentChainToken={currentChainToken}/>    
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

function CoinCard({src,tokenName,tokenSymbol,price,projectName,currentChainToken}:{src:string,tokenName:string,tokenSymbol:string,price:string,projectName:string,currentChainToken:string}){
  return(
    <div className='shadow-xl rounded-xl border-gray-300 border-2 flex-wrap flex gap-2 flex-col p-4'>
      <Image src={src} alt={tokenName} height={100} width={100} />
      <div className='flex flex-col gap-2 px-1 py-2'>
        <SubHeading text={`${tokenName} ${tokenSymbol}`} />
        <Text text={projectName} />
      </div>
      <div className='flex justify-end'>
        <div className='shadow-xl bg-gray-400 rounded p-1'>
          {currentChainToken}-{price}
        </div>
      </div>
      <div className='flex gap-4'>
        <ButtonShimmer text="Buy" />
        <Button text='View Project' />
      </div>
    </div>
  )
}


export default HomePage;
