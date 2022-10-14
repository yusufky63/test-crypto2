import React from "react";
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";
import CheckPositiveNumber from "../../utils/CheckPositiveNumber";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

function TrendCoin({ crypto, symbol }) {
  return (
    <div>
      <div className=" flex justify-center  max-w-4xl mx-auto flex-wrap gap-4 mt-10">
        {
          <AliceCarousel
            autoPlay
            autoPlayStrategy="none"
            autoPlayInterval={1000}
            animationDuration={1000}
            animationType="fadeout"
            infinite
            touchTracking={false}
            
            disableButtonsControls
            responsive={responsive}
          >
            {crypto.map((coin) => (
              <div
                data-value={coin.market_cap_rank}
                key={coin.id}
                className="border rounded-lg p-5 w-52 bg-white"
              >
                <div className="card-body">
                  <div className="flex  items-center justify-center">
                    <img
                      src={coin.image}
                      width="50"
                      alt="coin"
                      className="card-img"
                    />
                    <h5 className="ml-1 card-title font-bold text-xl">
                      {coin.name}
                    </h5>
                  </div>
                  <br />
                  <span className="font-medium text-gray-500 uppercase">
                    {coin.symbol}
                  </span>
                  <br />

                  <div className=" m-5 ml-10 item-center">
                    <h5 className="card-title text-xl">
                      {symbol}
                      {coin.current_price}
                    </h5>{" "}
                    <span className=" ">
                      {" "}
                      <CheckPositiveNumber
                        number={coin.price_change_percentage_24h}
                      />
                    </span>
                  </div>

                  <div className="flex justify-center py-5 px-2">
                    {" "}
                    <Sparklines
                      svgHeight={50}
                      width={30}
                      height={50}
                      margin={-30}
                      data={coin.sparkline_in_7d.price}
                    >
                      <SparklinesLine style={{ fill: "" }} />
                      <SparklinesSpots />
                    </Sparklines>
                  </div>
                </div>
              </div>
            ))}
          </AliceCarousel>
        }
      </div>
    </div>
  );
}

export default TrendCoin;

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 },
};
