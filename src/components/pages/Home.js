import { useEffect, useState } from "react";
import axios from "axios";
import { CryptoState } from "../redux/CryptoContext";
import { TopCoins } from "../../services/Api";
import TrendCoin from "./Home/TrendCoin";
import PageLinks from "./Home/PageLinks";
import React from "react";
import Contact from "./Home/Contact";
import HomeHeader from "./Home/HomeHeader";
function Home() {
  const [crypto, setCrypto] = useState([]);
  const { currency, symbol } = CryptoState();
  const [loading, setLoading] = useState(false);
  const getCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(TopCoins(currency));
    setCrypto(data);
    setLoading(false);
  };

  useEffect(() => {
    getCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  return (
    <div>
      <HomeHeader />

      <TrendCoin
        crypto={crypto}
        currency={currency}
        symbol={symbol}
        loading={loading}
      />

      <div className="my-20">
        <PageLinks />
      </div>
      <hr />

      <Contact></Contact>
    </div>
  );
}

export default Home;
