import React from "react";
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";
import CheckPositiveNumber from "../../../utils/CheckPositiveNumber";
import { NavLink } from "react-router-dom";
import TrendSkeleton from "../../../utils/design/TrendSkeleton";
import "react-alice-carousel/lib/alice-carousel.css";
import { motion } from "framer-motion";
import NumberWithCommas from "../../../utils/NumberWithCommas";

function TrendCoin({ crypto, symbol, loading }) {
  return (
    <>
      <motion.h1
        className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl mt-20"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Trend Coinler
      </motion.h1>
      <div className="flex justify-center bg">
        <div>
          <motion.div
            className="slide-in-left flex justify-center max-w-7xl mx-auto flex-wrap grid-cols-3 gap-8 xl:gap-20 lg:gap-16 md:gap-12 mb-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            {!loading ? (
              crypto.map((coin) => (
                <motion.div
                  key={coin.id}
                  className=" top-coins rounded-lg p-7 w-48 bg-white relative duration-500 ease-in-out transform hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="absolute left-0 top-0 bg-yellow-500 text-white rounded text-sm px-2">
                    {coin.market_cap_rank}
                  </span>
                  <div className="flex items-center">
                    <img
                      src={coin.image}
                      width="40"
                      alt="coin"
                      className="card-img mr-2"
                    />
                    <NavLink to={`/markets/${coin.id}`}>
                      <h1 className="text-xs sm:text-base  ">
                        {coin.name}
                      </h1>
                      <span className="uppercase text-xs text-gray-500">
                        {coin.symbol}
                      </span>
                    </NavLink>
                  </div>
                  <br />
                  <div className="flex items-center justify-between max-w-md">
                    <h1 className="text-sm sm:text-base  font-bold">
                      {symbol}
                      {NumberWithCommas(coin.current_price)}
                    </h1>
                    <CheckPositiveNumber
                      number={coin.price_change_percentage_24h}
                    />
                  </div>
                  <div className="sm:m-6 md:m-8 lg:m-10 xl:m-10 m-10 mb-6">
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
                </motion.div>
              ))
            ) : (
              <TrendSkeleton />
            )}
          </motion.div>
        </div>
      </div>
    </> 
  );
}

export default TrendCoin;
