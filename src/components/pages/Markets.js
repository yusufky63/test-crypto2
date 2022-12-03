import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CryptoState } from "../redux/CryptoContext";
import axios from "axios";
import { Pagination, LinearProgress } from "@mui/material";
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { CoinList, GlobalData } from "../../services/Api";
import CheckPositiveNumber from "../utils/CheckPositiveNumber";
import numberWithCommas from "../utils/convertCurrency";
import { addCrypto, deleteCrypto } from "../../services/firebase";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import BuyCrypto from "../modal/BuyCrypto";
import SellCrypto from "../modal/SellCrypto";
import { useMemo } from "react";

function Markets() {
  const { user } = useSelector((state) => state.auth);
  const { favori } = useSelector((state) => state.favorites);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currency, symbol } = CryptoState();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  // const [filteredCoins, setFilteredCoins] = useState([]);
  const [globalData, setGlobalData] = useState([]);
  const [count, setCount] = useState(50);
  const currencyEdit = currency.toLowerCase();
  const [err, setErr] = useState(false);

  const fetchCoins = async () => {
    const { data } = await axios
      .get(CoinList(currency, count))
      .catch((err) => setErr(true));
    setCoins(data);
    setErr(false);
  };
  const fetchGlobalData = async () => {
    const { data } = await axios.get(GlobalData());
    setGlobalData(data.data);
  };
  useEffect(() => {
    fetchGlobalData();
  }, [globalData]);

  useEffect(() => {
    setLoading(true);
    fetchCoins();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, currency, page]);

  const filteredCoins = useMemo(() => {
    if (coins) {
      return coins.filter((coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase())
      );
    }
  }, [coins, search]);

  const handleSavedCoin = (e, id) => {
    e.preventDefault();
    if (user) {
      const data = favori.find((item) => item.name === id);
      if (!data) {
        addCrypto({
          name: id,
          uid: user.uid,
        });
      } else {
        deleteCrypto(data.id);
      }
    } else {
      toast.warning("Lütfen Giriş Yapınız !");
    }
  };

  function controlFavorites(id) {
    const data = favori.find((item) => item.name === id);
    if (data) {
      return <AiTwotoneHeart fontSize={25} color="red"></AiTwotoneHeart>;
    } else {
      return <AiOutlineHeart fontSize={25} color="black"></AiOutlineHeart>;
    }
  }

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div>
      <>
        <div className=" px-6  lg:px-8 pt-5 max-w-7xl mx-auto sm:px-6 ">
          {err && (
            <span className=" items-center text-yellow-500 flex justify-end">
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                ></path>
              </svg>
              <span className="m-2">Veri Hatası Sayfayı Yenileyin ! </span>
              <button
                onClick={handleRefresh}
                className="border text-green-500 p-2 shadow-md rounded-lg active:bg-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </button>
            </span>
          )}
          <header className="flex flex-col justify-center">
            <div>
              {" "}
              <h1 className="text-4xl text-left my-10  p-3 shadow-md rounded-lg flex justify-between items-center ">
                Piyasa
                {globalData.active_cryptocurrencies && (
                  <div className=" whitespace-nowrap justify-around text-xs font-normal text-gray-600 mt-2 hidden md:block">
                    <span className="p-1">
                      Coinler :{" "}
                      <span className="text-indigo-500">
                        {" "}
                        {globalData.active_cryptocurrencies}{" "}
                      </span>
                    </span>
                    <span className="p-1">
                      Borsalar :{" "}
                      <span className="text-indigo-500">
                        {globalData.ended_icos}
                      </span>
                    </span>
                    <span className="p-1">
                      Piyasa Değeri :
                      <span className="text-indigo-500">
                        {" "}
                        {symbol}
                        {numberWithCommas(
                          globalData.total_market_cap[currencyEdit]
                        )}
                      </span>
                    </span>
                    <span className="p-2">
                      24 Saatlik Hacim :{" "}
                      <span className="text-indigo-500">
                        {symbol}
                        {numberWithCommas(
                          globalData.total_volume[currencyEdit]
                        )}
                      </span>
                    </span>
                  </div>
                )}
              </h1>
            </div>

            <div className="flex">
              <input
                type="text"
                placeholder="Arama"
                className=" w-3/4 text-center p-2 px-5 outline-none border rounded-lg shadow-lg md:4/6 lg:w-3/6  xl:w-2/6  mx-auto"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                className="p-2 px-3  justify-end  outline-none border rounded-lg shadow-xl"
                onChange={(e) => setCount(e.target.value)}
                value={count}
                name=""
                id=""
              >
                <option value={10}>10</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={250}>250</option>
              </select>
            </div>
          </header>
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5   md:rounded-lg">
                  {loading ? (
                    <LinearProgress color="secondary" />
                  ) : (
                    <>
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50 ">
                          <tr className="text-center">
                            <th
                              scope="col"
                              className="whitespace-nowrap px-1  py-3.5  text-sm font-semibold text-gray-900 "
                            ></th>
                            {/* <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3  text-sm font-semibold text-gray-900 "
                            >
                              Rank
                            </th> */}
                            <th
                              scope="col"
                              className="whitespace-nowrap px-1  py-3.5 text-left pl-8 text-sm font-semibold text-gray-900"
                            >
                              Coin
                            </th>
                            <th
                              scope="col"
                              className="whitespace-nowrap px-1  py-3.5  text-sm font-semibold text-gray-900"
                            >
                              Fiyat
                            </th>
                            <th
                              scope="col"
                              className="whitespace-nowrap px-1  py-3.5  text-sm font-semibold text-gray-900"
                            >
                              24 Saatlik Değişim
                            </th>
                            <th
                              scope="col"
                              className="whitespace-nowrap px-1  py-3.5  text-sm font-semibold text-gray-900"
                            >
                              Piyasa Değeri
                            </th>
                            <th
                              scope="col"
                              className="whitespace-nowrap px-1  py-3.5  text-sm font-semibold text-gray-900"
                            >
                              Toplam Arz
                            </th>
                            <th
                              scope="col"
                              className="px-1  py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              24 Saatlik Hacim
                            </th>
                            <th
                              scope="col"
                              className="px-1  py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              7 Günlük Değişim
                            </th>
                          </tr>
                        </thead>

                        <tbody className=" divide-y divide-gray-200 bg-white ">
                          {filteredCoins &&
                            filteredCoins
                              .slice((page - 1) * 20, (page - 1) * 20 + 20)
                              .map((item) => (
                                <tr
                                  id="priceT"
                                  className="hover:drop-shadow-2xl hover:shadow-md hover:bg-gray-100 "
                                  key={item.id}
                                >
                                  <td
                                    onClick={(e) => handleSavedCoin(e, item.id)}
                                  >
                                    {controlFavorites(item.id)}
                                  </td>
                                  {/* <td className="whitespace-nowrap px-1 py-4 text-xs text-gray-500">
                                  <div className="text-gray-900">
                                    {item.market_cap_rank}
                                  </div>
                                </td> */}
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                    <div className="flex items-center">
                                      <div className="h-8 w-8 flex-shrink-0">
                                        <img
                                          className="h-8 w-8 rounded-full"
                                          src={item.image}
                                          alt=""
                                        />
                                      </div>
                                      <div className="ml-4">
                                        <div className=" text-gray-900 font-bold ">
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
                                      {item.current_price}
                                    </div>
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <div className="text-gray-900">
                                      <CheckPositiveNumber
                                        number={
                                          item.price_change_percentage_24h
                                        }
                                      />
                                    </div>
                                  </td>
                                  <td className=" whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <div className="text-gray-900">
                                      {symbol}
                                      {numberWithCommas(item.market_cap)}
                                    </div>
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <div className="text-gray-900">
                                      {numberWithCommas(item.total_supply)}
                                    </div>
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <div className="text-gray-900">
                                      {symbol}
                                      {numberWithCommas(item.total_volume)}
                                    </div>
                                  </td>
                                  <td className="px-10 mx-20 py-4">
                                    <Sparklines
                                      svgHeight={30}
                                      width={50}
                                      height={90}
                                      margin={-30}
                                      data={item.sparkline_in_7d.price}
                                    >
                                      <SparklinesLine style={{ fill: "" }} />
                                      <SparklinesSpots />
                                    </Sparklines>
                                  </td>
                                  <td className="p-1">
                                    <button className="border hover:bg-green-400 hover:text-white text-white shadow-md rounded-lg my-1 p-1 px-5 w-full">
                                      <BuyCrypto cryptoID={item.id}></BuyCrypto>
                                    </button>
                                    <button className="border hover:bg-red-400 hover:text-white text-red-900 shadow-md rounded-lg p-1 my-1 px-5 w-full">
                                      <SellCrypto
                                        cryptoID={item.id}
                                      ></SellCrypto>
                                    </button>
                                  </td>
                                </tr>
                              ))}
                        </tbody>
                      </table>
                      {filteredCoins && (
                        <Pagination
                          count={Number(
                            (filteredCoins?.length / 20).toFixed(0)
                          )}
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
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default Markets;
