import React from "react";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
function AdvancedWidget({ id }) {
  return (
    <div>
      {id && (
        <AdvancedRealTimeChart
          symbol={`BINANCE:${id}USDT`}
          // eslint-disable-next-line react/style-prop-object
          style="1"
          interval="D"
          locale="tr"
          height={600}
          theme="light"
        ></AdvancedRealTimeChart>
      )}
    </div>
  );
}

export default AdvancedWidget;
