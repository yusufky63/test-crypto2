import { Pie } from "@ant-design/plots";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PortfolioChart = ({ chart }) => {
  const { portfolyo } = useSelector((state) => state.portfolios);

  const [data, setData] = useState([]);
  useEffect(() => {
    setData([]);
    console.log("chart", chart);
    if (chart) {
      // eslint-disable-next-line array-callback-return
      chart.map((coin) => {
        setData((prev) => [
          ...prev,
          {
            value: coin.buy_total_crypto * coin.market_data.current_price.usd,
            type: coin.coin.toUpperCase(),
          },
        ]);
      });
    }
  }, [portfolyo, chart]);

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
