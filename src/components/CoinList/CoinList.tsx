import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import CoinListRow from "./CoinListRow/CoinListRow";
import { useTickers } from "../../context/Ticker/TickerContext";

const CoinList = () => {
  const assets = useSelector((state: RootState) => state.assets);
  const tickers = useTickers();

  return (
    <div>
      {assets.map((asset) => {
        const currentStream = `${asset.coin.toLowerCase()}usdt@ticker`;
        const currentTicker = tickers[currentStream];

        return (
          <CoinListRow key={asset.coin} asset={asset} ticker={currentTicker} />
        );
      })}
    </div>
  );
};

export default CoinList;
