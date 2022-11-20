export const CoinList = (currency, page) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${page}&page=1&sparkline=true`;

export const TopCoins = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1&sparkline=true`;

export const SingleCoin = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

export const HistoricalChart = (id, day, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${day}`;

export const TrendingCoins = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;

export const TopExchanges = (per_page) =>
  `https://api.coingecko.com/api/v3/exchanges?per_page=${per_page}`;

export const SingleCoinFavorites = (name, currency) =>
  `https://api.coingecko.com/api/v3/simple/price?ids=${name}&vs_currencies=${currency}&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&precision=3`;
