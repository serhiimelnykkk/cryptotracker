import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useTickers } from "../../context/Ticker/TickerContext";
import { formatCurrencyUSD } from "../../utils";
import { getAssetTotals } from "../../utils";
import SummaryCharts from "./SummaryCharts/SummaryCharts";

const AssetsSummary = () => {
  const assets = useSelector((state: RootState) => state.assets);
  const tickers = useTickers();

  const totals = assets.reduce(
    (result, asset) => {
      const currentStream = `${asset.coin.toLowerCase()}usdt@ticker`;
      if (!tickers[currentStream]) {
        return result;
      }

      const assetTotals = getAssetTotals(asset);

      if (assetTotals.quantity > 0) {
        const currentValue =
          Number(tickers[currentStream].c) * assetTotals.quantity;
        const asset24hChange =
          Number(tickers[currentStream].p) * assetTotals.quantity;

        result.totalCost += assetTotals.cost;
        result.totalCurrentValue += currentValue;
        result.total24hChange += asset24hChange;
      }

      return result;
    },
    { totalCost: 0, totalCurrentValue: 0, total24hChange: 0 }
  );

  const profitLossAbsolute = totals.totalCurrentValue - totals.totalCost;
  const profitLossPercentage =
    totals.totalCost !== 0 ? (profitLossAbsolute / totals.totalCost) * 100 : 0;

  const total24hAgo = totals.totalCurrentValue - totals.total24hChange;
  const total24hChangeAbsolute = totals.totalCurrentValue - total24hAgo;
  const total24hChangePercentage =
    total24hAgo !== 0 ? (totals.total24hChange / total24hAgo) * 100 : 0;

  return (
    <div>
      <p>{`Total value: ${formatCurrencyUSD(totals.totalCurrentValue)}`}</p>
      <p>
        {`Total Profit/Loss: ${formatCurrencyUSD(
          profitLossAbsolute
        )} / ${profitLossPercentage.toFixed(2)}%`}
      </p>
      <p>
        {`Total 24h Change: ${formatCurrencyUSD(
          total24hAgo
        )} ( ${formatCurrencyUSD(
          total24hChangeAbsolute
        )} / ${total24hChangePercentage.toFixed(2)}% )`}
      </p>
      <SummaryCharts />
    </div>
  );
};

export default AssetsSummary;
