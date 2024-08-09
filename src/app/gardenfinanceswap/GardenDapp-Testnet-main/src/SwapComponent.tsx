import { useEffect, useState } from "react";
import { useMetaMaskStore, useGarden, useSignStore } from "./store";
import { Assets } from "@gardenfi/orderbook";

type AmountState = {
  btcAmount: string | null;
  wbtcAmount: string | null;
};

const SwapComponent: React.FC = () => {
  const [amount, setAmount] = useState<AmountState>({
    btcAmount: null,
    wbtcAmount: null,
  });
  const [direction, setDirection] = useState<"BTC_TO_WBTC" | "WBTC_TO_BTC">("WBTC_TO_BTC");

  const changeAmount = (of: "WBTC" | "BTC", value: string) => {
    if (of === "WBTC") {
      handleWBTCChange(value);
    } else if (of === "BTC") {
      handleBTCChange(value);
    }
  };

  const handleWBTCChange = (value: string) => {
    const newAmount: AmountState = { wbtcAmount: value, btcAmount: null };
    if (Number(value) > 0) {
      const btcAmount = (1 - 0.3 / 100) * Number(value);
      newAmount.btcAmount = btcAmount.toFixed(8).toString();
    }
    setAmount(newAmount);
  };

  const handleBTCChange = (value: string) => {
    const newAmount: AmountState = { btcAmount: value, wbtcAmount: null };
    if (Number(value) > 0) {
      const wbtcAmount = Number(value) / (1 - 0.3 / 100);
      newAmount.wbtcAmount = wbtcAmount.toFixed(8).toString();
    }
    setAmount(newAmount);
  };

  return (
    <div className="swap-component">
      <WalletConnect />
      <hr />
      <div>
        <label>
          <input
            type="radio"
            name="direction"
            value="WBTC_TO_BTC"
            checked={direction === "WBTC_TO_BTC"}
            onChange={() => setDirection("WBTC_TO_BTC")}
          />
          WBTC to BTC
        </label>
        <label>
          <input
            type="radio"
            name="direction"
            value="BTC_TO_WBTC"
            checked={direction === "BTC_TO_WBTC"}
            onChange={() => setDirection("BTC_TO_WBTC")}
          />
          BTC to WBTC
        </label>
      </div>
      <SwapAmount amount={amount} changeAmount={changeAmount} direction={direction} />
      <hr />
      <Swap amount={amount} changeAmount={changeAmount} direction={direction} />
    </div>
  );
};

const WalletConnect: React.FC = () => {
  const { connectMetaMask, metaMaskIsConnected } = useMetaMaskStore();

  return (
    <div className="swap-component-top-section">
      <span className="swap-title">Swap</span>
      <MetaMaskButton isConnected={metaMaskIsConnected} onClick={connectMetaMask} />
    </div>
  );
};

type MetaMaskButtonProps = {
  isConnected: boolean;
  onClick: () => void;
};

const MetaMaskButton: React.FC<MetaMaskButtonProps> = ({ isConnected, onClick }) => {
  const buttonClass = `connect-metamask button-${isConnected ? "black" : "white"}`;
  const buttonText = isConnected ? "Connected" : "Connect Metamask";

  return (
    <button className={buttonClass} onClick={onClick}>
      {buttonText}
    </button>
  );
};

type TransactionAmountComponentProps = {
  amount: AmountState;
  changeAmount: (of: "WBTC" | "BTC", value: string) => void;
  direction: "BTC_TO_WBTC" | "WBTC_TO_BTC";
};

const SwapAmount: React.FC<TransactionAmountComponentProps> = ({ amount, changeAmount, direction }) => {
  const { wbtcAmount, btcAmount } = amount;

  return (
    <div className="swap-component-middle-section" style={{ marginTop: "30px" }}>
      {direction === "WBTC_TO_BTC" ? (
        <>
          <InputField
            id="wbtc"
            label="Send WBTC"
            value={wbtcAmount}
            onChange={(value) => changeAmount("WBTC", value)}
          />
          <InputField id="btc" label="Receive BTC" value={btcAmount} readOnly />
        </>
      ) : (
        <>
          <InputField
            id="btc"
            label="Send BTC"
            value={btcAmount}
            onChange={(value) => changeAmount("BTC", value)}
          />
          <InputField id="wbtc" label="Receive WBTC" value={wbtcAmount} readOnly />
        </>
      )}
    </div>
  );
};

