import {
  TickerTape,
  CopyrightStyles,
  TickerSymbol,
} from "react-ts-tradingview-widgets";

import React from "react";

function TickerWidget() {
  return (
    <div>
      <TickerTape
        autosize
        locale="en"
        width="100%"
        height="100%"
        largeChartUrl=""
        showSymbolLogo
        symbols={[
          {
            proName: "BITSTAMP:BTCUSD",
            title: "Bitcoin",
          },
          {
            proName: "BITSTAMP:ETHUSD",
            title: "Ethereum",
          },
          {
            description: "",
            proName: "BINANCE:DOGEUSDT",
          },
          {
            description: "",
            proName: "BINANCE:XRPUSDT",
          },
        ]}
        colorTheme="light"
        copyrightStyles={{
          parent: {
            fontSize: "0px",
            color: "red",
          },
          link: {
            textDecoration: "line-trough",
          },
          span: {
            color: "darkblue",
          },
        }}
      ></TickerTape>
    </div>
  );
}

export default TickerWidget;
