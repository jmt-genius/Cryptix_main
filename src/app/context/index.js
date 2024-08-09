import { React, createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import toast from "react-hot-toast";

// internal imports
import {
  ERC20Generator,
  ERC20Generator_BYTE_CODE,
  handleNetworkSwitch,
  shortenAddress,
  ICO_MARKETPLACE_ADDRESS,
  icoMarketPlaceContract,
  tokenContract,
  PINATA_API_KEY,
  PINATA_SECRET_KEY,
  ERC20Generator_ABI,
} from "./constants";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  // state variables
  const [address, setAddress] = useState();
  const [accountBalance, setAccountBalance] = useState(null);
  const [loader, setLoader] = useState(false);
  const [recall, setRecall] = useState(0);
  const [currency, setCurrency] = useState("ETH");

  // component state variables
  const [openBuyToken, setOpenBuyToken] = useState(false);
  const [openWithdrawToken, setOpenWithdrawToken] = useState(false);
  const [openTransferToken, setOpenTransferToken] = useState(false);
  const [openTokenCreator, setOpenTokenCreator] = useState(false);
  const [openCreateICO, setOpenCreateICO] = useState(false);

  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  // functions

  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return notifyError("No Wallet Found");
      await handleNetworkSwitch();

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setAddress(accounts[0]);

        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const getbalance = await provider.getBalance(accounts[0]);
        const balance = ethers.utils.formatEther(getbalance);
        setAccountBalance(balance);
        return accounts[0];
      } else {
        return notifyError("No Account Found");
      }
    } catch (error) {
      console.log(error);
      notifyError("No Account Found");
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, [address]);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return notifyError("No Wallet Found");
      await handleNetworkSwitch();

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length) {
        setAddress(accounts[0]);
        // const provider = new ethers.providers.Web3Provider(connection);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const getbalance = await provider.getBalance(accounts[0]);
        const balance = ethers.utils.formatEther(getbalance);
        setAccountBalance(balance);
        return accounts[0];
      } else {
        return notifyError("No Account Found");
      }
    } catch (error) {
      console.log(error);
      notifyError("No Account Found");
    }
  };

  // main function

  const _deployContract = async (
    signer,
    account,
    name,
    symbol,
    supply,
    imgURL
  ) => {
    try {
      const factory = new ethers.ContractFactory(
        ERC20Generator_ABI,
        ERC20Generator_BYTE_CODE,
        signer
      );

      const totalSupply = Number(supply);
      const _initialSupply = ethers.utils.parseEther(
        totalSupply.toString(),
        "ether"
      );

      let contract = await factory.deploy(_initialSupply, name, symbol);

      const transaction = await contract.deployed();

      if (contract.address) {
        const today = Date.now();
        let date = new Date(today);
        const _tokenCreatedData = date.toLocaleDateString("en-US");

        const _token = {
          account: account,
          supply: supply.toString(),
          name: name,
          symbol: symbol,
          tokenAddress: contract.address,
          transactionHash: contract.deployTransaction.hash,
          createdAt: _tokenCreatedData,
          logo: imgURL,
        };

        let tokenHistory = [];

        const history = localStorage.getItem("TOKEN_HISTORY");

        if (history) {
          tokenHistory = JSON.parse(history);
        }

        tokenHistory.push(_token);

        localStorage.setItem("TOKEN_HISTORY", JSON.stringify(tokenHistory));

        setLoader(false);
        setRecall(recall + 1);
        setOpenTokenCreator(false);

        // if (history) {
        //   tokenHistory = JSON.parse(localStorage.getItem("TOKEN_HISTORY"));
        //   tokenHistory.push(_token);
        //   localStorage.setItem("TOKEN_HISTORY", tokenHistory);
        //   setLoader(false);
        //   setRecall(recall + 1);
        //   setOpenTokenCreator(false);
        // } else {
        //   tokenHistory.push(_token);
        //   localStorage.setItem("TOKEN_HISTORY", tokenHistory);
        //   setLoader(false);
        //   setRecall(recall + 1);
        //   setOpenTokenCreator(false);
        // }
      }
    } catch (error) {
      setLoader(false);
      notifyError("Something went wrong, try later");
      console.log(error);
    }
  };

  const createERC20 = async (token, account, imgURL) => {
    const { name, symbol, supply } = token;
    try {
      setLoader(true);
      notifySuccess("Creating Token...");

      if (!name || !symbol || !supply) {
        notifyError("Data missing, All fields are required");
      } else {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);

        const signer = provider.getSigner();

        _deployContract(signer, account, name, symbol, supply, imgURL);
        notifySuccess("Token Created Succuessfully!");
      }
    } catch (error) {
      setLoader(false);
      notifyError("Something went wrong, try later");
      console.log(error);
    }
  };

  const getAllIcoSaleToken = async () => {
    try {
      setLoader(true);
      const address = await connectWallet();
      const contract = await icoMarketPlaceContract();

      if (address) {
        const allIcoSaleToken = await contract.getAllTokens();

        const tokenArray = Promise.all(
          allIcoSaleToken.map(async (token) => {
            const token_Contract = await tokenContract(token?.token);

            const balance = await token_Contract.balanceOf(
              ICO_MARKETPLACE_ADDRESS
            );

            return {
              creator: token.creator,
              token: token.token,
              name: token.name,
              symbol: token.symbol,
              supported: token.supported,
              price: ethers.utils.formatEther(token?.price.toString()),
              icoSaleBal: ethers.utils.formatEther(balance.toString()),
            };
          })
        );

        setLoader(false);
        return tokenArray;
      }
    } catch (error) {
      notifyError("Something Went Wrong!");
      console.log(error);
    }
  };

  const getAllUserIcoSaleToken = async () => {
    try {
      setLoader(true);
      const address = await connectWallet();
      const contract = await icoMarketPlaceContract();

      if (address) {
        const allIcoSaleToken = await contract.getTokenCreatedBy(address);

        const tokenArray = Promise.all(
          allIcoSaleToken.map(async (token) => {
            const token_Contract = await tokenContract(token?.token);

            const balance = await token_Contract.balanceOf(
              ICO_MARKETPLACE_ADDRESS
            );

            return {
              creator: token.creator,
              token: token.token,
              name: token.name,
              symbol: token.symbol,
              supported: token.supported,
              price: ethers.utils.formatEther(token?.price.toString()),
              icoSaleBal: ethers.utils.formatEther(balance.toString()),
            };
          })
        );

        setLoader(false);
        return tokenArray;
      }
    } catch (error) {
      notifyError("Something Went Wrong!");
      console.log(error);
    }
  };

  const createIcoSale = async (icoSale) => {
    try {
      const { address, price } = icoSale;
      if (!address || !price) return notifyError("Data is missing");

      setLoader(true);
      notifySuccess("Creating ICO Sale...");
      await connectWallet();

      const contract = await icoMarketPlaceContract();

      const payAmount = ethers.utils.parseUnits(price.toString(), "ether");

      const transaction = await contract.createICOSale(address, payAmount, {
        gasLimit: ethers.utils.hexlify(8000000),
      });

      // console.log(transaction);
      //0xbd5ae07d648a62359A74EAED95c039644c2495ef
      await transaction.wait();
      console.log(transaction);
      if (transaction.hash) {
        setLoader(false);
        setOpenCreateICO(false);
        setRecall(recall + 1);
        notifySuccess("Success!");
      }
    } catch (error) {
      setLoader(false);
      setOpenCreateICO(false);
      notifyError("Something Went Wrong!");
      console.log(error);
    }
  };

  const buyToken = async (tokenAddress, tokenQuantity) => {
    try {
      setLoader(true);
      notifySuccess("Purchasing Token...");

      if (!tokenQuantity || !tokenAddress)
        return notifyError("Data is missing");

      const address = await connectWallet();
      const contract = await icoMarketPlaceContract();

      const _tokenBal = await contract.getBalance(tokenAddress);
      const _tokenDetails = await contract.getTokenDetails(tokenAddress);

      const availableToken = ethers.utils.formatEther(_tokenBal.toString());

      if (availableToken > 0) {
        const price =
          ethers.utils.formatEther(_tokenDetails.price.toString()) *
          Number(tokenQuantity);

        const payAmount = ethers.utils.parseUnits(price.toString(), "ether");

        const transaction = await contract.buyToken(
          tokenAddress,
          Number(tokenQuantity),
          {
            value: payAmount.toString(),
            gasLimit: ethers.utils.hexlify(80000000),
          }
        );

        await transaction.wait();
        setLoader(false);
        setRecall(recall + 1);
        setOpenBuyToken(false);
        notifySuccess("Transaction Completed Successfully");
      } else {
        setLoader(false);
        setOpenBuyToken(false);
        notifyError("Your Token balance is 0");
      }
    } catch (error) {
      setLoader(false);
      setOpenBuyToken(false);
      notifyError("Something Went Wrong!");
      console.log(error);
    }
  };

  const transferTokens = async (transferTokenData) => {
    try {
      if (
        !transferTokenData.address ||
        !transferTokenData.amount ||
        !transferTokenData.tokenAddress
      )
        return notifyError("Data is missing!");

      setLoader(true);
      notifySuccess("Transaction is processing...");
      const address = connectWallet();

      // const contract = await icoMarketPlaceContract();
      const contract = await tokenContract(transferTokenData.tokenAddress);
      const _availableBal = await contract.balanceOf(address);
      const availableToken = ethers.utils.formatEther(_availableBal.toString());

      if (availableToken > 1) {
        const payAmount = ethers.utils.parseUnits(
          transferTokenData.amount.toString(),
          "ether"
        );

        const transaction = await contract.transfer(
          transferTokenData.address,
          payAmount,
          {
            gasLimit: ethers.utils.hexlify(80000000),
          }
        );

        await transaction.wait();
        setLoader(false);
        setRecall(recall + 1);
        setOpenTransferToken(false);
        notifySuccess("Transaction completed Successfully");
      } else {
        setLoader(false);
        setRecall(recall + 1);
        setOpenTransferToken(false);
        notifyError("Your Balance is 0");
      }
    } catch (error) {
      setLoader(false);
      setRecall(recall + 1);
      setOpenTransferToken(false);
      notifyError("Something Went Wrong!");
      console.log(error);
    }
  };

  const withdrawToken = async (withdrawQuantity) => {
    try {
      if (!withdrawQuantity.amount || !withdrawQuantity.token)
        return notifyError("Data is missing!");

      setLoader(true);
      notifySuccess("Transaction is processing...");

      const address = await connectWallet();
      const contract = await icoMarketPlaceContract();

      const payAmount = ethers.utils.parseUnits(
        withdrawQuantity.amount.toString(),
        "ether"
      );

      const transaction = await contract.withdrawToken(
        withdrawQuantity.token,
        payAmount,
        {
          gasLimit: ethers.utils.hexlify(8000000),
        }
      );

      await transaction.wait();
      setLoader(false);
      setRecall(recall + 1);
      setOpenWithdrawToken(false);
      notifySuccess("Transaction completed successfully!");
    } catch (error) {
      setLoader(false);
      setRecall(recall + 1);
      setOpenWithdrawToken(false);
      notifyError("Something Went Wrong!");
      console.log(error);
    }
  };

  return (
    <StateContext.Provider
      value={{
        ERC20Generator,
        withdrawToken,
        transferTokens,
        buyToken,
        createIcoSale,
        getAllUserIcoSaleToken,
        getAllIcoSaleToken,
        createERC20,
        connectWallet,
        openBuyToken,
        setOpenBuyToken,
        openWithdrawToken,
        setOpenWithdrawToken,
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
        recall,
        currency,
        PINATA_API_KEY,
        PINATA_SECRET_KEY,
        ICO_MARKETPLACE_ADDRESS,
        shortenAddress,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
