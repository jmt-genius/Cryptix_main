import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

  import {
    Card,
    CardContent,
  } from "@/components/ui/card"
import { H1, H2, Para } from '@/components'
import { VortexWrapper } from '@/newComponents'
  

const page = () => {
  return (
    <VortexWrapper>
        <div className='min-h-screen p-32 flex flex-col gap-8'>
            <div className='flex justify-center items-center'>
                <CarouselDemo />
            </div>
            <div className='flex flex-col gap-4'>
                <H1 otherClasses='text-white' text='Project Name' />
                <H2 otherClasses='text-white' text='Project Description' />
                <Para  otherClasses='text-white' text=" Project Description goes here  Project Description goes here  Project Description goes here  Project Description goes here  Project Description goes here "/>
            </div>
        </div>
    </VortexWrapper>
  )
}

export function CarouselDemo() {
    return (
      <Carousel className="bg-white rounded w-full max-w-xs">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )
  }

export default page