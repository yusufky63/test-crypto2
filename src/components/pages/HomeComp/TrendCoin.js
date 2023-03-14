import React from "react";
import {Sparklines, SparklinesLine, SparklinesSpots} from "react-sparklines";
import CheckPositiveNumber from "../../utils/CheckPositiveNumber";
import {NavLink} from "react-router-dom";
import TrendSkeleton from "../../utils/design/TrendSkeleton";
import "react-alice-carousel/lib/alice-carousel.css";

function TrendCoin({crypto, symbol, loading}) {
  return (
    <>
      <h1 className=" font-bold sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl text-2xl mt-20 ">
        Trend Coinler
      </h1>
      <div className="flex justify-center bg">
        <div>
          <div className="slide-in-left flex justify-center max-w-7xl mx-auto flex-wrap  grid-cols-3 gap-8 xl:gap-20 lg:gap-16 md:gap-12 mb-10  ">
            {!loading ? (
              crypto.map((coin) => (
                <div
                  key={coin.id}
                  className="top-coins rounded-lg p-7 w-48 bg-white  relative  duration-500 ease-in-out transform hover:scale-105"
                >
                  <span className="absolute left-0 top-0 bg-yellow-500 text-white  rounded text-sm px-2">
                    {coin.market_cap_rank}
                  </span>
                  <div className="flex items-center">
                    {" "}
                    <img
                      src={coin.image}
                      width="40"
                      alt="coin"
                      className="card-img mr-2"
                    />
                    <NavLink to={`/markets/${coin.id}`}>
                      <h1 className="sm:text-sm md:text-base lg:text-lg xl:text-lg text-sm">
                        {" "}
                        {coin.name}
                      </h1>
                      <span className="uppercase text-xs text-gray-500">
                        {coin.symbol}
                      </span>
                    </NavLink>
                  </div>
                  <br />
                  <div className="flex items-center justify-between max-w-md">
                    <h1 className="sm:text-sm md:text-base lg:text-lg xl:text-lg text-base font-bold">
                      {symbol}
                      {coin.current_price}
                    </h1>
                    <CheckPositiveNumber
                      number={coin.price_change_percentage_24h}
                    />
                  </div>
                  <div className=" sm:m-6 md:m-8 lg:m-10 xl:m-10 m-10 mb-6">
                    <Sparklines
                      svgHeight={30}
                      width={40}
                      height={40}
                      margin={-40}
                      data={coin.sparkline_in_7d.price}
                    >
                      <SparklinesLine style={{fill: "none"}} />
                      <SparklinesSpots />
                    </Sparklines>
                  </div>
                </div>
              ))
            ) : (
              <TrendSkeleton></TrendSkeleton>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TrendCoin;
