"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { ethers } from 'ethers';
import styles from './HomePage.module.css'; // Adjust the path as necessary

// You can replace this with the actual path to your logo
// import logo from '../../public/assets/logo.svg';

const HomePage: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // const connectWallet = async () => {
  //   if ((window as any).ethereum) {
  //     try {
  //       const provider = new ethers.BrowserProvider((window as any).ethereum);
  //       await provider.send("eth_requestAccounts", []);
  //       const signer = await provider.getSigner();
  //       const address = await signer.getAddress();
  //       console.log(`Connected wallet address: ${address}`);
  //       setWalletAddress(address);
  //     } catch (error) {
  //       console.error("User denied account access or error occurred", error);
  //     }
  //   } else {
  //     alert("MetaMask is not installed. Please install it to use this app.");
  //   }
  // };

  return (
    <div className={styles.container}>
      {/* <Image src={logo} alt="Logo" width={500} height={250} className={styles.logo} /> */}
      <div className={styles.taglineContainer}>
        <h1 className={styles.taglineBold}>
          Empowering Secure, Cross-Chain ICOs
        </h1>
        <h2 className={styles.taglineRegular}>
          with Advanced Blockchain Technology
        </h2>
      </div>
      {/* <div className={styles.buttonContainer}>
        {walletAddress ? (
          <p>Connected: {walletAddress}</p>
        ) : (
          <button onClick={connectWallet} className={styles.button}>
            Connect Wallet
          </button>
        )}
      </div> */}
      <div>Lol</div>
    </div>
  );
};

export default HomePage;