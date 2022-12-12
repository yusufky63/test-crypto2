/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { SingleCoin } from "../../../services/Api";
import { deletePortfolyo } from "../../../services/firebase";
import BuyCrypto from "../../modal/BuyCrypto";
import SellCrypto from "../../modal/SellCrypto";
import Favorites from "./Favorites";

import OrderHistory from "../../modal/OrderHistory";

import { PortfolioChart, CheckPositiveNumber } from "../../utils"
function Portfolyo() {
  const { portfolyo } = useSelector((state) => state.portfolios);

  const [wallet, setWallet] = useState([]);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [totalRate, setTotalRate] = useState(0);
  const [rate, setRate] = useState([0]);
  const [info, setInfo] = useState([]);
  const fetchCoins = () => {
    setLoading(true);

    portfolyo.map(async (name) => {
      const { data } = await axios(SingleCoin(name.coin));
      let mergeData = { ...name, ...data };

      setCoins((prev) => [...prev, data]);
      setWallet((prev) => [
        ...prev,
        +(name.buy_total_crypto * data.market_data.current_price.usd),
      ]);
      setRate((prev) => [
        ...prev,
        +(
          name.buy_total_crypto * data.market_data.current_price.usd -
          name.buy_total_crypto * name.coin_price_usd
        ),
      ]);

      setInfo((prev) => [...prev, mergeData]);
    });

    setLoading(false);
  };

  useEffect(() => {
    setTotal(wallet.reduce((a, b) => a + b, 0));
    setTotalRate(rate.reduce((a, b) => a + b, 0));
  }, [coins, wallet, rate]);

  useEffect(() => {
    setInfo([]);
    setRate([]);
    setTotal(0);
    setTotalRate(0);
    setWallet([]);
    setCoins([]);

    fetchCoins();


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfolyo]);

  const handleDelete = (id) => {
    console.log(id);
    const data = portfolyo.find((c) => c.coin === id);
    deletePortfolyo(data.id);
  };

  return (
    <div className="portfolio-bg">
      <div className="pt-5 max-w-7xl mx-auto relative mt-10">
        {
          <div className="w-full hover:shadow-xl border shadow-md p-5 rounded-lg font-bold flex items-center justify-between">
            <span className="text-sm md:text-sm lg:text-lg xl:text-lg">
              {" "}
              Hesap Bakiyesi :{" "}
              <span className="text-gray-500">
                {total && total.toFixed(2)}$
              </span>{" "}
            </span>
            <span className="text-sm md:text-sm lg:text-lg xl:text-lg">
              Kar/Zarar :{" "}
              {totalRate > 0 ? (
                <span className="text-green-400">
                  {" "}
                  {totalRate.toFixed(2)} $
                </span>
              ) : (
                <span className="text-red-500">{totalRate.toFixed(2)}$</span>
              )}
            </span>
          </div>
        }
        {portfolyo.length > 0 ? (
          <>
            <div className=" ">
              <OrderHistory />
            </div>
            <div className="flex justify-center">
              <PortfolioChart chart={info} width={50} />
            </div>
          </>
        ) : (
          <div className="text-center text-2xl mt-10 font-bold my-5 text-red-500">
            Portfolyonuzda Coin Bulunmamaktadır.
          </div>
        )}
        <h1 className="text-3xl font-bold    p-3 shadow-md rounded-lg text-left ">
          Porfolyo
        </h1>
        <div className="px-12 mt-4 flex flex-col ">
          <div className="-my-2 -mx-10 overflow-x-auto sm:-mx-6 lg:-mx-8 ">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5    md:rounded-lg pb-12 ">
                {loading ? (
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
                ) : (
                  <>
                    {info.length > 0 ? (
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50 ">
                          <tr className="text-center">
                            <th
                              scope="col"
                              className="whitespace-nowrap py-3.5 pl-4 pr-3  text-sm font-semibold text-gray-900 "
                            >
                              Coin
                            </th>
                            <th
                              scope="col"
                              className="whitespace-nowrap px-1  py-3.5  text-sm font-semibold text-gray-900"
                            >
                              Miktar
                            </th>
                            <th
                              scope="col"
                              className="whitespace-nowrap px-1  py-3.5  text-sm font-semibold text-gray-900"
                            >
                              Bakiye($)
                            </th>
                            <th
                              scope="col"
                              className="whitespace-nowrap px-1  py-3.5  text-sm font-semibold text-gray-900 "
                            >
                              Alım Fiyatı
                            </th>
                            <th
                              scope="col"
                              className="whitespace-nowrap px-1  py-3.5  text-sm font-semibold text-gray-900 "
                            >
                              Güncel Fiyat
                            </th>
                            <th
                              scope="col"
                              className="whitespace-nowrap px-1  py-3.5  text-sm font-semibold text-gray-900"
                            >
                              Kar / Zarar Miktarı
                            </th>
                            <th
                              scope="col"
                              className="whitespace-nowrap px-1  py-3.5  text-sm font-semibold text-gray-900"
                            >
                              Kar / Zarar (%)
                            </th>

                            {/* <th
                        scope="col"
                        className="px-1  py-3.5  text-sm font-semibold text-gray-900"
                      >
                        Alım Zamanı
                      </th> */}
                          </tr>
                        </thead>

                        <tbody className=" divide-y divide-gray-200 bg-white ">
                          {info.map((item) => (
                            <tr
                              id="priceT"
                              className=" hover:shadow-md hover:bg-gray-100 "
                              key={item.id}
                            >
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                <div className="flex items-center">
                                  <div className="h-10 w-10">
                                    <img
                                      className="h-8 w-8 rounded-full"
                                      src={item.image.small}
                                      alt=""
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <div className="  text-gray-900 font-bold ">
                                      <Link to={`/markets/${item.id}`}>
                                        {item.name}
                                        <span className="uppercase text-xs text-gray-500">
                                          {" "}
                                          {item.symbol}
                                        </span>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className=" price whitespace-nowrap px-3 py-4 text-sm ">
                                <div className="">
                                  {" "}
                                  <h1>{item.buy_total_crypto.toFixed(5)}</h1>
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <div className="text-gray-900">
                                  <h1>
                                    {(
                                      item.buy_total_crypto *
                                      item.market_data.current_price.usd
                                    ).toFixed(2)}
                                    $
                                  </h1>
                                </div>
                              </td>
                              <td className=" whitespace-nowrap px-3 py-4 text-sm text-gray-500  ">
                                {item.coin_price_usd}$
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500  ">
                                <div className="text-gray-900">
                                  {item.market_data.current_price.usd}$
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <div className="text-gray-900">
                                  {" "}
                                  {(item.market_data.current_price.usd -
                                    item.coin_price_usd) *
                                    item.buy_total_crypto >=
                                    0 ? (
                                    <span className="text-green-500">
                                      {(
                                        (item.market_data.current_price.usd -
                                          item.coin_price_usd) *
                                        item.buy_total_crypto
                                      ).toFixed(2)}{" "}
                                      $
                                    </span>
                                  ) : (
                                    <span className="text-red-500">
                                      {(
                                        (item.market_data.current_price.usd -
                                          item.coin_price_usd) *
                                        item.buy_total_crypto
                                      ).toFixed(2)}{" "}
                                      $
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500  ">
                                <div className="text-sm ">
                                  {
                                    <CheckPositiveNumber
                                      number={
                                        ((item.market_data.current_price.usd -
                                          item.coin_price_usd) *
                                          100) /
                                        item.coin_price_usd
                                      }
                                    />
                                  }
                                </div>
                              </td>

                              <td className="p-1">
                                <button className="hover:bg-green-400 hover:text-white border bg-white shadow-md rounded-lg my-1 p-1 px-5 w-full">
                                  <BuyCrypto
                                    cryptoID={portfolyo && item.id}
                                  ></BuyCrypto>
                                </button>
                                <button className="border hover:bg-red-400 hover:text-white shadow-md rounded-lg p-1 my-1 px-5 w-full">
                                  <SellCrypto
                                    cryptoID={portfolyo && item.id}
                                  ></SellCrypto>
                                </button>
                              </td>
                              <td className="  ">
                                <div className="flex flex-col">
                                  {/* <EditPortfolyoCrypto cryptoID={item.id} /> */}

                                  <a
                                    onClick={(e) => handleDelete(item.id)}
                                    className=" text-black-300  hover:bg-red-300 hover:text-red-900  p-2 rounded-md text-base flex justify-center font-medium "
                                  >
                                    <svg
                                      className="w-6 h-6"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                      ></path>
                                    </svg>
                                  </a>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="flex justify-center text-center text-2xl font-bold my-5 text-red-500">
                        Portfolyonuzda Coin Bulunmamaktadır.
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <h1 className="text-3xl font-bold  p-3 shadow-md rounded-lg text-left ">
          Favoriler
        </h1>
        <Favorites></Favorites>
      </div>
    </div>
  );
}

export default Portfolyo;
