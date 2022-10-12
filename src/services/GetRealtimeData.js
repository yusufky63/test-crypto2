import { useEffect, useState } from "react";
import Coins from "../components/pages/Coins";
import useFetch from "../useFetch";
function GetRealtimeData() {
  const { data } = useFetch("https://api.coincap.io/v2/assets");
  const [cryptoPrices, setCryptoPrices] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("wss://ws.coincap.io/prices?assets=ALL");

    const handler = (e) => {
      const response = JSON.parse(e.data);

      setCryptoPrices((cryptoPrices) => [
        // ...cryptoPrices, // <-- shallow copy previous state
        response, // <-- append new data
      ]);
    };
    // cryptoPrices.shift(0, 1);

    ws.addEventListener("message", handler);

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          action: "subscribe_to_operations_activity",
          request_id: new Date().getTime(),
        })
      );
    };

    return () => {
      ws.removeEventListener("message", handler);
    };
  }, []);

   return  (
    <div> </div>
   )
    //  <Coins crypto={data} cryptoPrices={cryptoPrices} />
}

export default GetRealtimeData;
