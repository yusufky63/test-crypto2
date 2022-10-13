import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CryptoState } from "../context/CryptoContext";
import axios from "axios";
import { Pagination, LinearProgress } from "@mui/material";

import { CoinList } from "../../services/Api";
import CheckPositiveNumber from "../utils/CheckPositiveNumber";
import convertToInternationalCurrencySystem from "../utils/convertCurrency";
function AllCoins() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currency, symbol } = CryptoState();
  const [page, setPage] = useState(1);
  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));

    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const [search, setSearch] = useState("");
  const [filteredCoins, setFilteredCoins] = useState([]);

  useEffect(() => {
    setFilteredCoins(
      coins.filter((coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [coins, search]);

  console.log(filteredCoins);
  return (
    <div>
      <>
        <header>
          <h1 className="text-3xl text-center font-bold text-gray-800 my-5">
            TOP 100 COIN
          </h1>

          <div>
          
            <input
              type="text"
              placeholder="Arama"
              className="search w-3/4 text-center p-3 outline-none border rounded-full lg:w-2/4  mx-auto"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </header>
     
        <div className=" px-4  lg:px-8 pt-5 max-w-7xl mx-auto sm:px-6">
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5   md:rounded-lg">
                  {loading ? (
                    <LinearProgress color="secondary" />
                  ) : (
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50 ">
                        <tr className="text-center">
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3  text-sm font-semibold text-gray-900 0"
                          >
                            Favori
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3  text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            Rank
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
                            className="px-1  py-3.5  text-sm font-semibold text-gray-900"
                          >
                           ( 24S) Değişim
                          </th>
                          <th
                            scope="col"
                            className="px-1  py-3.5  text-sm font-semibold text-gray-900"
                          >
                            Piyasa Değeri
                          </th>
                          <th
                            scope="col"
                            className="px-1  py-3.5  text-sm font-semibold text-gray-900"
                          >
                            Toplam Arz
                          </th>
                          <th
                            scope="col"
                            className="px-1  py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            24 Saatlik Hacim
                          </th>
                        </tr>
                      </thead>

                      <tbody className=" divide-y divide-gray-200 bg-white ">
                        {filteredCoins
                          .slice((page - 1) * 20, (page - 1) * 20 + 20)
                          .map((item) => (
                            <tr
                              id="priceT"
                              className="hover:bg-gray-100 hover:px-10 "
                              key={item.id}
                            >
                              <td>{Fav()}</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <div className="text-gray-900">
                                  {item.market_cap_rank}
                                </div>
                              </td>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                <div className="flex items-center">
                                  <div className="h-10 w-10 flex-shrink-0">
                                    <img
                                      className="h-10 w-10 rounded-full"
                                      src={item.image}
                                      alt=""
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <div className="  text-gray-900 font-bold ">
                                      <Link to={`/allcoins/${item.id}`}>
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
                                  {item.current_price}
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <div className="text-gray-900">
                                  <CheckPositiveNumber
                                    number={item.price_change_percentage_24h}
                                  />
                                </div>
                              </td>
                              <td className=" whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <div className="text-gray-900">
                                  {symbol}
                                  {convertToInternationalCurrencySystem(
                                    item.market_cap
                                  )}
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <div className="text-gray-900">
                                  {convertToInternationalCurrencySystem(
                                    item.total_supply
                                  )}
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <div className="text-gray-900">
                                  {symbol}
                                  {convertToInternationalCurrencySystem(
                                    item.total_volume
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  )}
                  <Pagination
                    count={(filteredCoins?.length / 20).toFixed(0)}
                    variant="outlined"
                    shape="rounded"
                    color="warning"
                    style={{
                      padding: 30,

                      display: "flex",
                      justifyContent: "center",
                    }}
                    onChange={(_, value) => {
                      setPage(value);
                      window.scroll(0, 450);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default AllCoins;

const Fav = () => {
  return (
    <div id="main-content">
      <div>
        <input type="checkbox" id="checkbox" />
        <label for="checkbox">
          <svg
            id="heart-svg"
            viewBox="467 392 58 57"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              id="Group"
              fill="none"
              fill-rule="evenodd"
              transform="translate(467 392)"
            >
              <path
                d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
                id="heart"
                fill="#AAB8C2"
              />
              <circle
                id="main-circ"
                fill="#E2264D"
                opacity="0"
                cx="29.5"
                cy="29.5"
                r="1.5"
              />

              <g id="grp7" opacity="0" transform="translate(7 6)">
                <circle id="oval1" fill="#9CD8C3" cx="2" cy="6" r="2" />
                <circle id="oval2" fill="#8CE8C3" cx="5" cy="2" r="2" />
              </g>

              <g id="grp6" opacity="0" transform="translate(0 28)">
                <circle id="oval1" fill="#CC8EF5" cx="2" cy="7" r="2" />
                <circle id="oval2" fill="#91D2FA" cx="3" cy="2" r="2" />
              </g>

              <g id="grp3" opacity="0" transform="translate(52 28)">
                <circle id="oval2" fill="#9CD8C3" cx="2" cy="7" r="2" />
                <circle id="oval1" fill="#8CE8C3" cx="4" cy="2" r="2" />
              </g>

              <g id="grp2" opacity="0" transform="translate(44 6)">
                <circle id="oval2" fill="#CC8EF5" cx="5" cy="6" r="2" />
                <circle id="oval1" fill="#CC8EF5" cx="2" cy="2" r="2" />
              </g>

              <g id="grp5" opacity="0" transform="translate(14 50)">
                <circle id="oval1" fill="#91D2FA" cx="6" cy="5" r="2" />
                <circle id="oval2" fill="#91D2FA" cx="2" cy="2" r="2" />
              </g>

              <g id="grp4" opacity="0" transform="translate(35 50)">
                <circle id="oval1" fill="#F48EA7" cx="6" cy="5" r="2" />
                <circle id="oval2" fill="#F48EA7" cx="2" cy="2" r="2" />
              </g>

              <g id="grp1" opacity="0" transform="translate(24)">
                <circle id="oval1" fill="#9FC7FA" cx="2.5" cy="3" r="2" />
                <circle id="oval2" fill="#9FC7FA" cx="7.5" cy="2" r="2" />
              </g>
            </g>
          </svg>
        </label>
      </div>
    </div>
  );
};
