import { NavBar } from '@/components'
import React, { ReactNode } from 'react'
import { VortexWrapper } from '@/newComponents'

const layout = ({children}:{children:ReactNode}) => {
  return (
    <div>
        <NavBar />
        <VortexWrapper>
          {children}
        </VortexWrapper>
    </div>
  )
}

export default layout