type InputFieldProps = {
  id: string;
  label: string;
  value: string | null;
  readOnly?: boolean;
  onChange?: (value: string) => void;
};

const InputField: React.FC<InputFieldProps> = ({ id, label, value, readOnly, onChange }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <div className="input-component">
      <input
        id={id}
        placeholder="0"
        value={value ? value : ""}
        type="number"
        readOnly={readOnly}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
      <button>{id.toUpperCase()}</button>
    </div>
  </div>
);

type SwapAndAddressComponentProps = {
  amount: AmountState;
  changeAmount: (of: "WBTC" | "BTC", value: string) => void;
  direction: "BTC_TO_WBTC" | "WBTC_TO_BTC";
};

const Swap: React.FC<SwapAndAddressComponentProps> = ({ amount, changeAmount, direction }) => {
  const { garden, bitcoin } = useGarden();
  const [btcAddress, setBtcAddress] = useState<string>();
  const [ethAddress, setEthAddress] = useState<string>();
  const { metaMaskIsConnected } = useMetaMaskStore();
  const { wbtcAmount, btcAmount } = amount;

  const { isSigned } = useSignStore();

  useEffect(() => {
    if (!bitcoin) return;
    const getAddress = async () => {
      if (isSigned) {
        const address = await bitcoin.getAddress();
        setBtcAddress(address);
      }
    };
    getAddress();
  }, [bitcoin, isSigned]);

  useEffect(() => {
    const getEthAddress = async () => {
      if (metaMaskIsConnected) {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        setEthAddress(accounts[0]);
      }
    };
    getEthAddress();
  }, [metaMaskIsConnected]);

  const handleSwap = async () => {
    console.log('Swap button clicked');
  
    if (!garden || isNaN(Number(wbtcAmount)) || isNaN(Number(btcAmount))) {
      console.log('Invalid garden or amounts');
      return;
    }
  
    const sendAmount = direction === "WBTC_TO_BTC"
    ? Number(wbtcAmount) * 1e8
    : Number(btcAmount) * 1e8;

  const receiveAmount = (1 - 0.3 / 100) * sendAmount;
    console.log(`Sending Amount: ${sendAmount}, Receiving Amount: ${receiveAmount}`);
    console.log(`Sending from: ${JSON.stringify(direction === "WBTC_TO_BTC" ? Assets.ethereum_sepolia.WBTC : Assets.bitcoin_testnet.BTC)}`);
    console.log(`Receiving at: ${JSON.stringify(direction === "WBTC_TO_BTC" ? Assets.bitcoin_testnet.BTC : Assets.ethereum_sepolia.WBTC)}`);
  
    changeAmount("WBTC", "");
  
    try {
      await garden.swap(
        direction === "WBTC_TO_BTC" ? Assets.ethereum_sepolia.WBTC : Assets.bitcoin_testnet.BTC,
        direction === "WBTC_TO_BTC" ? Assets.bitcoin_testnet.BTC : Assets.ethereum_sepolia.WBTC,
        sendAmount,
        receiveAmount
      );
      console.log('Swap completed successfully');
    } catch (error) {
      console.error('Error during swap:', error);
    }
  };
  

  return (
    <div className="swap-component-bottom-section">
      <div>
        <label htmlFor="receive-address">Receive address</label>
        <div className="input-component">
          <input
            id="receive-address"
            placeholder="Enter Address"
            value={
              direction === "BTC_TO_WBTC" 
                ? ethAddress 
                : btcAddress ? btcAddress : ""
            }
            readOnly={direction === "BTC_TO_WBTC"}
            onChange={(e) => direction === "BTC_TO_WBTC" ? null : setBtcAddress(e.target.value)}
          />
        </div>
      </div>
      <button
        className={`button-${metaMaskIsConnected ? "white" : "black"}`}
        onClick={handleSwap}
        disabled={!metaMaskIsConnected}
      >
        Swap
      </button>
    </div>
  );
};

export default SwapComponent;
