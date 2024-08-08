'use client'

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { Button, ButtonShimmer, CircularButton, Heading, SubHeading, Text } from '@/components';

const HomePage4 = () => {
  const [loader, setLoader] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("Polygon");
  const [prevChainToken, setPrevChainToken] = useState("MATIC");
  type ChainToken = 'ARB' | 'BTC' | 'BNB' | 'SOL' | 'MATIC';
  const [currentChainToken, setCurrentChainToken] = useState<ChainToken>('MATIC');
    const [multiplier, setMultiplier] = useState({
    "ARB": 0.78,
    "BTC": 0.0000071,
    "BNB": 0.0008329,
    "SOL": 0.0031,
    "MATIC": 1
  });
  const responseVal =[
    { imgURL: "/logoipsum-300.svg", tokenName: "Token - 1", tokenSymbol: "Tk1", price: 100, projectName: "Project-1", id: "proj-1" },
    { imgURL: "/logoipsum-300.svg", tokenName: "Token - 2", tokenSymbol: "Tk2", price: 200, projectName: "Project-2", id: "proj-2" },
    { imgURL: "/logoipsum-300.svg", tokenName: "Token - 1", tokenSymbol: "Tk1", price: 100, projectName: "Project-1", id: "proj-3" },
    { imgURL: "/logoipsum-300.svg", tokenName: "Token - 2", tokenSymbol: "Tk2", price: 200, projectName: "Project-2", id: "proj-4" }
  ]

  const filter = [
    { imageURL: "/arbitrum.png", name: "Arbitrum", bgColor: "orange-500", borderColor: "orange-600", textColor: "white", chainToken: "ARB" },
    { imageURL: "/btc.png", name: "Bitcoin", bgColor: "orange-500", borderColor: "orange-600", textColor: "white", chainToken: "BTC" },
    { imageURL: "/binance.png", name: "Binance", bgColor: "orange-500", borderColor: "orange-600", textColor: "white", chainToken: "BNB" },
    { imageURL: "/solana.png", name: "Solana", bgColor: "orange-500", borderColor: "orange-600", textColor: "white", chainToken: "SOL" },
    { imageURL: "/polygon.png", name: "Polygon", bgColor: "orange-500", borderColor: "orange-600", textColor: "white", chainToken: "MATIC" },
  ];

  return (
    <div className='flex flex-col gap-8 mt-10 px-8'>
      <div className='flex justify-center w-full'>
        <Carousel infiniteLoop>
          <CarouselContent>
            {responseVal.map((item, index) => (
              <CarouselItem key={index}>
                <div className='w-[9vw] h-[60vh] relative'>
                  <Image src={item.imgURL} alt={item.tokenName} fill objectFit="cover" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default HomePage4;