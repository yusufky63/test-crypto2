import React, { useState } from "react";
import axios from "axios";
import AllCoins from "../components/pages/AllCoins";
import Loading from "../components/utils/design/Loading";

function GetCryptoAll() {
  

  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(false);

  setTimeout(() => {
    const options = {
      method: "GET",
      url: "https://coingecko.p.rapidapi.com/coins/markets",
      params: {
        vs_currency: "usd",
        page: "1",
        per_page: "100",
        order: "market_cap_desc",
      },
      headers: {
        "X-RapidAPI-Key": "a75319eeafmsh2244a4a6651e235p1fb377jsn1f3b67f45f77",
        "X-RapidAPI-Host": "coingecko.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        setCryptoData(response.data);
        setLoading(true);
      })
      .catch(function (error) {
        console.error("GetCryptoAll ", error);
      });
  }, 5000); // 8 sec interval

  return (
    <>
   
    <div>{loading ? <AllCoins cryptoData={cryptoData} /> : <Loading />}</div>
    </>
  
  );
}

export default GetCryptoAll;
