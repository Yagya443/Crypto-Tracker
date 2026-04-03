import { useEffect, useState } from "react";
import { coinGecko } from "../api/coinGecko";
import { ThreeDots } from "react-loader-spinner";
import "../index.css";
import CryptoCard from "../Components/CryptoCard";

const Home = () => {
    const [cryptoList, setCryptoList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState("grid");
    const [sortVal, setSortVal] = useState("rank");
    const [searchParam, setSearchParam] = useState("");

    const fetchCryptoData = async () => {
        try {
            const data = await coinGecko();
            setCryptoList(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCryptoData();
    }, []);

    const filterBySort = () => {
        let filtered = cryptoList.filter(
            (crypto) =>
                crypto.name.toLowerCase().includes(searchParam.toLowerCase()) ||
                crypto.symbol.toLowerCase().includes(searchParam.toLowerCase()),
        );

        filtered.sort((a, b) => {
            switch (sortVal) {
                case "rank":
                    return a.market_cap_rank - b.market_cap_rank;
                case "name":
                    return a.name.localeCompare(b.name);
                case "price":
                    return b.current_price - a.current_price;
                case "priceDesc":
                    return a.current_price - b.current_price;
                case "change":
                    return (
                        b.market_cap_change_percentage_24h -
                        a.market_cap_change_percentage_24h
                    );
                case "marketCap":
                    return b.market_cap - a.market_cap;

                default:
                    return b.market_cap_rank - a.market_cap_rank;
            }
        });

        setFilteredList(filtered);
    };

    useEffect(() => {
        filterBySort();
    }, [sortVal, cryptoList, searchParam]);

    return (
        <>
            <div className="app">
                <header>
                    <div className="header-content">
                        <h2 className="header-title">Crypto Tracker</h2>
                        <p className="header-para">
                            Real-Time Crypto-Currency updates and Market data
                        </p>
                    </div>
                    <div className="header-search">
                        <input
                            type="text"
                            placeholder="Search Crypto..."
                            value={searchParam}
                            onChange={(e) => setSearchParam(e.target.value)}
                        />
                    </div>
                </header>
                <div className="controls">
                    <div className="filter-group">
                        <label>Sort By:</label>
                        <select
                            value={sortVal}
                            onChange={(e) => setSortVal(e.target.value)}
                        >
                            <option value="rank">Rank</option>
                            <option value="name">Name</option>
                            <option value="price">Price(High To Low)</option>
                            <option value="priceDesc">
                                Price(Low To High)
                            </option>
                            <option value="change">24H Change</option>
                            <option value="marketCap">Market Cap</option>
                        </select>
                    </div>
                    <div className="view-toggle">
                        <button
                            className={viewMode === "flex" ? "active" : ""}
                            onClick={() => setViewMode("flex")}
                        >
                            List
                        </button>
                        <button
                            className={viewMode === "grid" ? "active" : ""}
                            onClick={() => setViewMode("grid")}
                        >
                            Grid
                        </button>
                    </div>
                </div>

                {!loading ? (
                    <div className={`crypto-container ${viewMode}`}>
                        {filteredList.map((crypto, idx) => (
                            <CryptoCard crypto={crypto} key={idx} />
                        ))}
                    </div>
                ) : (
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
                )}
            </div>
        </>
    );
};

export default Home;
