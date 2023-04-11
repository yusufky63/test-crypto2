import React from "react";
import numberWithCommas from "./NumberWithCommas"

function DataGlobal({ globalData ,symbol,currencyEdit}) {
  return (
    <div>
       
      <div className=" whitespace-nowrap justify-around text-xs font-normal text-gray-600 mt-2 hidden md:block">
        <span className="p-1">
          Coinler : 
          <span className="text-indigo-500">
             
            {globalData.active_cryptocurrencies} 
          </span>
        </span>
        <span className="p-1">
          Borsalar : 
          <span className="text-indigo-500">{globalData.ended_icos}</span>
        </span>
        <span className="p-1">
          Piyasa Değeri :
          <span className="text-indigo-500">
             
            {symbol}
            {numberWithCommas(globalData.total_market_cap[currencyEdit])}
          </span>
        </span>
        <span className="p-2">
          24 Saatlik Hacim : 
          <span className="text-indigo-500">
            {symbol}
            {numberWithCommas(globalData.total_volume[currencyEdit])}
          </span>
        </span>
      </div>
    </div>
  );
}

export default DataGlobal;
