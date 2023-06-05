import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  addFavoritesCrypto,
  deleteFavoritesCrypto,
} from "../../../services/Firebase/FirebasePortfolyoAndFavorites";
import NumberWithCommas from "../../../utils/NumberWithCommas";
import CheckPositiveNumber from "../../../utils/CheckPositiveNumber";
import { Link } from "react-router-dom";
import axios from "axios";
import { CryptoState } from "../../../redux/CryptoContext";
import { SingleCoin } from "../../../services/Api";
import BuyCrypto from "../../modal/BuyCrypto";
import SellCrypto from "../../modal/SellCrypto";
import AddFavorites from "../../../utils/AddFavorites";
import LoadingIcon from "../../../assets/icon/LoadingIcon";
export default function Favorites() {
  const { currency, symbol } = CryptoState();
  const { user } = useSelector((state) => state.auth);
  const { favori } = useSelector((state) => state.favorites);

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const currencyEdit = currency.toLowerCase();
  const fetchCoins = () => {
    setLoading(true);
    favori.map(async (name) => {
      await axios
        .get(SingleCoin(name.name))
        .then((res) => {
          setCoins((prev) => [...prev, res.data]);
        })
        .catch((err) => console.log(err));
    });
    setLoading(false);
  };

  useEffect(() => {
    setCoins([]);
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favori, currency]);

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
    <div className="">
      <div className="px-12 md:px-4 mt-4 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              {loading ? (
                <div role="status">
                  <h1 className="my-2">Yükleniyor...</h1>
                  <LoadingIcon />
                </div>
              ) : (
                <>
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50 ">
                      <tr className="text-center">
                        <th
                          scope="col"
                          className="px-1  py-3.5  text-sm font-semibold text-gray-900"
                        >
                          Favori
                        </th>
                        <th
                          scope="col"
                          className="px-1  py-3.5  text-sm font-semibold text-gray-900"
                        >
                          Coin
                        </th>
                        <th
                          scope="col"
                          className="px-1  py-3.5  text-sm font-semibold text-gray-900"
                        >
                          Fiyat
                        </th>
                        <th
                          scope="col"
                          className="whitespace-nowrap px-1  py-3.5  text-sm font-semibold text-gray-900"
                        >
                          ( 24S) Değişim
                        </th>
                        <th
                          scope="col"
                          className="px-1  py-3.5 text-center text-sm font-semibold text-gray-900"
                        >
                          24 Saatlik Hacim
                        </th>
                        <th
                          scope="col"
                          className="px-1  py-3.5 text-center text-sm font-semibold text-gray-900"
                        >
                          İşlemler
                        </th>
                      </tr>
                    </thead>

                    <tbody className=" divide-y divide-gray-200 bg-white  ">
                      {coins.map((item) => (
                        <tr
                          id="priceT"
                          className="hover:drop-shadow-2xl hover:shadow-md hover:bg-gray-100  duration-300 ease-in-out "
                          key={item.id}
                        >
                          <td onClick={(e) => handleSavedCoin(e, item.id)}>
                            <AddFavorites id={item.id} />
                          </td>
                          {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="text-gray-900">
                              {item.market_data.market_cap_rank}
                            </div>
                          </td> */}
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={item.image.small}
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="  text-gray-900 font-bold ">
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
                          <td className=" price whitespace-nowrap px-3 py-4 text-sm ">
                            <div className="">
                              {symbol}
                              {item.market_data.current_price[currencyEdit]}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="text-gray-900">
                              <CheckPositiveNumber
                                number={
                                  item.market_data.price_change_percentage_24h
                                }
                              />
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="text-gray-900">
                              {symbol}
                              {NumberWithCommas(
                                item.market_data.total_volume[currencyEdit]
                              )}
                            </div>
                          </td>
                          <td className="p-1">
                            <button className="border hover:bg-green-400 shadow-md rounded-full my-1 w-2/3">
                              <BuyCrypto cryptoID={item.id}></BuyCrypto>
                            </button>
                            <button className="border hover:bg-red-400 shadow-md rounded-full  my-1   w-2/3">
                              <SellCrypto cryptoID={item.id}></SellCrypto>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
