// import formatter from "../../utils/formatter";
import { formatter, formatMarketCap } from "../../utils/formatter";
import { Link } from "react-router-dom";
import { FaArrowDownLong } from "react-icons/fa6";
import { FaArrowUpLong } from "react-icons/fa6";

const CryptoCard = ({ crypto }) => {
    return (
        <Link to={`coin/${crypto.id}`}>
            <div className="crypto-card">
                <div className="crypto-header">
                    <div className="crypto-info">
                        <img
                            className="crypto-image"
                            src={crypto.image}
                            alt={crypto.name}
                        />
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                            }}
                        >
                            <div>
                                <h3 className="name">{crypto.name}</h3>
                                <p className="symbol">
                                    {crypto.symbol.toUpperCase()}
                                </p>
                            </div>
                            <span className="rank">
                                # {crypto.market_cap_rank}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="crypto-price">
                    <p className="price">{formatter(crypto.current_price)}</p>
                    <span
                        className={`change ${crypto.market_cap_change_percentage_24h >= 0 ? "positive" : "negative"}`}
                    >
                        {crypto.market_cap_change_percentage_24h >= 0 ? (
                            <FaArrowUpLong />
                        ) : (
                            <FaArrowDownLong />
                        )}

                        {Math.abs(
                            crypto.market_cap_change_percentage_24h,
                        ).toFixed(2)}
                    </span>
                </div>

                <div className="crypto-stats">
                    <div className="stat">
                        <span className="stat-label">Market Cap</span>
                        <span className="stat-value">
                            {formatMarketCap(crypto.market_cap)}
                        </span>
                    </div>
                    <div className="stat">
                        <span className="stat-label">Volume</span>
                        <span className="stat-value">
                            {formatMarketCap(crypto.total_volume)}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CryptoCard;
