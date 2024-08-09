'use client'

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import ICOMarketplaceABI from "../context/icoMarketplace.json"

const ICOMarketplaceAddress = process.env.NEXT_PUBLIC_ICO_MARKETPLACE_ADDRESS;

export default function Home() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [tokens, setTokens] = useState([]);
  const [tokenAddress, setTokenAddress] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    async function loadProvider() {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        const signer = provider.getSigner();
        setSigner(signer);
        const contract = new ethers.Contract(
          ICOMarketplaceAddress,
          ICOMarketplaceABI.abi,
          signer
        );
        setContract(contract);
        const tokens = await contract.getAllTokens();
        setTokens(tokens);
      }
    }
    loadProvider();
  }, []);

  const handleCreateSale = async () => {
    if (contract) {
      await contract.createICOSale(tokenAddress, ethers.utils.parseEther(price));
    }
  };

  const handleBuyToken = async (token) => {
    if (contract) {
      const totalCost = ethers.utils.parseEther((price * amount).toString());
      await contract.buyToken(token.token, amount, { value: totalCost });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">ICO Marketplace</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Token Address"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            className="w-full px-3 py-2 mb-2 border rounded"
          />
          <input
            type="text"
            placeholder="Price in ETH"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 mb-2 border rounded"
          />
          <button
            onClick={handleCreateSale}
            className="w-full px-3 py-2 bg-blue-500 text-white rounded"
          >
            Create ICO Sale
          </button>
        </div>

        <div className="w-full">
          <h2 className="text-xl font-semibold mb-2">Supported Tokens</h2>
          {tokens.map((token, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 mb-2 border rounded"
            >
              <div>
                <p>{token.name}</p>
                <p className="text-sm text-gray-500">{token.symbol}</p>
              </div>
              <input
                type="number"
                placeholder="Amount"
                onChange={(e) => setAmount(e.target.value)}
                className="w-24 px-2 py-1 border rounded"
              />
              <button
                onClick={() => handleBuyToken(token)}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                Buy
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
