import { removeAsset, removeTransaction } from "../../../../store/assetsSlice";
import { useDispatch } from "react-redux";
import { formatCurrencyUSD } from "../../../../utils";
import type { Asset, Ticker } from "../../../../types";
import { getAssetTotals } from "../../../../utils";

interface CoinProps {
  asset: Asset;
  ticker: Ticker | undefined;
}

const Coin = ({ asset, ticker }: CoinProps) => {
  const dispatch = useDispatch();

  const handleRemoveAsset = () => {
    dispatch(removeAsset(asset.id));
  };

  const handleRemoveTransaction = (transactionId: string) => {
    dispatch(
      removeTransaction({ coinId: asset.id, transactionId: transactionId })
    );
  };

  const assetTotals = getAssetTotals(asset);

  const currentValue = ticker ? Number(ticker.c) * assetTotals.quantity : 0;
  const asset24hChange = ticker ? Number(ticker.p) * assetTotals.quantity : 0;

  const profitLossAbsolute = currentValue - assetTotals.cost;
  const profitLossPercentage =
    profitLossAbsolute !== 0
      ? (profitLossAbsolute / assetTotals.cost) * 100
      : 0;

  const asset24hAgo = currentValue - asset24hChange;
  const asset24hChangeAbsolute = currentValue - asset24hAgo;
  const asset24hChangePercentage =
    asset24hAgo !== 0 ? (asset24hChange / asset24hAgo) * 100 : 0;

  return (
    <div>
      <p>{`Coin: ${asset.coin}`}</p>
      <p>
        {ticker &&
          `Current cost per coin: ${formatCurrencyUSD(Number(ticker.c))} `}
      </p>
      <p>{`Quantity: ${
        assetTotals.quantity ? assetTotals.quantity : "0 (Position Closed)"
      }`}</p>
      <p>{`Total value: ${formatCurrencyUSD(currentValue)}`}</p>
      <p>
        {`Profit/Loss: ${formatCurrencyUSD(profitLossAbsolute)} 
        ${assetTotals.quantity ? `/ ${profitLossPercentage.toFixed(2)}%` : ""}`}
      </p>
      <p>{`24h Change: ${formatCurrencyUSD(asset24hAgo)} ( ${formatCurrencyUSD(
        asset24hChangeAbsolute
      )} / ${asset24hChangePercentage.toFixed(2)}% )`}</p>
      <button onClick={handleRemoveAsset}>Remove Asset</button>
      <h4>Transactions</h4>
      <div>
        {asset.transactions.map((transaction, index) => (
          <div key={transaction.id}>
            <p>
              {`Transaction ${index + 1}: `} {transaction.quantity}{" "}
              {`${formatCurrencyUSD(transaction.cost)}`} {transaction.type}
            </p>
            <button onClick={() => handleRemoveTransaction(transaction.id)}>
              Remove Transaction
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Coin;
