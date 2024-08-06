'use client'

import React from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import { toast } from 'react-toastify'

import { 
    ERC20Generator, 
    ERC20Generator_BYTECODE, 
    handleNetworkSwitch, 
    shortenAddress,
    ICO_MARKETPLACE_ADDRESS,
    ICO_MARKETPLACE_CONTRACT,
    TOKEN_CONTRACT,
    PINATA_API_KEY,
    PINATA_SECRECT_KEY,
    ERC20Generator_ABI,
} from "../../context/constants"

const page = () => {
    const notify = () => toast("Wow so easy!");

  return (
    <div>
        <button onClick={notify}>Notify!</button>
    </div>
  )
}

export default page