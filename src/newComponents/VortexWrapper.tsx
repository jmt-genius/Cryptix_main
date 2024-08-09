'use client'

import React, { ReactNode } from 'react'
import {Vortex} from "./ui";

const VortexWrapper = ({children, otherClasses}:{children:ReactNode,otherClasses?:string}) => {
  return (
    <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={100}
        baseHue={220}
        className={`min-h-screen ${otherClasses}`}
    >
        {children}
    </Vortex>
  )
}

export default VortexWrapper