import { ethers } from "ethers";
// import { Web3Modal } from "web3modal";
import Web3Modal from "web3modal";
import ERC20Generator from "./ERC20Generator.json";
import icoMarketPlace from "./icoMarketplace.json";

export const ERC20Generator_ABI = ERC20Generator.abi;
export const ERC20Generator_BYTE_CODE = ERC20Generator.bytecode;

export const ICO_MARKETPLACE_ADDRESS =
  process.env.NEXT_PUBLIC_ICO_MARKETPLACE_ADDRESS;

export const ICO_MARKETPLACE_ABI = icoMarketPlace;

// pinata key
export const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
export const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY;

console.log(
  ERC20Generator_ABI,
  ERC20Generator_BYTE_CODE,
  ICO_MARKETPLACE_ABI,
  ICO_MARKETPLACE_ADDRESS
);

// NETWORKS
const networks = {
  base_sepolia: {
    chainId: `0x${Number(84532).toString(16)}`,
    chainName: "Base Sepolia",
    nativeCurrency: {
      name: "Base Sepolia",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://sepolia.base.org"],
    blockExplorerUrls: ["https://sepolia-explorer.base.org"],
  },

  base_mainnet: {
    chainId: `0x${Number(8453).toString(16)}`,
    chainName: "Base",
    nativeCurrency: {
      name: "Base",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.base.org"],
    blockExplorerUrls: ["https://base.blockscout.com/"],
  },

  bsc: {
    chainId: `0x${Number(56).toString(16)}`,
    chainName: "Binance Mainnet",
    nativeCurrency: {
      name: "Binance Chain",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/bsc"],
    blockExplorerUrls: ["https://bscscan.com/"],
  },
};

const changeNetwork = async ({ networkName }) => {
  try {
    if (!window.ethereum) throw new Error("No wallet found");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          ...networks[networkName],
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
};

export const handleNetworkSwitch = async () => {
  const networkName = "base_sepolia";
  await changeNetwork({ networkName });
};

export const shortenAddress = (address) =>
  `${address?.slice(0, 5)}...${address?.slice(address.length - 4)}`;

// contract

const fetchContract = (address, abi, signer) =>
  new ethers.Contract(address, abi, signer);

export const icoMarketPlaceContract = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();

    const contract = fetchContract(
      ICO_MARKETPLACE_ADDRESS,
      ICO_MARKETPLACE_ABI,
      signer
    );

    return contract;
  } catch (error) {
    console.log(error);
  }
};

//token contract
export const tokenContract = async (token_address) => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();

    const contract = fetchContract(token_address, ERC20Generator_ABI, signer);
    return contract;
    //   return contract;
  } catch (error) {
    console.log(error);
  }
};
