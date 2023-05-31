import React from "react";
import WifiIcon from "../assets/icon/WifiIcon";
import RefreshIcon from "../assets/icon/RefreshIcon";

function MarketsDataError() {
  const handleRefresh = () => {
    window.location.reload();
  };
  return (
    <div>
       
      <span className=" items-center text-yellow-500 flex justify-end">
      <WifiIcon />
        <span className="m-2">Veri Hatası Sayfayı Yenileyin ! </span>
        <button
          onClick={handleRefresh}
          className="border text-green-500 p-2 shadow-md rounded-lg active:bg-gray-300"
        >
        <RefreshIcon />
        </button>
      </span>
    </div>
  );
}

export default MarketsDataError;
