import { useEffect, useState } from "react";
import axios from "axios";
import { CryptoState } from "../context/CryptoContext";
import { TopCoins } from "../../services/Api";
import TrendCoin from "./Home/TrendCoin";
import React from "react";

function Home() {
  const [crypto, setCrypto] = useState([]);

  const { currency, symbol } = CryptoState();

  const getCoins = async () => {
    const { data } = await axios.get(TopCoins(currency));

    setCrypto(data);
  };

  useEffect(() => {
    getCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);
  console.log(crypto);
  return (
    <div>
      <TrendCoin crypto={crypto} symbol={symbol}></TrendCoin>
    </div>
  );
}

export default Home;
