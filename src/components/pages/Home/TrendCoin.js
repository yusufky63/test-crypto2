import React from "react";
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";
import CheckPositiveNumber from "../../utils/CheckPositiveNumber";
import { NavLink } from "react-router-dom";
import "react-alice-carousel/lib/alice-carousel.css";

function TrendCoin({ crypto, symbol }) {
  return (
    <div>
    
      <div className="slide-in-left flex justify-center max-w-7xl mx-auto flex-wrap  grid-cols-3 gap-8 xl:gap-20 lg:gap-16 md:gap-12 mb-10">
        {crypto.map((coin) => (
          <div
          
            key={coin.id}
            className="top-coins rounded-lg p-7 bg-white  relative "
          >
            <span className="absolute left-0 top-0 bg-yellow-500 text-white  rounded-r text-sm px-2">
              {coin.market_cap_rank}
            </span>
            <div className="flex items-center">
              {" "}
              <img
                src={coin.image}
                width="50"
                alt="coin"
                className="card-img mr-2"
              />
              <NavLink to={`/allcoins/${coin.id}`}>
              <h1 className="sm:text-sm md:text-base lg:text-lg xl:text-lg text-sm">  {coin.name}</h1>
                <span className="uppercase text-xs text-gray-500">
                  {coin.symbol}
                </span>
              </NavLink>
            </div>
            <br />
            <div className="flex items-center justify-between max-w-sm">
            <h1 className="sm:text-sm md:text-base lg:text-lg xl:text-lg text-base font-bold">
                {symbol}
                {coin.current_price}
              </h1>
              <CheckPositiveNumber number={coin.price_change_percentage_24h} />
            </div>
            <div className="mx-10 mt-10 mb-6">
              <Sparklines
                svgHeight={30}
                width={40}
                height={40}
                margin={-40}
                data={coin.sparkline_in_7d.price}
              >
                <SparklinesLine style={{ fill: "none" }} />
                <SparklinesSpots />
              </Sparklines>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrendCoin;
