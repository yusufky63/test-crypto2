import CheckPositiveNumber from "../components/utils/CheckPositiveNumber";
import convertToInternationalCurrencySystem from "../components/utils/convertCurrency";
import GetCryptoIcon from "../components/utils/GetCryptoIcon";
import GetRealTimePriceData from "../components/utils/GetRealTimePriceData";
import { Link } from "react-router-dom";
export default function Coins({ crypto, cryptoPrices }) {
  const updatedKeys = cryptoPrices[0] ? Object.keys(cryptoPrices[0]) : null;
  const updatedValues = cryptoPrices[0] ? Object.values(cryptoPrices[0]) : null;

  return (
    <>
      <header>
        <h1 className="text-3xl text-center font-bold text-gray-800 my-5">
          Coin List TOP 100
        </h1>
        
        <div>
          <input type="text" placeholder="Arama" className="search text-center p-3 outline-none border rounded-full " />
        </div>
      </header>

      <div className="px-4 sm:px-6 lg:px-8 pt-5 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50 ">
                    <tr className="text-center">
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3  text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Rank
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5  text-sm font-semibold text-gray-900"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5  text-sm font-semibold text-gray-900"
                      >
                        Market Cap
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5  text-sm font-semibold text-gray-900"
                      >
                        Supply
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Change(24Hr)
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 bg-white ">
                    {crypto?.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <img src="" alt="fav" />
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="text-gray-900">{item.rank}</div>
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <GetCryptoIcon coinSymbol={item.symbol} />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">
                                <Link  to={`/Coins/${item.id}`}> {item.name}</Link>
                               
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="text-red-500">
                            <GetRealTimePriceData
                              currPrice={item.priceUsd}
                              updatedIds={updatedKeys}
                              updatedPrices={updatedValues}
                              coinId={item.id}
                            />
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="text-gray-900">
                            ${" "}
                            {convertToInternationalCurrencySystem(
                              item.marketCapUsd
                            )}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="text-gray-900">
                            ${" "}
                            {convertToInternationalCurrencySystem(item.supply)}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="text-gray-900">
                            {/* {percentageFormater(item.changePercent24Hr)}% */}
                            {/* {parseFloat(item.changePercent24Hr).toFixed(2)}% */}
                            <CheckPositiveNumber
                              number={item.changePercent24Hr}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
