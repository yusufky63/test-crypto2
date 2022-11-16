import React, { useState, useEffect } from 'react';

import { WordCloud } from '@ant-design/plots';
import { CoinList } from "../../services/Api";
import axios from 'axios';
const WordChart = () => {
  const [data, setData] = useState([]);

 
  const fetchCoins = async () => {
  
    const { data } = await axios.get(CoinList("USD", 50));
    data.map((coin)=>{
        setData((prev) => [
            ...prev,
            {
                value: coin.current_price,
                name: coin.id
            },
          ]);
    })
  
 
  };

  useEffect(() => {
    setData([])
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const config = {
    data,
    wordField: 'name',
    weightField: 'value',
    colorField: 'name',
    wordStyle: {
        fontFamily: 'Signika Negative',
      fontSize: [16, 48],
      rotation: 0,
    },
  
    random: () => 0.5,
  };

  return <WordCloud {...config} />;
};

export default WordChart;