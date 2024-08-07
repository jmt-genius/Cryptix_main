'use client'

import React,{useState,useEffect} from 'react'
import { useStateContext } from '../context';
import { toast } from 'react-toastify';

const page = () => {

  const { widthdrawToken, 
    transferTokens, 
    buyToken, 
    createICOSALE, 
    GET_ALL_USER_ICOSALE_TOKEN, 
    GET_ALL_ICOSALE_TOKEN,
    createERC20,
    connectWallet,
    PINATA_API_KEY,
    PINATA_SECRECT_KEY,
    ICO_MARKETPLACE_ADDRESS,
    openBuyToken,
    setOpenBuyToken,
    openWidthdraw, 
    setOpenWidthdrawToken,
    openTransferToken, 
    setOpenTransferToken,
    openTokenCreator, 
    setOpenTokenCreator,
    openCreateICO, 
    setOpenCreateICO,
    address, 
    setAddress,
    accountBalance,
    loader, 
    setLoader,
    currency,
    shortenAddress,
  } = useStateContext();

  const notifySuccess = (msg:string) => toast.success(msg);
  const notifyError = (msg:string) => toast.error(msg);

  const [allICOs, setAllICOs] = useState();
  const [allUserIcos, setAllUserIcos] = useState();

  //COMPONENT OPEN
  const [openAllICO, setOpenAllICO] = useState(false);
  const [openTokenHistory, setOpenTokenHistory] = useState(false);
  const [openICOMarketplace, setOpenICOMarketplace] = useState(false);

  //BUY ICO TOKEN
  const [buyIco, setBuyIco] = useState();

  const copyAddress = () => {
    navigator.clipboard.writeText(ICO_MARKETPLACE_ADDRESS);
    notifySuccess("Copied Succesfully");
  };

  return (
    <div>
       {/* <Header accountBalance={accountBalance}
    setAddress={setAddress} 
    address={address}
    connectWallet={connectWallet}
    ICO_MARKETPLACE_ADDRESS={ICO_MARKETPLACE_ADDRESS}
    shortenAddress={shortenAddress}
    setOpenAllICO={setOpenAllICO}
    openAllICO={openAllICO}
    setOpenTokenCreator={setOpenTokenCreator}
    openTokenCreator={openTokenCreator}
    setOpenTokenHistory={setOpenTokenHistory}
    openTokenHistory={openTokenHistory}
    setOpenICOMarketplace={setOpenICOMarketplace}
    openICOMarketplace={openICOMarketplace}
    /> */}
     {/* {openAllICO && <ICOMarket />}
    {openTokenCreator && (
      <TokenCreator 
      createERC20={createERC20} 
      shortenAddress={shortenAddress}
      setOpenTokenCreator={setOpenTokenCreator}
      setLoader={setLoader}
      address={address}
      connectWallet={connectWallet}
      PINATA_AIP_KEY={PINATA_API_KEY}
      PINATA_SECRECT_KEY={PINATA_SECRECT_KEY}
      />
    )
  }
    {openTokenHistory && <TokenHistory shortenAddress={shortenAddress} setOpenTokenHistory={setOpenTokenHistory} />}
    {openCreateICO && <CreateICO />}
    {openICOMarketplace && <Marketplace />}
    {openBuyToken && <BuyToken />}
    {openTransferToken && <TokenTransfer />}
    {openWidthdraw && <WidthdrawToken />} */}
    {/* {loader && <Loader />} */}
    <Loader />
    
    </div>
  )
}


function Header({ accountBalance, setAddress, address, connectWallet, ICO_MARKETPLACE_ADDRESS, shortenAddress, setOpenAllICO, openAllICO, setOpenTokenCreator, openTokenCreator, setOpenTokenHistory, openTokenHistory, setOpenICOMarketplace, openICOMarketplace }:{accountBalance:any, setAddress:any, address:any, connectWallet:any, ICO_MARKETPLACE_ADDRESS:any, shortenAddress:any, setOpenAllICO:any, openAllICO:any, setOpenTokenCreator:any, openTokenCreator:any, setOpenTokenHistory:any, openTokenHistory:any, setOpenICOMarketplace:any, openICOMarketplace:any}) {
  return (
    <div>
      <h1>Heading</h1>
    </div>
  )
}

function Loader(){
  return (
    <div className='flex justify-center'>
      <h1 className=' animate-spin border-dashed rounded-full p-2 border-black border-2 '>.</h1>
    </div>
  )
}

export default page