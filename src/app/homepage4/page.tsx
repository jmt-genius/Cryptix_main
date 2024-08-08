'use client'

import Image from 'next/image';
import React, { useState } from 'react';
import { H1, H3, H4, Para } from '@/components';

const HomePage4 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const filter = [
    { imageURL: "/cryptoCurrencies/arbitrum.png", name: "Arbitrum", bgColor: "orange-500", borderColor: "orange-600", textColor: "white", chainToken: "ARB" },
    { imageURL: "/cryptoCurrencies/btc.png", name: "Bitcoin", bgColor: "orange-500", borderColor: "orange-600", textColor: "white", chainToken: "BTC" },
    { imageURL: "/cryptoCurrencies/binance.png", name: "Binance", bgColor: "orange-500", borderColor: "orange-600", textColor: "white", chainToken: "BNB" },
    { imageURL: "/cryptoCurrencies/solana.png", name: "Solana", bgColor: "orange-500", borderColor: "orange-600", textColor: "white", chainToken: "SOL" },
    { imageURL: "/cryptoCurrencies/polygon.png", name: "Polygon", bgColor: "orange-500", borderColor: "orange-600", textColor: "white", chainToken: "MATIC" },
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filter.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + filter.length) % filter.length);
  };

  return (
    <div className='flex flex-col gap-8 mt-10 px-8 items-center'>
      <H1 text="Project Description" />
      <H3 text="Here is a detailed description of the project. It includes various aspects and functionalities that are covered in this project." />
      <div className='flex justify-center w-full relative'>
        <div className='flex items-center justify-center relative'>
          <button onClick={handlePrevious} className='absolute left-4'>
            <svg width="24" height="24" fill="currentColor" className="text-gray-500 hover:text-gray-700">
              <path fillRule="evenodd" d="M15.707 19.707a1 1 0 01-1.414 0L7.293 12l7.293-7.707a1 1 0 011.414 1.414L10.414 12l5.293 5.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <div className='h-[40vh] w-[40vw] relative mx-auto'>
            <Image src={filter[currentIndex].imageURL} alt={filter[currentIndex].name} layout="fill" objectFit="contain" />
          </div>
          <button onClick={handleNext} className='absolute right-4'>
            <svg width="24" height="24" fill="currentColor" className="text-gray-500 hover:text-gray-700">
              <path fillRule="evenodd" d="M8.293 4.293a1 1 0 011.414 0L17.707 12l-7.293 7.707a1 1 0 01-1.414-1.414L13.586 12 8.293 6.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      <H4 text={filter[currentIndex].name} />
      <Para text="This project aims to revolutionize the way we think about blockchain and cryptocurrency. The detailed description above covers various functionalities and aspects of the project, making it a comprehensive solution in the crypto world." />
    </div>
  );
};

export default HomePage4;
