'use client'

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { Button, ButtonShimmer, Heading, SubHeading, Text } from '@/components';
import { stringify } from 'querystring';

const HomePage = () => {
  // const [responseVal, setResponseVal] = useState([]);
  const [modalVisible,setModalVisible] = useState(false)

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

  // useEffect(() => {
  //   fetch('https://6667f9c6f53957909ff5fe12.mockapi.io/api/v1/QuizDatabase')
  //     .then((response) => response.json())
  //     .then((data) => setResponseVal(data))
  //     .catch((error) => console.error('Error fetching data:', error));
  // }, []);

  return (
    <div>
      <h1>HomePage</h1>
      <Button text="Add Token" onClick={()=>setModalVisible(!modalVisible)} />
      
      {/* {responseVal.length > 0 ? (
        <ul className='flex gap-8 w-[60vw] flex-wrap'>
          {responseVal.map((item, index) => (
            <li>
                <CoinCard src={item.imgURL} tokenName={item.tokenName} tokenSymbol={item.tokenSymbol} price={item.price} projectName={item.projectName} />    
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )} */}
    </div>
  );
};

function CoinCard({src,tokenName,tokenSymbol,price,projectName}:{src:string,tokenName:string,tokenSymbol:string,price:string,projectName:string}){
  return(
    <div className='shadow-xl rounded-xl border-gray-300 border-2 flex gap-2 flex-col p-4'>
      <Image src={src} alt={tokenName} height={100} width={100} />
      <div className='flex flex-col gap-2 px-1 py-2'>
        <SubHeading text={`${tokenName} ${tokenSymbol}`} />
        <Text text={projectName} />
      </div>
      <div className='flex justify-end'>
        <div className='shadow-xl bg-gray-400 rounded p-1'>
          {price}
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
