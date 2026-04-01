// https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false

const BASE_URL = "https://api.coingecko.com/api/v3";

export const coinGecko = async () => {
    const response = await fetch(
        `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
    );
    return await response.json();
};

export const fetchCoinData = async (id) => {
    const response = await fetch(
        `${BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
    );
    return await response.json();
};

export const fetchChartData = async (id,days) => {
    const response = await fetch(
        `${BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=${days}`,
    );
    return await response.json();
};



