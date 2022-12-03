import { useState, useEffect } from "react";
import axios from "axios";
import { TopExchanges } from "../../services/Api";
import convertCurrency from "../utils/convertCurrency";

function Exchanges() {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(50);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const getExchanges = async () => {
    setLoading(true);
    const { data } = await axios.get(TopExchanges(count));
    console.log(data);
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
        <h1 className="font-bold xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-2xl my-10 flex justify-center items-center">
          Borsalar TOP{" "}
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
          className="search w-3/4 text-center p-2 px-5 outline-none border rounded-lg shadow-md md:4/6 lg:w-3/6  xl:w-2/6 "
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
      <br />
      <br />

      <ul>
        <div className=" flex justify-center  max-w-7xl mx-auto flex-wrap gap-8">
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
            </div>
          ) : (
            filter &&
            filter.map((exchange) => (
              <li className="shadow-xl  relative" key={exchange.id}>
                <h1 className="absolute  mb-8 border px-4 py-1  rounded-r-full bg-yellow-400">
                  {exchange.trust_score_rank}
                </h1>
                <div className="p-1 max-w-sm bg-white  border-gray-200 ">
                  <div className="flex justify-center mt-5">
                    {" "}
                    <img className="rounded-full" src={exchange.image} alt="" />
                  </div>

                  <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                      {exchange.name}
                    </h5>

                    <div className="text-xl ">Ülke </div>
                    <span className="mb-3  font-normal text-gray-700">
                      {exchange.country}
                    </span>
                    <br />
                    <br />
                    <div className="text-xl">24 Saatlik İşlem Hacmi</div>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      Btc : {convertCurrency(exchange.trade_volume_24h_btc)}
                    </p>

                    <div className="my-3 text-xl">Trust Score </div>
                    {exchange.trust_score < 7 ? (
                      <span className=" p-2  h-10 bg-red-600 rounded-full text-white">
                        {exchange.trust_score}
                      </span>
                    ) : (
                      <span className=" p-2  h-10 bg-green-600 rounded-full text-white">
                        {exchange.trust_score}
                      </span>
                    )}
                    <br />
                    <br />
                    <a
                      target={"_blank"}
                      href={exchange.url}
                      className="inline-flex items-center py-3 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      rel="noreferrer"
                    >
                      Borsaya Git
                      <svg
                        aria-hidden="true"
                        className="ml-2 -mr-1 w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </li>
            ))
          )}
        </div>
      </ul>
    </div>
  );
}

export default Exchanges;
