import { NavBar } from '@/components'
import React, { ReactNode } from 'react'

const layout = ({children}:{children:ReactNode}) => {
  return (
    <div>
        {/* <NavBar /> */}
        {children}
    </div>
  )
}

export default layout