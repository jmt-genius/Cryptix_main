'use client'

import React from 'react'
import {TypewriterEffectSmooth, MagicButton, Heading, Spotlight} from "../ui";
import { FaLocationArrow } from 'react-icons/fa6';
import VortexWrapper from '../VortexWrapper';
import { useRouter } from 'next/navigation'

const Hero = () => {
  const router = useRouter()

    const words = [
        {
          text: "Create,",
          className: " text-white",
        },
        {
          text: "Buy &",
            className: " text-white",
        },
        {
          text: "Sell",
            className: " text-white",
        },
        {
          text: "Tokens!",
          className: " text-blue-500",
        },
      ];


  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center text-white' >
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20 h-screen"
        fill="white"
      />
       <Spotlight
        className="-top-40 left-0  md:left-40 md:-top-10 h-screen"
        fill="blue"
      />
      <VortexWrapper>
        {/* Grid Backgorund */}
        <div className="w-full absolute h-screen  bg-grid-white/[0.03] flex items-center justify-center">
          {/* Radial gradient for the container to give a faded look */}
        </div>

        <div className='h-screen flex justify-center flex-col items-center'>
          <img className='animate-bounce w-[20%]' src="/bllogo.svg" />
          <Heading text={"Empowering Secure, Cross-Chain ICOs"}/>

          {/* Typewriter Animation */}
          <TypewriterEffectSmooth words={words} className='flex items-baseline '/>

          <p className='text-xs md:text-xl'>Revolutionising Indian ICO Marketplace!</p>


          <a href='#about' onClick={()=>{
            router.push('/anonaadhar', { scroll: false })
          }}>
              <MagicButton text="Get Started" icon={<FaLocationArrow />} position={"right"} otherClasses={"flex gap-4"}/>
          </a>
          
        </div>
      </VortexWrapper>
    </div>
  )
}

export default Hero