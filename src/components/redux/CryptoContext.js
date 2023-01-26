import React, { createContext, useState, useEffect, useContext } from "react";
const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("TRY");

  const [symbol, setSymbol] = useState("$");

  useEffect(() => {

    if (currency === "TRY") {setSymbol("₺");}
   if (currency === "USD") {setSymbol("$");}
   console.log("context",symbol,currency);
  }, [currency, symbol]);

  return (
    <Crypto.Provider value={{ currency, setCurrency, symbol }}>
      {children}
    </Crypto.Provider>
  );
};
export default CryptoContext;
export const CryptoState = () => {
  return useContext(Crypto);
};