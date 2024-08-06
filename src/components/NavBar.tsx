'use client'

import React,{useState} from 'react'
import Image from 'next/image'
import Input from './Input'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const NavBar = () => {
    const [isUploadMenuVisible, setUploadMenuVisible] = useState(false);

    const toggleUploadMenu = () => setUploadMenuVisible(!isUploadMenuVisible);
    const handleUploadFile = () => {
    console.log('Upload File clicked');
    // Add your logic for uploading a file
      };
  
      const handleUploadPassword = () => {
      console.log('Upload Password clicked');
      // Add your logic for uploading a password
      };

  return (
    <div className='flex justify-between shadow-lg px-8 w-[100vw]'>
        <div>
            <Image src="/logo_cryptix.png" alt='logo' width={150} height={150}/>
        </div>
        <ul className='flex gap-8 items-center justify-end'>
            <li  className=' hover:cursor-pointer hover:bg-gray-100 hover:shadow px-4 py-2 rounded'>Home</li>   
            <li  className=' hover:cursor-pointer hover:bg-gray-100 hover:shadow px-4 py-2 rounded'>Launch ICO</li>
            <li  className=' hover:cursor-pointer hover:bg-gray-100 hover:shadow px-4 py-2 rounded'>Portfolio</li>
            <li  className=' hover:cursor-pointer hover:bg-gray-100 hover:shadow px-4 py-2 rounded'>About Us</li>
            <li><Input type="text" placeholder="Search ICO" /></li>
            <li>
            <Avatar className='cursor-pointer' onClick={toggleUploadMenu}>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            </li>
            {isUploadMenuVisible && (
            <div className='absolute bg-white shadow top-16 p-4 flex flex-col gap-2 items-center justify-center' >
                <button onClick={handleUploadFile} >
                Profile
                </button>
                <hr />
                <button onClick={handleUploadPassword} >
                Log Out
                </button>
            </div>
            )}

        </ul>
    </div>
  )
}

export default NavBar