'use client'

import React,{useState} from 'react'
import Image from 'next/image'
import Input from './Input'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Heading from './Heading'
import Button from './Button'
import { H1 } from './H1'
import { Para } from './Para'
import { useRouter } from 'next/navigation'

const NavBar = () => {
    const [isUploadMenuVisible, setUploadMenuVisible] = useState(false);
    const [modalVisible,setModalVisible] = useState(false)
    const router=useRouter()

    const toggleUploadMenu = () => setUploadMenuVisible(!isUploadMenuVisible);
    const handleUploadFile = () => {
    console.log('Upload File clicked');
    // Add your logic for uploading a file
      };
  
      const handleLogOut = () => {
        console.log('Upload Password clicked');
        localStorage.removeItem('walletAddress')
        router.push('/')
      // Add your logic for uploading a password
      };

  return (
    <div className='w-screen flex text-white py-4 bg-black border-b-white-200 border-b-2 justify-between shadow-lg px-8'>
            {/* <Image src="/logo_cryptix.png" alt='logo' width={150} height={150}/> */}
            <H1 text='Cryptix' />
        <ul className='flex gap-8 items-center justify-end'>
            <li  className=' hover:cursor-pointer hover:bg-gray-600 hover:shadow px-4 py-2 rounded'>Home</li>   
            <li  className=' hover:cursor-pointer hover:bg-gray-600 hover:shadow px-4 py-2 rounded'>Launch ICO</li>
            <li  className=' hover:cursor-pointer hover:bg-gray-600 hover:shadow px-4 py-2 rounded'>Portfolio</li>
            <li  className=' hover:cursor-pointer hover:bg-gray-600 hover:shadow px-4 py-2 rounded'>About Us</li>

            <li><Input type="text" placeholder="Search ICO" /></li>
            <li>
            <Avatar className='cursor-pointer' onClick={toggleUploadMenu}>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            </li>
            {isUploadMenuVisible && (
            <div className='absolute z-50 bg-black-200  shadow top-16 p-4 flex flex-col gap-2 items-center justify-center' >
                <Para text={`Welcome ${localStorage.getItem("walletAddress")}`} />
                <button onClick={handleUploadFile} >
                Profile
                </button>
                <hr />
                <button onClick={handleLogOut} >
                Log Out
                </button>
            </div>
            )}

        </ul>
    </div>
  )
}

export default NavBar