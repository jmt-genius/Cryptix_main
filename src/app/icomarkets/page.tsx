'use client'

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

// internal imports
import { useStateContext } from "../context/index";
import Header from "../../components/Components/Header";
import Input from "../../components/Components/Input";
import Button from "../../components/Components/Button";
import Table from "../../components/Components/Table";
import PreSaleList from "../../components/Components/PreSaleList";
import UploadLogo from "../../components/Components/UploadLogo";
import Loader from "../../components/Components/Loader";
import Footer from "../../components/Components/Footer";
import ICOMarket from "../../components/Components/ICOMarket";
import TokenCreator from "../../components/Components/TokenCreator";
import TokenHistory from "../../components/Components/TokenHistory";
import Marketplace from "../../components/Components/Marketplace";
import CreateICO from "../../components/Components/CreateICO";
import Card from "../../components/Components/Card";
import BuyToken from "../../components/Components/BuyToken";
import WidthdrawToken from "../../components/Components/WidthdrawToken";
import TokenTransfer from "../../components/Components/TokenTransfer";

const index = () => {
  const {
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
    currency,
    recall,
    PINATA_API_KEY,
    PINATA_SECRET_KEY,
    ICO_MARKETPLACE_ADDRESS,
    shortenAddress,
  } = useStateContext();

  const notifySuccess = (msg:string) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg:string) => toast.error(msg, { duration: 2000 });

  // State
  const [allICOs, setAllICOs] = useState();
  const [allUserICOs, setAllUserICOs] = useState();

  // component state
  const [openAllIcos, setOpenAllIcos] = useState(false);
  const [openTokenHistory, setOpenTokenHistory] = useState(false);
  const [openICOMarketplace, setOpenICOMarketplace] = useState(false);

  // buy ico tokens
  const [buyICO, setBuyICO] = useState();

  const copyAddress = () => {
    navigator.clipboard.writeText(ICO_MARKETPLACE_ADDRESS);
    notifySuccess("Address Copied successfully!");
  };

  useEffect(() => {
    if (address) {
      getAllIcoSaleToken().then((token:any) => {
        console.log("ALL", token);
        setAllICOs(token);
      });

      getAllUserIcoSaleToken().then((token:any) => {
        console.log("USER", token);
        setAllUserICOs(token);
      });
    }
  }, [address, recall]);

  return (
    <div>
      <Header
        accountBalance={accountBalance}
        setAddress={setAddress}
        address={address}
        connectWallet={connectWallet}
        ICO_MARKETPLACE_ADDRESS={ICO_MARKETPLACE_ADDRESS}
        shortenAddress={shortenAddress}
        setOpenAllIcos={setOpenAllIcos}
        openAllIcos={openAllIcos}
        setOpenTokenCreator={setOpenTokenCreator}
        openTokenCreator={openTokenCreator}
        setOpenTokenHistory={setOpenTokenHistory}
        openTokenHistory={openTokenHistory}
        setOpenICOMarketplace={setOpenICOMarketplace}
        openICOMarketplace={openICOMarketplace}
      />

      <div className="create">
        <h1
          style={{
            fontSize: "2rem",
          }}
        >
          All ICOs Marketplace
        </h1>
        {allICOs?.length != 0 && (
          <Marketplace
            array={allICOs}
            shortenAddress={shortenAddress}
            setBuyICO={setBuyICO}
            setOpenBuyToken={setOpenBuyToken}
            currency={currency}
          />
        )}
        <Card
          setOpenAllIcos={setOpenAllIcos}
          setOpenTokenCreator={setOpenTokenCreator}
          setOpenTransferToken={setOpenTransferToken}
          setOpenTokenHistory={setOpenTokenHistory}
          setOpenWithdrawToken={setOpenWithdrawToken}
          setOpenICOMarketplace={setOpenICOMarketplace}
          copyAddress={copyAddress}
          setOpenCreateICO={setOpenCreateICO}
        />
      </div>

      {openAllIcos && (
        <ICOMarket
          array={allUserICOs}
          shortenAddress={shortenAddress}
          handleClick={setOpenICOMarketplace}
          currency={currency}
        />
      )}
      {openTokenCreator && (
        <TokenCreator
          createERC20={createERC20}
          shortenAddress={shortenAddress}
          setOpenTokenCreator={setOpenTokenCreator}
          setLoader={setLoader}
          address={address}
          connectWallet={connectWallet}
          PINATA_API_KEY={PINATA_API_KEY}
          PINATA_SECRET_KEY={PINATA_SECRET_KEY}
        />
      )}
      {openTokenHistory && (
        <TokenHistory
          shortenAddress={shortenAddress}
          setOpenTokenHistory={setOpenTokenHistory}
        />
      )}
      {openCreateICO && (
        <CreateICO
          shortenAddress={shortenAddress}
          setOpenCreateICO={setOpenCreateICO}
          connectWallet={connectWallet}
          address={address}
          createIcoSale={createIcoSale}
        />
      )}
      {openICOMarketplace && (
        <ICOMarket
          array={allUserICOs}
          shortenAddress={shortenAddress}
          handleClick={setOpenAllIcos}
          currency={currency}
        />
      )}
      {openBuyToken && (
        <BuyToken
          address={address}
          buyToken={buyToken}
          connectWallet={connectWallet}
          setOpenBuyToken={setOpenBuyToken}
          buyICO={buyICO}
          currency={currency}
        />
      )}
      {openTransferToken && (
        <TokenTransfer
          address={address}
          transferTokens={transferTokens}
          connectWallet={connectWallet}
          setOpenTransferToken={setOpenTransferToken}
        />
      )}
      {openWithdrawToken && (
        <WidthdrawToken
          address={address}
          withdrawToken={withdrawToken}
          connectWallet={connectWallet}
          setOpenWithdrawToken={setOpenWithdrawToken}
        />
      )}

      <Footer />
      {loader && <Loader />}
    </div>
  );
};

export default index;
