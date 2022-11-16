import { Pie } from "@ant-design/plots";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { SingleCoin } from "../../services/Api";

const PortfolioChart = ({ chart }) => {
  const { portfolyo } = useSelector((state) => state.portfolios);
  console.log("chart", chart);
  console.log("portfolyo", portfolyo);
  const [data, setData] = useState([]);
  useEffect(() => {
    setData([]);
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chart]);

  const fetchCoins = () => {
    // eslint-disable-next-line array-callback-return
    portfolyo.map(async (name) => {
      setData([]);
      
      await axios
        .get(SingleCoin(name.coin))
        .then((res) => {
          setData((prev) => [
            ...prev,
            {
              value:
                name.buy_total_crypto * res.data.market_data.current_price.usd,
              type: name.coin.toUpperCase(),
            },
          ]);
        })
        .catch((err) => console.log(err));
    });
  };

  console.log(data);
  const config = {
    appendPadding: 10,
    data,
    
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "inner",
      content: " {percentage}",
    },
    interactions: [
      {
        type: "pie-legend-active",
      },
      {
        type: "element-active",
      },
    ],
  };
  return <Pie {...config} />;
};

export default PortfolioChart;
