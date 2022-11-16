import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CryptoState } from "../redux/CryptoContext";
import axios from "axios";
import { Pagination, LinearProgress } from "@mui/material";
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { CoinList } from "../../services/Api";
import CheckPositiveNumber from "../utils/CheckPositiveNumber";
import numberWithCommas from "../utils/convertCurrency";
import { addCrypto, deleteCrypto } from "../../services/firebase";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import BuyCrypto from "../modal/BuyCrypto";
import SellCrypto from "../modal/SellCrypto";

function AllCoins() {
  const { user } = useSelector((state) => state.auth);
  const { favori } = useSelector((state) => state.favorites);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currency, symbol } = CryptoState();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filteredCoins, setFilteredCoins] = useState([]);


  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency, 100));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  
  useEffect(() => {
    setFilteredCoins(
      coins.filter((coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase())
      )
    );
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

  return (
    <div>
      <>
        <header>
          <h1 className="text-3xl text-center  text-gray-800 my-8">
            TOP <b>100</b>  COIN
          </h1>

          <div>
            <input
              type="text"
              placeholder="Arama"
              className="search w-3/4 text-center p-2 px-5 outline-none border rounded-lg shadow-lg md:4/6 lg:w-3/6  xl:w-2/6  mx-auto"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </header>

        <div className=" px-4  lg:px-8 pt-5 max-w-7xl mx-auto sm:px-6 ">
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
                              className="py-3.5 pl-4 pr-3  text-sm font-semibold text-gray-900 0"
                            >
                              Favori
                            </th>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3  text-sm font-semibold text-gray-900 "
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
                            <th
                              scope="col"
                              className="px-1  py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              7 Günlük Değişim
                            </th>
                          </tr>
                        </thead>

                        <tbody className=" divide-y divide-gray-200 bg-white ">
                          {filteredCoins
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
                                  <button className="border bg-white rounded-lg my-1 p-1 px-5 w-full">
                                    <BuyCrypto cryptoID={item.id}></BuyCrypto>
                                  </button>
                                  <button className="border bg-white rounded-lg p-1 my-1 px-5 w-full">
                                    <SellCrypto cryptoID={item.id}></SellCrypto>
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                      <Pagination
                        count={Number((filteredCoins?.length / 20).toFixed(0))}
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

export default AllCoins;
