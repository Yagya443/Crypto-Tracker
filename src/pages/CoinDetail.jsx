import { useNavigate, useParams } from "react-router-dom";
import { fetchChartData, fetchCoinData } from "../api/coinGecko";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import { formatMarketCap, formatter } from "../../utils/formatter";
import {
    LineChart,
    Line,
    XAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    YAxis,
} from "recharts";

const CoinDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [coin, setCoin] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [days, setDays] = useState(7);

    const loadCoinData = async () => {
        try {
            const data = await fetchCoinData(id);
            setCoin(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    const loadChartData = async (days) => {
        try {
            const data = await fetchChartData(id, days);

            const formatedData = data.prices.map((price) => {
                let time;

                switch (days) {
                    case 7:
                        time = new Date(price[0]).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                        });
                        break;
                    case 15:
                        time = new Date(price[0]).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                        });
                        break;
                    case 30:
                        time = new Date(price[0]).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                        });
                        break;
                    case 180:
                        time = new Date(price[0]).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                            // day: "numeric",
                        });
                        break;
                    case 360:
                        time = new Date(price[0]).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                            // day: "numeric",
                        });
                        break;
                    default:
                        time = new Date(price[0]).toLocaleDateString();
                }
                return {
                    time,
                    price: Number(price[1].toFixed(2)),
                };
            });
            setChartData(formatedData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadCoinData();
        loadChartData(days);
    }, [id, days]);


    if (loading) {
        return (
            <>
                <div className="app">
                    <div className="spinner">
                        <ThreeDots
                            className="three-dot"
                            height="40"
                            width="80"
                            radius="9"
                            color="#2727F7"
                            visible={true}
                        />
                        <p className="loading-text">Loading Crypto Data</p>
                    </div>
                </div>
            </>
        );
    }

    if (!coin) {
        return (
            <>
                <div className="app">
                    <div className="no-result">
                        <p>Coin Not Found</p>
                        <button
                            onClick={() => navigate("/")}
                            className="go-back-button"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </>
        );
    }

    let xAxisInterval;

    switch (days) {
        case 7:
            xAxisInterval = 22;
            break;
        case 15:
            xAxisInterval = 25;
            break;
        case 30:
            xAxisInterval = 30;
            break;
        case 180:
            xAxisInterval = 32;
            break;
        case 360:
            xAxisInterval = 30;
            break;
        default:
            xAxisInterval = "preserveStartEnd";
    }

    return (
        <div className="app">
            <header>
                <div className="header-content">
                    <h2 className=  "header-title">Crypto Tracker</h2>
                    <p className="header-para">
                        Real-Time Crypto-Currency updates and Market data
                    </p>
                </div>
                <button
                    className="go-back-button"
                    onClick={() => navigate("/")}
                >
                    Go Back
                </button>
            </header>
            <div className="coin-detail">
                <div className="coin-header">
                    <div className="coin-title">
                        <img src={coin.image.small} alt={coin.name} />
                    </div>
                    <div>
                        <h2>{coin.name}</h2>
                        <p className="symbol">{coin.symbol.toUpperCase()}</p>
                    </div>
                </div>
                <span className="rank">
                    Rank: {coin.market_data.market_cap_rank}
                </span>

                <div className="specific-crypto-price">
                    <p className="price" style={{ fontSize: "35px" }}>
                        {formatter(coin.market_data.current_price.usd)}
                    </p>

                    <div
                        className={`change ${
                            coin.market_data.market_cap_change_percentage_24h >=
                            0
                                ? "positive"
                                : "negative"
                        }`}
                    >
                        {coin.market_data.market_cap_change_percentage_24h >=
                        0 ? (
                            <FaArrowUpLong />
                        ) : (
                            <FaArrowDownLong />
                        )}

                        <span>
                            {Math.abs(
                                coin.market_data
                                    .market_cap_change_percentage_24h,
                            ).toFixed(2)}
                            %
                        </span>
                    </div>
                    <div className="price-ranges">
                        <div className="price-range">
                            <span className="range-label">24H High</span>
                            <span className="range-value">
                                {formatter(coin.market_data.high_24h.usd)}
                            </span>
                        </div>
                        <div className="price-range">
                            <span className="range-label">24H Low</span>
                            <span className="range-value">
                                {formatter(coin.market_data.low_24h.usd)}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="chart-section">
                    <div className="chart-header">
                        <h1>{`Price Chart (${days} Days)`}</h1>
                        <div className="chart-duration">
                            <label>Duration</label>
                            <select
                                value={days}
                                onChange={(e) =>
                                    setDays(Number(e.target.value))
                                }
                            >
                                <option value="7">7 Days</option>
                                <option value="15">15 Days</option>
                                <option value="30">30 Days</option>
                                <option value="180">6 Month</option>
                                <option value="360">1 Year</option>
                            </select>
                        </div>
                    </div>
                    <div className="chart">
                        <ResponsiveContainer width="100%" height="400">
                            <LineChart data={chartData}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="rgba(255,255,255,0.1)"
                                />
                                <XAxis
                                    dataKey="time"
                                    stroke="#fff"
                                    style={{ fontSize: "14px" }}
                                    interval={xAxisInterval}
                                />
                                <YAxis
                                    stroke="#fff"
                                    style={{ fontSize: "14px" }}
                                    domain={["auto", "auto"]}
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: "7px",
                                        border: "rgba(255,255,255,0.1)",
                                        backgroundColor: "rgba(0,0,0,0.8)",
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="price"
                                    stroke="#fff"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="stats-grid">
                    <div className="stat-card">
                        <span className="stat-label">Market Cap</span>
                        <span className="stat-value">
                            {formatMarketCap(coin.market_data.market_cap.usd)}
                        </span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">Volume (24H)</span>
                        <span className="stat-value">
                            {formatMarketCap(coin.market_data.total_volume.usd)}
                        </span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">Circulating Supply</span>
                        <span className="stat-value">
                            {coin.market_data.circulating_supply.toLocaleString()}
                        </span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">Total Supply</span>
                        <span className="stat-value">
                            {coin.market_data.total_supply.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoinDetail;
