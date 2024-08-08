import React from "react";
import Button from "./Button";
import toast from "react-hot-toast";

const Marketplace = ({
  array,
  shortenAddress,
  setBuyICO,
  setOpenBuyToken,
  currency,
}) => {
  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  const copyAddress = (text) => {
    navigator.clipboard.writeText(text);
    notifySuccess("Address Copied successfully!");
  };

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <td>Name</td>
            <td>Symbol</td>
            <td>Supply</td>
            <td>Token</td>
            <td>Creator</td>
            <td>Price</td>
            <td>Buy</td>
          </tr>
        </thead>

        <tbody>
          {array?.map((token, index) => (
            <tr key={index + 1}>
              <td>{token?.name}</td>
              <td>{token?.symbol}</td>
              <td>{token?.icoSaleBal}</td>
              <td onClick={() => copyAddress(token?.token)}>
                {shortenAddress(token?.token)} 📋
              </td>
              <td onClick={() => copyAddress(token?.creator)}>
                {shortenAddress(token?.creator)} 📋
              </td>
              <td>
                {token?.price} {currency}
              </td>
              <td onClick={() => (setBuyICO(token), setOpenBuyToken(true))}>
                <Button name={"Buy"} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Marketplace;
