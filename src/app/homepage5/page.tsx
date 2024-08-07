'use client'

import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { BlackButton, Button, ButtonShimmer, CircularButton, H2, H3, SubHeading, Text } from '@/components';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
  const [loader, setLoader] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("Polygon");
  const [prevChainToken, setPrevChainToken] = useState("MATIC");
  type ChainToken = 'ARB' | 'BTC' | 'BNB' | 'SOL' | 'MATIC';
  const [currentChainToken, setCurrentChainToken] = useState<ChainToken>('MATIC');
  const [multiplier, setMultiplier] = useState({
    "ARB": 0.78,
    "BTC": 0.0000071,
    "BNB": 0.0008329,
    "SOL": 0.0031,
    "MATIC": 1
  });

  const responseVal = [
    { imgURL: "/logoipsum-300.svg", tokenName: "Token - 1", tokenSymbol: "Tk1", price: 100, projectName: "Project-1", id: "proj-1" },
    { imgURL: "/logoipsum-300.svg", tokenName: "Token - 2", tokenSymbol: "Tk2", price: 200, projectName: "Project-2", id: "proj-2" },
    { imgURL: "/logoipsum-300.svg", tokenName: "Token - 1", tokenSymbol: "Tk1", price: 100, projectName: "Project-1", id: "proj-3" },
    { imgURL: "/logoipsum-300.svg", tokenName: "Token - 2", tokenSymbol: "Tk2", price: 200, projectName: "Project-2", id: "proj-4" }
  ];

  const filter = [
    { imageURL: "/cryptoCurrencies/arbitrum.png", name: "Arbitrum", bgColor: "bg-blue-300", borderColor: "border-blue-500", textColor: "white", chainToken: "ARB" },
    { imageURL: "/cryptoCurrencies/btc.png", name: "Bitcoin", bgColor: "bg-orange-300", borderColor: "border-orange-500", textColor: "white", chainToken: "BTC" },
    { imageURL: "/cryptoCurrencies/binance.png", name: "Binance", bgColor: "bg-yellow-200", borderColor: "border-yellow-500", textColor: "white", chainToken: "BNB" },
    { imageURL: "/cryptoCurrencies/solana.png", name: "Solana", bgColor: "bg-teal-200", borderColor: "border-teal-600", textColor: "white", chainToken: "SOL" },
    { imageURL: "/cryptoCurrencies/polygon.png", name: "Polygon", bgColor: "bg-purple-300", borderColor: "border-purple-600", textColor: "white", chainToken: "MATIC" },
  ];

  const walletData = [
    { tokenName: "TkB", price: 200, units: 50 },
    { tokenName: "TkA", price: 3000, units: 2 },
    { tokenName: "TkG", price: 400, units: 10 }
  ];

  const YourTokenData = [
    { tokenName: "TkV", price: 200, units: 10250 },
    { tokenName: "TkJ", price: 3000, units: 22500 },
    { tokenName: "TkT", price: 400, units: 10500 }
  ];

  const fetchConversionRates = async () => {
    try {
      const response = await axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=MATIC,BTC,BNB,SOL,ARB&tsyms=MATIC', {
        headers: {
          'authorization': 'Apikey 17a98f517459d8fb8fb4694b16383ef3f886b73ce2b8b6debd34fb0c05587c59'
        }
      });
      const data = response.data;
      const newMultiplier = {
        "ARB": data.ARB.MATIC,
        "BTC": data.BTC.MATIC,
        "BNB": data.BNB.MATIC,
        "SOL": data.SOL.MATIC,
        "MATIC": data.MATIC.MATIC 
      };
      setMultiplier(newMultiplier);
    } catch (error) {
      console.error('Error fetching conversion rates:', error);
    }
  };

  useEffect(() => {
    fetchConversionRates();
    const interval = setInterval(() => {
      fetchConversionRates();
    }, 60000); // Update every 60 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(()=>{
    console.log('multipler',multiplier)
  },[multiplier])

  return (
    <div className='flex gap-16 mt-10 px-8'>
      <div className='flex flex-col gap-8 w-[55vw]'>
        <div className='flex gap-4 '>
          {filter.map((item, index) => (
            <CircularButton
              key={index}
              prevChainToken={prevChainToken}
              setPrevChainToken={setPrevChainToken}
              currentFilter={currentFilter}
              setCurrentFilter={setCurrentFilter}
              currentChainToken={currentChainToken}
              setCurrentChainToken={setCurrentChainToken}
              imgURL={item.imageURL}
              name={item.name}
              chainToken={item.chainToken}
              bgColor={item.bgColor}
              borderColor={item.borderColor}
              textColor={item.textColor}
            />
          ))}
        </div>
        {responseVal.length > 0 ? (
          <ul className='flex gap-8 justify-between flex-wrap'>
            {responseVal.map((item, index) => (
              <li key={index}>
                <CoinCard
                  src={item.imgURL}
                  tokenName={item.tokenName}
                  tokenSymbol={item.tokenSymbol}
                  price={item.price * (1/multiplier[currentChainToken])}
                  projectName={item.projectName}
                  currentChainToken={currentChainToken}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className='flex flex-col gap-12'>
        <div className='flex flex-col gap-4 '>
          <H2 text="Your Wallet" />
          <WalletCard walletData={walletData} />
        </div>
        <div className='flex flex-col gap-4 '>
          <H2 text="Your Tokens" />
          <TokenCard walletData={YourTokenData} />
        </div>
      </div>
    </div>
  );
};

function CoinCard({ src, tokenName, tokenSymbol, price, projectName, currentChainToken }: { src: string, tokenName: string, tokenSymbol: string, price: number, projectName: string, currentChainToken: string }) {
  return (
    <div className='shadow-xl rounded-xl border-gray-300 border-2 flex gap-2 flex-col p-4'>
      <Image src={src} alt={tokenName} height={100} width={100} />
      <div className='flex flex-col gap-2 px-1 py-2'>
        <SubHeading text={`${tokenName} ${tokenSymbol}`} />
        <Text text={projectName} />
      </div>
      <div className='flex justify-end'>
        <div className='shadow-xl bg-gray-400 rounded p-1'>
          {currentChainToken}-{price.toFixed(4)}
        </div>
      </div>
      <div className='flex gap-4'>
        <ButtonShimmer text="Buy" />
        <Button text='View Project' />
      </div>
    </div>
  );
}

function WalletCard({ walletData }: { walletData: { tokenName: string, price: number, units: number }[] }) {
  return (
    <div className='shadow-xl rounded-xl border-gray-400 border-2 flex-wrap flex gap-2 flex-col p-4'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeader><H3 text="Token Name" /></TableHeader>
            <TableHeader><H3 text="Price (USD)" /></TableHeader>
            <TableHeader><H3 text="Units" /></TableHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {walletData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.tokenName}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.units}</TableCell>
              <TableCell><FontAwesomeIcon icon={faArrowUpRightFromSquare} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function TokenCard({ walletData }: { walletData: { tokenName: string, price: number, units: number }[] }) {
  return (
    <div className='flex gap-4 flex-col  '>
      <div className='shadow-xl rounded-xl border-gray-400 border-2 flex-wrap flex gap-2 flex-col p-4'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeader><H3 text="Token Name" /></TableHeader>
              <TableHeader><H3 text="Price (USD)" /></TableHeader>
              <TableHeader><H3 text="Supply" /></TableHeader>
            </TableRow>
          </TableHeader>
          <TableBody>
            {walletData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.tokenName}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.units}</TableCell>
                <TableCell><FontAwesomeIcon icon={faArrowUpRightFromSquare} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className='flex justify-end'>
        <BlackButton text="Add Token" onClick={() => alert("Token added")} />
      </div>
    </div>
  );
}

export default HomePage;
