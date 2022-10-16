import React, { Fragment, useCallback, useEffect, useState } from "react";
import { HistoricalChart } from "../services/Api";

import { Line } from "react-chartjs-2";
import Skeleton from "react-loading-skeleton";

let chooseDays = [
  { label: "1D", value: 1 },
  { label: "1M", value: 30 },
  { label: "6M", value: 180 },
  { label: "1Y", value: 365 },
];
let priceandmktCap = [
  { label: "Prices", value: "prices" },
  { label: "MarketCap", value: "market_caps" },
];
const CoinChart = (props) => {
  const [historicalData, setHistoricalData] = useState("");
  const [isLoaded, setloadStatus] = useState(false);
  const [days, setDays] = useState(1);
  const [dataName, setData] = useState("Prices");

  const fetchingHistoricalData = useCallback(async () => {
    setloadStatus(false);
    let url = HistoricalChart(props.id, days, "usd");
    let response = await fetch(url);
    let data = await response.json();
    if (dataName === "Prices") {
      setHistoricalData(data.prices);
    } else {
      setHistoricalData(data.market_caps);
    }
    setloadStatus(true);
  }, [props.id, days, dataName]);

  useEffect(() => {
    fetchingHistoricalData();
  }, [fetchingHistoricalData]);

  const onSetdataHandler = (e) => {
    let day = +e.target.value;
    setDays(day);
  };

  const onSetDataNameHandler = (e) => {
    setData(e.target.value);
  };
  return (
    <Fragment>
      <div>
        {props.loadedStatus && (
          <p className="w-86 text-xs text-grey-600 text-left">
            {props.name} Price
          </p>
        )}
        {!props.loadedStatus && <Skeleton className="w-86 h-16 mb-2" />}
        {props.loadedStatus && (
          <div className="py-2 flex justify-between items-center">
            <h1 className="text-3xl font-bold">${props.price}</h1>
            <span
              className={`text-sm py-1 px-2 h-fit text-white rounded-md ${
                props.coinDeatiledData.prcpertf > 0
                  ? "bg-light-green-500"
                  : "bg-red-500"
              }`}
            >
              {props.market_data.market_cap_change_24h < 0 && (
                <i className="fa fa-2 fa-arrow-down"></i>
              )}
              {props.market_data.market_cap_change_24h > 0 && (
                <i className="fa fa-2 fa-arrow-up"></i>
              )}
              {props.market_cap_change_24h}%
            </span>
          </div>
        )}
        {!props.loadedStatus && <Skeleton className="w-86 h-6 mb-2" />}
        {props.loadedStatus && (
          <div className="py-2 flex justify-between items-center">
            <p className="text-xs text-grey-500">Low: ${props.low_24h}</p>

            <p className="text-xs text-grey-500">High: ${props.high_24h}</p>
          </div>
        )}
        {!props.loadedStatus && <Skeleton className="w-86 h-28 mb-2" />}
        {props.loadedStatus && (
          <div className="mb-6">
            <div className="py-1 flex justify-between items-center">
              <span className="text-xs tracking-wide text-grey-700">
                Market Cap
              </span>
              <span className="font-medium">${props.market_cap}</span>
            </div>
            <div className="py-1 flex justify-between items-center">
              <span className="text-xs tracking-wide text-grey-700">
                Volume
              </span>
              <span className="font-medium">
                ${props.coinDeatiledData.total_vol}
              </span>
            </div>
            <div className="py-1 flex justify-between items-center">
              <span className="text-xs tracking-wide text-grey-700">
                Circulating Supply
              </span>
              <span className="font-medium">
                ${props.coinDeatiledData.circulating_supply}
              </span>
            </div>
          </div>
        )}
      </div>

      {!isLoaded && <Skeleton className="w-86 h-10 mb-6" />}
      {isLoaded && (
        <div
          className={`rounded-md mb-1 flex justify-between items-center font-bold text-xs p-2 ${
            props.themeStatus === true
              ? "bg-blue-grey-100"
              : "bg-[#001e3c] text-blue-grey-700"
          }`}
        >
          <div className="flex gap-1">
            {priceandmktCap.map((option) => {
              return (
                <button
                  onClick={onSetDataNameHandler}
                  value={option.label}
                  key={option.value}
                  className={`p-1 rounded-sm cursor-pointer hover:bg-white ${
                    dataName === option.label ? "bg-white" : ""
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
          <div className="flex gap-1">
            {chooseDays.map((option) => {
              return (
                <button
                  onClick={onSetdataHandler}
                  value={option.value}
                  key={option.value}
                  className={`p-1 rounded-sm cursor-pointer hover:bg-white ${
                    days === option.value ? "bg-white" : ""
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {!isLoaded && <Skeleton className="w-86  p-2" />}
      {isLoaded && (
        <div className="rounded-xl">
          <Line
            data={{
              labels: historicalData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;

                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: historicalData.map((coin) => {
                    return coin[1];
                  }),
                  label: `${dataName} from Past ${days} days in usd`,
                  borderColor: "#1E90FF",
                  borderWidth: 1,
                  hoverBorderColor: "#002244",
                  hoverBorderJoinStyle: "round",
                  fill: true,
                  backgroundColor: "rgba(210, 228, 241, 0.8)",
                  borderJoinStyle: "round",
                },
              ],
            }}
            height={150}
            options={{
              elements: {
                point: {
                  radius: 2,
                  backgroundColor: "#002244",
                },
              },
            }}
          />
        </div>
      )}
    </Fragment>
  );
};
export default React.memo(CoinChart);
