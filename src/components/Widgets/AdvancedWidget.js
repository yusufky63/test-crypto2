import React from 'react'
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
function AdvancedWidget({id}) {

  return (
    <div>
      {id &&   <AdvancedRealTimeChart
        symbol={`BINANCE:${id}USDT`}
        // eslint-disable-next-line react/style-prop-object
        style="1"
        interval="D"
        width="500"
        height="400"
        locale="tr"
        
        theme="light" 
       
       
        ></AdvancedRealTimeChart>}
    </div>
  )
}

export default AdvancedWidget