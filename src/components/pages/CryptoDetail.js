import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import axios from "axios";
import { SingleCoin } from "../../services/Api";
import { CryptoState } from "../../redux/CryptoContext";
import NumberWithCommas from "../../utils/NumberWithCommas";
import CheckPositiveNumber from "../../utils/CheckPositiveNumber";

import {
  addFavoritesCrypto,
  deleteFavoritesCrypto,
} from "../../services/Firebase/FirebasePortfolyoAndFavorites";
import { useSelector } from "react-redux";

import AddFavorites from "../../utils/AddFavorites";
import BuyCrypto from "../modal/BuyCrypto";
import SellCrypto from "../modal/SellCrypto";
import LoadingIcon from "../../assets/icon/LoadingIcon";
function CryptoCard() {
  const { user } = useSelector((state) => state.auth);
  const { favori } = useSelector((state) => state.favorites);

  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();
  const [symbolTrading, setSymbolTrading] = useState();
  const currencyEdit = currency.toLowerCase();
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setSymbolTrading(data.symbol);
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    setSymbolTrading(id.symbol);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSavedCoin = (e, id) => {
    e.preventDefault();
    const data = favori.find((item) => item.name === id);
    if (!data) {
      addFavoritesCrypto({
        name: id,
        uid: user.uid,
      });
    } else {
      deleteFavoritesCrypto(data.id);
    }
  };

  return (
    <>
      <br />
      <h1 className="text-sm">
        Eğer <b> "Hatalı Sembol"</b> Uyarısı alıyorsanız İşlem Çiftini
        Değiştiriniz !
      </h1>
      {coin ? (
        <>
          <div className=" flex lg:flex-row flex-col mt-20 gap-20 justify-center items-center ">
            <div className=" ml-10 mr-5 box p-6 relative shadow-lg rounded-lg">
              <div className="flex items-center ">
                <div className="absolute mb-10 top-0 left-0 right-0 flex items-center justify-between p-2">
                  <span className="bg-yellow-500 text-md text-black rounded-r-lg px-1">
                    Rank #{coin.market_cap_rank}
                  </span>

                  <span className="text-black  ">
                    <button onClick={(e) => handleSavedCoin(e, coin.id)}>
                      <AddFavorites id={coin.id} />
                    </button>
                  </span>
                </div>

                <img
                  src={coin.image.small}
                  alt={coin.name}
                  className="w-12 h-12 mr-4 mt-5"
                />
                <h2 className="text-xl font-bold mt-3">
                  {coin.name}
                  <span className="text-sm uppercase text-gray-500 ml-1">
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
                  {symbol}
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
              {user ? (
                <div className="">
                  <button className="shadow-md  hover:bg-green-400   my-1 rounded-lg p-1 px-5 w-full">
                    <BuyCrypto cryptoID={coin.id} />
                  </button>
                  <button className=" shadow-md  hover:bg-red-400 rounded-lg  my-1 p-1 px-5 w-full">
                    <SellCrypto cryptoID={coin.id} />
                  </button>
                </div>
              ) : (
                <span className="text-sm text-red-500">Alım Yapabilmek İçin Lütfen Giriş Yapınız</span>
              )}
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
            {coin.name} ({coin.symbol?.toUpperCase()}) Hakkında
          </h1>
          <div className="flex justify-center">
            <div
              className="mx-5 about-text text-left  container whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: coin.description?.en }}
            ></div>
          </div>
        </>
      ) : (
        <div role="status">
          <h1 className="my-2">Yükleniyor...</h1>
          <LoadingIcon />
        </div>
      )}
    </>
  );
}

export default CryptoCard;
