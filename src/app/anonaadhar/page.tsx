"use client";
import {
  AnonAadhaarProof,
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  useProver,
} from "@anon-aadhaar/react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Image from "next/image";
import logo from "../../../public/assets/logo.svg"; // Adjust the path if necessary
import { VortexWrapper } from "@/newComponents";
import { useRouter } from "next/navigation";
import { H1, H2 } from "@/components";

type HomeProps = {
  setUseTestAadhaar: (state: boolean) => true;
  useTestAadhaar: boolean;
};

declare global {
  interface Window {
    ethereum: any;
  }
}

export default function Home({ setUseTestAadhaar, useTestAadhaar }: HomeProps) {
const router =useRouter()

  const [anonAadhaar] = useAnonAadhaar();
  const [, latestProof] = useProver();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(()=>{
    console.log(walletAddress)
    localStorage.setItem('walletAddress', walletAddress || '')
  },[walletAddress])

  useEffect(() => {
    if (anonAadhaar.status === "logged-in") {
      console.log(anonAadhaar.status);
      if(walletAddress){
        router.push('/homepage')
      }
    }
  }, [anonAadhaar,walletAddress]);

  const switchAadhaar = () => {
    setUseTestAadhaar(!useTestAadhaar);
  };

  const connectMetaMask = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error("MetaMask connection error:", error);
      }
    } else {
      console.error("MetaMask is not installed");
    }
  };

  return (
    <div>
      <VortexWrapper>
        <section id="home" className="h-screen w-screen flex z-10 p-16 justify-center items-center">
        <div className="flex flex-col gap-8">
          <main className=" flex flex-col items-center gap-8 bg-white rounded-2xl max-w-screen-sm mx-auto  p-8">
            <Image src={logo} alt="Cryptix logo" width={150} height={150} />
            {anonAadhaar.status != "logged-in" &&
            <H2 otherClasses="text-center" text="Prove your Identity anonymously using your Aadhaar card." />
            }
            {anonAadhaar.status == "logged-in" &&
            <H2 otherClasses="text-center" text="Prove your Identity anonymously using your Aadhaar card." />
            }
            <LogInWithAnonAadhaar nullifierSeed={1234} />
          </main>
          {anonAadhaar.status === "logged-in" && (
            <div className="flex flex-col items-center gap-4 rounded-2xl max-w-screen-sm mx-auto p-8 shadow-lg bg-white mb-8">
              <>
              <H1 text="✅ Proof is valid" />
              <H2 text="Continue with step two 😁" />
                {/* {latestProof && (
                  <AnonAadhaarProof
                    code={JSON.stringify(
                      typeof latestProof === "string"
                        ? JSON.parse(latestProof)
                        : latestProof,
                      null,
                      2
                    )}
                  />
                )} */}
              </>
            </div>
          )}
        </div>
        {anonAadhaar.status === "logged-in" && (
          <div className="flex flex-col items-center gap-8 rounded-2xl max-w-screen-sm mx-auto p-8 shadow-lg bg-white">
            <div className="flex flex-col items-center gap-4 rounded-2xl max-w-screen-sm mx-auto p-8 shadow-lg bg-white mb-8">
              <>
              <H1 otherClasses="text-center" text="Sign Up with metamask!" />
              <H2 text="Connect Your Metamask 👉" />
              </>
            </div>
            <button
              onClick={connectMetaMask}
              type="button"
              className="rounded bg-blue-500 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-blue-600"
            >
              Connect MetaMask
            </button>
            {walletAddress && (
              <p className="mt-4 rounded bg-green-100 px-4 py-2 text-sm font-semibold text-green-800 shadow-sm">
                Connected Wallet: {walletAddress}
              </p>
            )}
          </div>
        )}
        
      </section>
      </VortexWrapper>
      
    </div>
  );
}
