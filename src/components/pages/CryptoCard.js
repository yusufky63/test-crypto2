import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import Chart from "../utils/Chart";
import React from "react";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import axios from "axios";
import { SingleCoin } from "../../services/Api";

import { CryptoState } from "../context/CryptoContext";
// import HistoryChart from "../utils/HistoryChart";

import numberWithCommas from "../utils/convertCurrency";
import CheckPositiveNumber from "../utils/CheckPositiveNumber";
function CryptoCard() {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();
  // const [day, setDay] = useState("7");

  // const [chart, setChart] = useState(1);
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    console.log(data);
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const currencyEdit = currency.toLowerCase().toLowerCase();

  return (
    <>
      {coin && (
        <div className=" flex   lg:flex-row flex-col mt-20 gap-20 justify-center">
          <div className=" ml-10 mr-5">
            <div className="flex items-center">
              <span className=" absolute mb-20 bg-yellow-500 font-medium text-black rounded-lg p-1">
                Rank #{coin.market_cap_rank}
              </span>
              <img
                src={coin.image.small}
                alt={coin.name}
                className="w-16 h-16 mr-4 mt-5"
              />
              <h1 className="text-xl ">
                {coin.name}{" "}
                <span className="text-sm uppercase text-gray-500">
                  {coin.symbol}
                </span>
              </h1>
            </div>
            <br />
            <div className="flex justify-start ">
              <h1 className="text-2xl font-bold mx-2">
                {symbol}
                {coin.market_data.current_price[currencyEdit]}
              </h1>
              <span className="font-bold ">
                {" "}
                <CheckPositiveNumber
                  number={
                    coin.market_data.price_change_percentage_24h_in_currency[
                      currencyEdit
                    ]
                  }
                />
              </span>
            </div>
            <br />
            <div className="flex justify-start ">
              <h1 className="rounded-md  text-sm bg-red-500 p-1 text-white ">
                {symbol} {coin.market_data.low_24h[currencyEdit]}
              </h1>

              <span className="text-sm p-1 mx-2 bg-yellow-500 rounded-lg ">
                24H
              </span>

              <h1 className="rounded-md  text-sm bg-green-500 p-1 text-white ">
                {symbol} {coin.market_data.high_24h[currencyEdit]}
              </h1>
            </div>
            <br />
            <h1 className="text-gray-500 font-bold mr-10">Market Data</h1>

            <hr />
            <br />

            <div className="flex items-center justify-between">
              <h1 className=" font-bold mr-10"> ATH : </h1>
              <span className=" text-sm bg-yellow-400 rounded-lg  px-2">
                {symbol}
                {coin.market_data.ath[currencyEdit]}
              </span>
            </div>

            <div className="flex items-center   justify-between ">
              <h1 className=" font-bold mr-10"> Market Cap Rank : </h1>
              <span className=" text-sm bg-yellow-400 rounded-lg  px-2">
                {coin.market_data.market_cap_rank}
              </span>
            </div>

            <div className="flex items-center  justify-between">
              <h1 className=" font-bold mr-10">24H Market Cap Change : </h1>
              <span className="flex justify-end text-sm bg-yellow-400 rounded-lg  px-2">
                {numberWithCommas(coin.market_data.market_cap_change_24h)}
              </span>
            </div>

            <div className="flex items-center  justify-between">
              <h1 className="font-bold mr-10">Max Supply : </h1>
              <span className="  text-sm bg-yellow-400 rounded-lg px-2">
                {numberWithCommas(coin.market_data.max_supply)}
              </span>
            </div>

            <div className="flex items-center  justify-between">
              <h1 className="font-bold  mr-10">Total Volume : </h1>
              <span className="text-sm bg-yellow-400 rounded-lg  px-2">
                {symbol}{" "}
                {numberWithCommas(coin.market_data.total_volume[currencyEdit])}
              </span>
            </div>
            <br />
            <h1 className="text-gray-500 font-bold mr-10">Social Media</h1>

            <hr />
            <br />
            {/* Social */}

            <div className="flex items-center   justify-between">
              <h1 className="font-bold mr-10">Site :</h1>
              <span className="text-sm bg-yellow-400 rounded-lg  px-2">
                {coin.links.homepage[0]}
              </span>
            </div>

            <div className="flex items-center  justify-between">
              <h1 className="font-bold mr-10">Forum : </h1>
              <span className=" text-sm bg-yellow-400 rounded-lg  px-2">
                {coin.links.official_forum_url[0]}
              </span>
            </div>

            <div className="flex items-center  justify-between">
              <h1 className="font-bold mr-10">Reddit : </h1>
              <span className=" text-sm bg-yellow-400 rounded-lg px-2">
                {coin.links.subreddit_url}
              </span>
            </div>
          </div>
          {/* <div>
            <select
              name=""
              id=""
              onChange={(e) => setChart(e.target.value)}
              value={chart}
            >
              <option value={1}>TradingView</option>
              <option value={2}>Custom Chart</option>
            </select>
          </div> */}
          <div id="test" className="container max-w-screen-lg flex ">
            <AdvancedRealTimeChart
              details
              container_id="test"
              symbol={`BINANCE:${coin.symbol}${currency}`}
              // eslint-disable-next-line react/style-prop-object
              style="1"
              interval="D"
              locale="tr"
              width="95%"
              height={550}
              theme="light"
            ></AdvancedRealTimeChart>

            {/* <CoinChart id={id}></CoinChart> */}
          </div>
        </div>
      )}
    </>
  );
}

export default CryptoCard;
