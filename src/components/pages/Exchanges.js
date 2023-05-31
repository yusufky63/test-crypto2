import { useState, useEffect } from "react";
import axios from "axios";
import { TopExchanges } from "../../services/Api";
import NumberWithCommas from "../../utils/NumberWithCommas";
import LoadingIcon from "../../assets/icon/LoadingIcon";
import OtherSiteDirectIcon from "../../assets/icon/OtherSiteDirectIcon";

function Exchanges() {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(10);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const getExchanges = async () => {
    setLoading(true);
    const { data } = await axios.get(TopExchanges(count));
    setExchanges(data);
    setLoading(false);
  };
  useEffect(() => {
    getExchanges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  useEffect(() => {
    setFilter(
      exchanges.filter((exchange) =>
        exchange.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, exchanges]);
  return (
    <div className="">
      <div>
        <h1 className="font-bold xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-3xl my-8 flex justify-center  items-center">
          Borsalar TOP
          <span
            className="inline-flex items-center py-2 px-3 mx-2 xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl text-xl font-medium text-center text-white bg-red-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-blue-700 dark:focus:ring-red-800"
            rel="noreferrer"
          >
            {count}
          </span>
        </h1>
      </div>

      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Arama"
          className="search w-3/4 text-center p-2 px-5 outline-none border rounded-lg shadow-md lg:w-3/6  xl:w-2/6 "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-2 px-3   outline-none border rounded-lg shadow-md"
          onChange={(e) => setCount(e.target.value)}
          value={count}
          name=""
          id=""
        >
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      <div className=" px-6  lg:px-8 pt-5 max-w-7xl mx-auto sm:px-6 ">
        <div className="mt-4 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow   md:rounded-lg">
                {loading ? (
                  <div role="status">
                    <LoadingIcon />
                  </div>
                ) : (
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50 ">
                      <tr className="text-center">
                        <th
                          scope="col"
                          className="whitespace-nowrap px-1  py-3.5  text-sm font-semibold text-gray-900 "
                        ></th>

                        <th
                          scope="col"
                          className="whitespace-nowrap px-1  py-3.5 text-left pl-8 text-sm font-semibold text-gray-900"
                        >
                          Borsa
                        </th>
                        <th
                          scope="col"
                          className="whitespace-nowrap px-1  py-3.5  text-sm font-semibold text-gray-900"
                        >
                          Trust Score
                        </th>
                        <th
                          scope="col"
                          className="whitespace-nowrap px-1  py-3.5  text-sm font-semibold text-gray-900"
                        >
                          24 Saatlik BTC Hacmi
                        </th>
                        <th
                          scope="col"
                          className="whitespace-nowrap px-1  py-3.5  text-sm font-semibold text-gray-900"
                        >
                          Kuruluş Tarihi
                        </th>
                        <th
                          scope="col"
                          className="whitespace-nowrap px-1  py-3.5  text-sm font-semibold text-gray-900"
                        >
                          Bulunduğu Ülke
                        </th>
                        <th
                          scope="col"
                          className="px-1  py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Ayrıntılar
                        </th>
                      </tr>
                    </thead>

                    <tbody className=" divide-y divide-gray-200 bg-white ">
                      {filter &&
                        filter.map((item) => (
                          <tr
                            id="priceT"
                            className="hover:drop-shadow-2xl hover:shadow-md hover:bg-gray-100 "
                            key={item.id}
                          >
                            <td className="whitespace-nowrap px-1 py-4 text-sm text-gray-500">
                              <div className="text-gray-900">
                                {item.trust_score_rank}
                              </div>
                            </td>
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
                                    {item.name}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className=" price whitespace-nowrap px-3 py-4 text-sm ">
                              {item.trust_score < 7 ? (
                                <span className=" p-1 px-4  bg-red-600 rounded-lg text-white">
                                  {item.trust_score}
                                </span>
                              ) : (
                                <span className=" p-1  px-4   bg-green-600 rounded-lg text-white">
                                  {item.trust_score}
                                </span>
                              )}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="text-gray-900">
                                <span className="text-yellow-400">฿</span>
                                {NumberWithCommas(item.trade_volume_24h_btc)}
                              </div>
                            </td>
                            <td className=" whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="text-gray-900">
                                {item.year_established}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="text-gray-900">
                                {item.country}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="text-gray-900">
                                <a
                                  href={item.url}
                                  rel="noreferrer"
                                  target="_blank"
                                  className="flex justify-between bg-gray-600 text-white text-center p-2  hover:bg-gray-300 hover:text-black  shadow-lg rounded-md   "
                                >
                                  <span>Git</span>
                                  <span className="text-end">
                                    <OtherSiteDirectIcon />
                                  </span>
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Exchanges;
