import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";

const BuyToken = ({
  address,
  buyToken,
  connectWallet,
  setOpenBuyToken,
  buyICO,
  currency,
}) => {
  const [tokenQuantity, setTokenQuantity] = useState();

  return (
    <div className="modal">
      <div className="modal-content">
        <span onClick={() => setOpenBuyToken(false)} className="close">
          &times;
        </span>
        <h2>Buy Token</h2>
        <div
          className="input-Container"
          style={{
            marginTop: "1rem",
          }}
        >
          <Input
            placeholder={"Quantity"}
            handleChange={(e) => setTokenQuantity(e.target.value)}
          />

          <Input
            placeholder={
              tokenQuantity
                ? `${tokenQuantity * Number(buyICO?.price)} ${currency}`
                : "Output"
            }
          />
        </div>

        <div className="button-box" style={{ marginTop: "1rem" }}>
          {address ? (
            <Button
              name="Token Transfer"
              handleClick={() => buyToken(buyICO?.token, tokenQuantity)}
            />
          ) : (
            <Button name="Connect Wallet" handleClick={() => connectWallet()} />
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyToken;
