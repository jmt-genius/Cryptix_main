import React, { ReactNode } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const layout = ({children}:{children:ReactNode}) => {
  return (
    <div>
        <ToastContainer />
        {children}
    </div>
  )
}

export default layout