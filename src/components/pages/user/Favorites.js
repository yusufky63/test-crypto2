import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { addCrypto, deleteCrypto } from "../../../services/firebase";
import NumberWithCommas from "../../utils/NumberWithCommas";
import CheckPositiveNumber from "../../utils/CheckPositiveNumber";
import { Link } from "react-router-dom";
import axios from "axios";
import { CryptoState } from "../../redux/CryptoContext";
import { SingleCoin } from "../../../services/Api";
import BuyCrypto from "../../modal/BuyCrypto";
import SellCrypto from "../../modal/SellCrypto";
import AddFavorites from "../../utils/AddFavorites";
export default function Favorites() {
  const { currency, symbol } = CryptoState();
  const { user } = useSelector((state) => state.auth);
  const { favori } = useSelector((state) => state.favorites);

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

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
      addCrypto({
        name: id,
        uid: user.uid,
      });
    } else {
      deleteCrypto(data.id);
    }
  };


  return (
    <div className="">
      {" "}
      <div className="px-12 mt-4 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5   md:rounded-lg">
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
                        {/* <th
                          scope="col"
                          className="px-1  py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Ayrıntılar
                        </th> */}
                      </tr>
                    </thead>

                    <tbody className=" divide-y divide-gray-200 bg-white  ">
                      {coins.map((item) => (
                        <tr
                          id="priceT"
                          className="hover:bg-gray-100 hover:px-10 "
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
                              {symbol}
                              {item.market_data.current_price[currency]}
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
                                item.market_data.total_volume[currency]
                              )}
                            </div>
                          </td>
                          <td className="p-1">
                            <button className="border hover:bg-green-400 shadow-md rounded-lg my-1 p-1 px-5 w-full">
                              <BuyCrypto cryptoID={item.id}></BuyCrypto>
                            </button>
                            <button className="border hover:bg-red-400 shadow-md rounded-lg p-1 my-1 px-5 w-full">
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
