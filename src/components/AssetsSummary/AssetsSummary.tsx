import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useTickers } from "../../context/TickerContext";
import { formatCurrencyUSD } from "../../utils";

const AssetsSummary = () => {
  const assets = useSelector((state: RootState) => state.assets);
  const tickers = useTickers();

  const totals = assets.reduce(
    (result, asset) => {
      const currentStream = `${asset.coin.toLowerCase()}usdt@ticker`;
      if (!tickers[currentStream]) {
        return result;
      }

      const assetInfo = asset.transactions.reduce(
        (acc, transaction) => {
          switch (transaction.type) {
            case "buy":
              acc.quantity += transaction.quantity;
              acc.price += transaction.price * transaction.quantity;
              break;
            case "sell":
              acc.quantity -= transaction.quantity;
              acc.price -= transaction.price * transaction.quantity;
              break;
          }
          return acc;
        },
        { quantity: 0, price: 0 }
      );
      if (assetInfo.quantity > 0) {
        const currentValue = Number(tickers[currentStream].c);
        result.totalCost += assetInfo.price * assetInfo.quantity;
        result.totalCurrentValue += currentValue;
      }

      return result;
    },
    { totalCost: 0, totalCurrentValue: 0 }
  );

  const profitLossAbsolute = totals.totalCurrentValue - totals.totalCost;
  const profitLossPercentage =
    totals.totalCost !== 0 ? (profitLossAbsolute / totals.totalCost) * 100 : 0;

  return (
    <div>
      <p>{`Profit/Loss: ${formatCurrencyUSD(
        profitLossAbsolute
      )} / ${profitLossPercentage.toFixed(2)}%`}</p>
    </div>
  );
};

export default AssetsSummary;
