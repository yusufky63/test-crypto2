import { useEffect, useState } from "react";
import axios from "axios";
import { CryptoState } from "../../redux/CryptoContext";
import { TopCoins } from "../../services/Api";

import { HomeHeader, Contact, PageLinks, TrendCoin } from "./HomeComp";

function Home() {
  const [crypto, setCrypto] = useState([]);
  const { currency, symbol } = CryptoState();
  const [loading, setLoading] = useState(false);
  const currencyEdit = currency.toLowerCase();
  const getCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(TopCoins(currencyEdit));
    setCrypto(data);
    setLoading(false);
  };

  useEffect(() => {
    getCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencyEdit]);

  return (
    <div>
      <HomeHeader />

      <TrendCoin
        crypto={crypto}
        currencyEdit={currencyEdit}
        symbol={symbol}
        loading={loading}
      />
      <PageLinks />

      <Contact />
    </div>
  );
}

export default Home;
