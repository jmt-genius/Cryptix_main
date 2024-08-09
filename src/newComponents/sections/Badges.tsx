import React from 'react'
import { PinContainer } from '../ui'
import VortexWrapper from '../VortexWrapper';
import { badgesData } from '@/data';
import Image from 'next/image';

const Badges = () => {
  return (
    <VortexWrapper>
        <div className='flex justify-center flex-wrap'>
            {badgesData.map(({href,name,description,fileName},index)=>{
                return(
                    <div key={index} className=" flex items-center m-2 justify-center ">
                        <PinContainer
                            title="/Verify"
                            href={href}
                            className='bg-black-100'
                        >
                            <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[auto] ">
                                <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                                    {name}
                                </h3>
                                <div className="text-base !m-0 !p-0 font-normal">
                                    <span className="text-slate-500 ">
                                    {description}
                                    </span>
                                </div>
                                <div className="flex flex-1 w-full justify-center rounded-lg mt-4" >
                                    <Image width={250} height={300} src={`/badges/${fileName}`} alt={name} />
                                </div>
                            </div>
                        </PinContainer>
                    </div>
                )
            })}
        </div>
    </VortexWrapper>
  )
}

export default Badges