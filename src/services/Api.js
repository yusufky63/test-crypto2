
export const CoinList = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=200&page=1&sparkline=false`;

export const SingleCoin = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

export const HistoricalChart = (id, days = 365, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const TrendingCoins = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;

// export const CryptoNews = () => `
//   let data =[]
//   const options = {
//     method: "GET",
//     url: "https://investing-cryptocurrency-markets.p.rapidapi.com/coins/get-news",
//     params: {
//       pair_ID: "1057391",
//       page: "1",
//       time_utc_offset: "28800",
//       lang_ID: "10",
//     },
//     headers: {
//       "X-RapidAPI-Key": "a75319eeafmsh2244a4a6651e235p1fb377jsn1f3b67f45f77",
//       "X-RapidAPI-Host": "investing-cryptocurrency-markets.p.rapidapi.com",
//     },
//   };

//   axios(options)
//     .then(function (response) {
//       console.log(response.data.data[0].screen_data.news);
//   return response.data.data[0].screen_data.news
    
    
//     })
//     .catch(function (error) {
//       console.error(error);
//     });
   
// `
