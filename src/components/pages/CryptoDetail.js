import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import Chart from "../utils/Chart";

import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import axios from "axios";
import { SingleCoin } from "../../services/Api";

import { CryptoState } from "../redux/CryptoContext";
// import HistoryChart from "../utils/HistoryChart";

import NumberWithCommas from "../utils/NumberWithCommas";
import CheckPositiveNumber from "../utils/CheckPositiveNumber";

import { addCrypto, deleteCrypto } from "../../services/firebase";
import { useSelector } from "react-redux";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import BuyCrypto from "../modal/BuyCrypto";
import SellCrypto from "../modal/SellCrypto";
function CryptoCard() {
  const { user } = useSelector((state) => state.auth);
  const { favori } = useSelector((state) => state.favorites);

  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();
  const [symbolTrading, setSymbolTrading] = useState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    console.log(symbolTrading);
    setSymbolTrading(data.symbol);
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    setSymbolTrading(id.symbol);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const currencyEdit = currency.toLowerCase();

  const handleSavedCoin = (e, id) => {
    e.preventDefault();
    const data = favori.find((item) => item.name === id);
    if (!data) {
      addCrypto({
        name: id,
        uid: user.uid,
      });
    } else {
      deleteCrypto(data.id);
    }
  };
  function controlFavorites(id) {
    const data = favori.find((item) => item.name === id);
    if (data) {
      return <AiTwotoneHeart fontSize={30} color="red"></AiTwotoneHeart>;
    } else {
      return <AiOutlineHeart fontSize={30} color="black"></AiOutlineHeart>;
    }
  }
  console.log(coin);

  return (
    <>
      <br />
      <h1 className="text-sm">
        Eğer <b> "Hatalı Sembol"</b> Uyarısı alıyorsanız İşlem Çiftini
        Değiştiriniz !
      </h1>
      {coin ? (
        <>
          <div className=" flex lg:flex-row flex-col mt-20 gap-20 justify-center">
            <div className=" ml-10 mr-5">
              <div className="flex items-center relative">
                <span className=" absolute mb-20 bg-yellow-500 text-md  text-black rounded-r-lg px-1 ">
                  Rank #{coin.market_cap_rank}
                </span>

                <span className=" absolute mb-16 right-0 text-black rounded-r-lg px-1 ">
                  <button onClick={(e) => handleSavedCoin(e, coin.id)}>
                    {controlFavorites(coin.id)}
                  </button>
                </span>

                <img
                  src={coin.image.small}
                  alt={coin.name}
                  className="w-12 h-12 mr-4 mt-5"
                />
                <h2 className="text-xl font-bold mt-3">
                  {coin.name}{" "}
                  <span className="text-sm uppercase text-gray-500">
                    {coin.symbol}
                  </span>
                </h2>
              </div>
              <br />
              <div className="flex justify-center items-center">
                <h1 className="text-2xl font-bold mx-2">
                  {symbol}
                  {coin.market_data.current_price[currencyEdit]}
                </h1>
                <span className="font-bold mt-1">
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
              <div className="flex justify-center ">
                <h1 className="text-xs inline-block py-2 px-2.5 leading-none text-center whitespace-nowrap align-baseline  bg-red-600 text-white rounded-full">
                  {symbol} {coin.market_data.low_24h[currencyEdit]}
                </h1>

                <span className="text-xs inline-block py-2 px-2 leading-none text-center whitespace-nowrap align-baseline  bg-yellow-500 text-black rounded-lg mx-5 ">
                  24H
                </span>

                <h1 className="text-xs inline-block py-2 px-2.5 leading-none text-center whitespace-nowrap align-baseline  bg-green-600 text-white rounded-full">
                  {symbol} {coin.market_data.high_24h[currencyEdit]}
                </h1>
              </div>
              <br />
              <h1 className="text-gray-500 font-bold mr-10">Market Data</h1>

              <hr />
              <br />

              <div className="flex items-center justify-between">
                <h1 className=" font-bold mr-10"> ATH: </h1>
                <span className=" text-sm bg-yellow-400 rounded-lg  px-2">
                  {symbol}
                  {coin.market_data.ath[currencyEdit]}
                </span>
              </div>

              <div className="flex items-center   justify-between ">
                <h1 className=" font-bold mr-10"> Market Cap Rank: </h1>
                <span className=" text-sm bg-yellow-400 rounded-lg  px-2">
                  {coin.market_data.market_cap_rank}
                </span>
              </div>

              <div className="flex items-center  justify-between">
                <h1 className=" font-bold mr-10">24H Market Cap Change: </h1>
                <span className="flex justify-end text-sm bg-yellow-400 rounded-lg  px-2">
                  {NumberWithCommas(coin.market_data.market_cap_change_24h)}
                </span>
              </div>

              <div className="flex items-center  justify-between">
                <h1 className="font-bold mr-10">Max Supply: </h1>
                <span className="  text-sm bg-yellow-400 rounded-lg px-2">
                  {NumberWithCommas(coin.market_data.max_supply)}
                </span>
              </div>

              <div className="flex items-center  justify-between">
                <h1 className="font-bold  mr-10">Total Volume: </h1>
                <span className="text-sm bg-yellow-400 rounded-lg  px-2">
                  {symbol}{" "}
                  {NumberWithCommas(
                    coin.market_data.total_volume[currencyEdit]
                  )}
                </span>
              </div>
              <br />
              <h1 className="text-gray-500 font-bold mr-10">Social Media</h1>

              <hr />
              <br />
              {/* Social */}

              <div className="flex items-center   justify-between">
                <h1 className="font-bold mr-10">Site :</h1>
                {coin.links.homepage[0] ? (
                  <a
                    href={coin.links.homepage[0]}
                    target={"_blank"}
                    className="text-sm bg-yellow-400 rounded-lg  px-2"
                    rel="noreferrer"
                  >
                    {coin.links.homepage[0]}
                  </a>
                ) : (
                  <span className="text-sm">Mevcut Değil</span>
                )}
              </div>

              <div className="flex items-center  justify-between">
                <h1 className="font-bold mr-10">Forum: </h1>
                {coin.links.official_forum_url[0] ? (
                  <a
                    href={coin.links.official_forum_url[0]}
                    className=" text-sm bg-yellow-400 rounded-lg  px-2"
                  >
                    {coin.links.official_forum_url[0]}
                  </a>
                ) : (
                  <span className="text-sm">Mevcut Değil</span>
                )}
              </div>

              <div className="flex items-center  justify-between">
                <h1 className="font-bold mr-10">Reddit: </h1>
                {coin.links.subreddit_url ? (
                  <a
                    href={coin.links.subreddit_url}
                    target="_blank"
                    className=" text-sm bg-yellow-400 rounded-lg px-2"
                    rel="noreferrer"
                  >
                    {coin.links.subreddit_url}
                  </a>
                ) : (
                  <span className="text-sm">Mevcut Değil</span>
                )}
              </div>
              <br />
              <div className="border shadow-lg rounded-lg p-3">
                {" "}
                <button className="shadow-lg border hover:bg-green-400   my-1 rounded-lg p-1 px-5 w-full">
                  <BuyCrypto cryptoID={coin.id}></BuyCrypto>
                </button>
                <button className=" shadow-lg border hover:bg-red-400 rounded-lg  my-1 p-1 px-5 w-full">
                  <SellCrypto cryptoID={coin.id}></SellCrypto>
                </button>
              </div>
            </div>

            {symbolTrading && (
              <div id="test" className="container max-w-screen-lg flex ">
                <AdvancedRealTimeChart
                  details
                  container_id="test"
                  symbol={`BINANCE:${symbolTrading}USD`}
                  // eslint-disable-next-line react/style-prop-object
                  style="1"
                  interval="D"
                  locale="tr"
                  width="95%"
                  height={550}
                  theme="light"
                ></AdvancedRealTimeChart>
              </div>
            )}
          </div>
          <h1 className="text-xl font-semibold mt-8 mb-4">
            {" "}
            {coin.name} ({coin.symbol?.toUpperCase()}) Hakkında
          </h1>
          <div className="flex justify-center">
            <div
              className="mx-5 about-text text-left  container whitespace-pre-line  "
              dangerouslySetInnerHTML={{ __html: coin.description?.en }}
            ></div>
          </div>
        </>
      ) : (
        <div role="status">
          <h1 className="my-2">Yükleniyor...</h1>
          <svg
            className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </>
  );
}

export default CryptoCard;
