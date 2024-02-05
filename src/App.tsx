import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

interface Coin {
  id: string;
  icon: string;
  name: string;
  symbol: string;
  rank: number;
  price: number;
}

interface CoinProps {
  coin: Coin;
  darkMode: boolean;
}

const CoinComponent: React.FC<CoinProps> = ({ coin, darkMode }) => {
  return (
    <div className={`coinContainer ${darkMode ? "dark" : "light"}`}>
      <img src={coin.icon} alt={coin.name} className="coinIcon" />
      <h2 className="coinName">{coin.name}</h2>
      <p className="coinSymbol">{coin.symbol}</p>
      <p className="coinPrice">${coin.price}</p>
      <p className="coinRank">Rank: {coin.rank}</p>
    </div>
  );
};

const App: React.FC = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const fetchCoins = () => {
    Axios.get("https://api.coinstats.app/public/v1/coins?skip=0").then(
      (res) => {
        setCoins(res.data.coins);
        console.log(res.data.coins);
      }
    );
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <div className={`App ${darkMode ? "dark" : ""}`}>
      <div className="header">
        <h1>Cryptocurrency Information</h1>
        <input
          className={`SearchBar ${darkMode ? "dark" : "light"}`}
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className={`darkMode-button ${darkMode ? "dark" : "light"}`}
          onClick={toggleDarkMode}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <div className="cryptoDisplay">
        {filteredCoins.map((coin) => (
          <CoinComponent key={coin.id} coin={coin} darkMode={darkMode} />
        ))}
      </div>
    </div>
  );
};

export default App;
