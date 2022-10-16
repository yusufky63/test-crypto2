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
      <h1 className="font-bold sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-3xl  my-16">Kripto Dünyasına Hoşgeldiniz</h1>
      <div  className=" flex justify-center items-center  mb-20 lg:mr-20">
        <div className="font-bold text-start  sm:text-xl md:text-xl lg:text-3xl xl:text-4xl text-sm whitespace-nowrap mr-5">
          Kripto satın almanın, satmanın ve <br /> kripto ticareti yapmanın dünyadaki <br />
          en popüler yolu
          <br />
          <br />
          <p className="text-gray-900  sm:text-xs md:text-xl lg:text-2xl xl:text-3xl text-xs">
          2011'den beri milyonlarca insanın güveni ile <br /> değeri 1 Trilyon doları
          aşan kripto para işlemleri.
        </p>
        </div>
        <br />
       
        <img
          className=" xl:ml-20"
          width={"30%"}
          
          src={require("../../img/svg-1.png")}
          alt="resim"
        />
      </div>
      <h1 className=" font-bold sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl text-3xl mt-20 ">
        Trend Coinler
      </h1>
      <div className="flex justify-center bg">
        <TrendCoin crypto={crypto} currency={currency} symbol={symbol} />
      </div>
      <div className="flex justify-center bg-reverse">
  
      </div>
    </div>
  );
}

export default Home;
