/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { SingleCoin } from "../../../services/Api";
import { deletePortfolyo } from "../../../services/Firebase/FirebasePortfolyoAndFavorites";
import BuyCrypto from "../../modal/BuyCrypto";
import SellCrypto from "../../modal/SellCrypto";
import Favorites from "./Favorites";

import OrderHistory from "../../modal/OrderHistory";

import { PortfolioChart, CheckPositiveNumber } from "../../../utils";
import LoadingIcon from "../../../assets/icon/LoadingIcon";
import DeleteIcon from "../../../assets/icon/DeleteIcon";
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

  function reset() {
    setInfo([]);
    setRate([]);
    setTotal(0);
    setTotalRate(0);
    setWallet([]);
    setCoins([]);
  }

  useEffect(() => {
    reset();
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfolyo]);

  const handleDelete = (id) => {
    const data = portfolyo.find((c) => c.coin === id);
    deletePortfolyo(data.id);
  };

  return (
    <div className="portfolio-bg">
      <div className="pt-5 max-w-7xl mx-auto relative mt-10">
        {
          <div className="w-full border shadow-md p-5 rounded-lg font-bold flex items-center justify-between">
            <span className="text-sm md:text-sm lg:text-lg xl:text-lg">
              Hesap Bakiyesi :{" "}
              <span className="text-gray-500">
                {total && total.toFixed(2)}$
              </span>
            </span>
            <span className="text-sm md:text-sm lg:text-lg xl:text-lg">
              Kar/Zarar :{" "}
              {totalRate > 0 ? (
                <span className="text-green-400">{totalRate.toFixed(2)} $</span>
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
        <div className="text-xs lg:text-sm px-12 md:px-4 mt-4 flex flex-col">
          <div className="-mx-10 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="round ring-black ring-opacity-5 md:rounded-lg pb-12">
                {loading ? (
                  <div role="status">
                    <h1 className="my-2">Yükleniyor...</h1>
                    <LoadingIcon />
                  </div>
                ) : (
                  <>
                    {info.length > 0 ? (
                      <table className="min-w-full divide-y ">
                        <thead className="bg-white  ">
                          <tr className="text-center text-sm font-semibold text-gray-900">
                            <th
                              scope="col"
                              className="whitespace-nowrap py-3.5 pl-4 pr-3"
                            >
                              Coin
                            </th>
                            <th
                              scope="col"
                              className="whitespace-nowrap px-1 py-3.5"
                            >
                              Miktar
                            </th>
                            <th
                              scope="col"
                              className="whitespace-nowrap px-1 py-3.5"
                            >
                              Bakiye($)
                            </th>
                            <th
                              scope="col"
                              className="whitespace-nowrap px-1 py-3.5"
                            >
                              Alım Fiyatı
                            </th>
                            <th
                              scope="col"
                              className="whitespace-nowrap px-1 py-3.5"
                            >
                              Güncel Fiyat
                            </th>
                            <th
                              scope="col"
                              className="whitespace-nowrap px-1 py-3.5"
                            >
                              Kar / Zarar Miktarı
                            </th>
                            <th
                              scope="col"
                              className="whitespace-nowrap px-1 py-3.5"
                            >
                              Kar / Zarar (%)
                            </th>
                            <th
                              scope="col"
                              className="whitespace-nowrap px-1 py-3.5 text-center"
                            >
                              İşlemler
                            </th>
                          </tr>
                        </thead>

                        <tbody className=" divide-white ">
                          {info.map((item, index) => (
                            <tr
                              key={item.id}
                              className="hover:drop-shadow-2xl hover:shadow-md hover:bg-gray-100 duration-300 ease-in-out shadow-inner"
                            >
                              <td className=" whitespace-nowrap  py-4 pl-4 pr-3 text-sm sm:pl-6">
                                <div className="flex items-center">
                                  <div className="h-10 w-10">
                                    <img
                                      className="h-8 w-8 rounded-full"
                                      src={item.image.small}
                                      alt=""
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-gray-900 font-bold">
                                      <Link to={`/markets/${item.id}`}>
                                        {item.name}
                                        <span className="uppercase text-xs text-gray-500 m-1">
                                          {item.symbol}
                                        </span>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="price whitespace-nowrap px-3 py-4 text-sm">
                                <div className="">
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
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {item.coin_price_usd}$
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <div className="text-gray-900">
                                  {item.market_data.current_price.usd}$
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <div className="text-gray-900">
                                  {(
                                    (item.market_data.current_price.usd -
                                      item.coin_price_usd) *
                                    item.buy_total_crypto
                                  ).toFixed(2)}
                                  $
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <div className="text-sm">
                                  <CheckPositiveNumber
                                    number={
                                      ((item.market_data.current_price.usd -
                                        item.coin_price_usd) *
                                        100) /
                                      item.coin_price_usd
                                    }
                                  />
                                </div>
                              </td>
                              <td className="p-1">
                                <button className="hover:bg-green-400 hover:text-white border bg-white shadow-md rounded-lg my-1 w-full">
                                  <BuyCrypto
                                    cryptoID={portfolyo && item.id}
                                  ></BuyCrypto>
                                </button>
                                <button className="hover:bg-red-400 hover:text-white border bg-white shadow-md rounded-lg my-1 w-full">
                                  <SellCrypto
                                    cryptoID={portfolyo && item.id}
                                  ></SellCrypto>
                                </button>
                              </td>
                              <td>
                                <div className="flex flex-col">
                                  <a
                                    onClick={(e) => handleDelete(item.id)}
                                    className="hover:bg-red-300 hover:text-red-900 p-2 rounded-md text-base flex justify-center font-medium"
                                  >
                                    <DeleteIcon />
                                  </a>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      // <PortfolyoTableMobileDesign data={info} portfolyo={portfolyo} handleDelete={handleDelete}  />
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
        <Favorites />
      </div>
    </div>
  );
}

export default Portfolyo;
