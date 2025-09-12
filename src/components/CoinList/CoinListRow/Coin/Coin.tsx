import { removeAsset, removeTransaction } from "../../../../store/assetsSlice";
import { useDispatch } from "react-redux";
import { formatCurrencyUSD } from "../../../../utils";
import type { Asset, Ticker } from "../../../../types";

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

  const assetInfo = asset.transactions.reduce(
    (result, current) => {
      switch (current.type) {
        case "buy": {
          result.quantity += current.quantity;
          result.price += current.price * current.quantity;
          break;
        }
        case "sell": {
          result.quantity -= current.quantity;
          result.price -= current.price * current.quantity;
          break;
        }
      }

      return result;
    },
    { quantity: 0, price: 0 }
  );

  const currentValue = ticker ? Number(ticker.c) * assetInfo.quantity : 0;
  const profitLossAbsolute = currentValue - assetInfo.price;
  const profitLossPercentage = profitLossAbsolute
    ? (profitLossAbsolute / assetInfo.price) * 100
    : 0;

  return (
    <div>
      <p>{`Coin: ${asset.coin}`}</p>
      <p>
        {ticker &&
          `Current price for 1 coin: ${formatCurrencyUSD(Number(ticker.c))} `}
      </p>
      <p>{`Quantity: ${assetInfo.quantity}`}</p>
      <p>{`Total price: ${formatCurrencyUSD(currentValue)}`}</p>
      <p>
        {" "}
        {`Profit/Loss: ${formatCurrencyUSD(
          profitLossAbsolute
        )} / ${profitLossPercentage.toFixed(2)}%`}
      </p>
      <button onClick={handleRemoveAsset}>Remove Asset</button>
      <h4>Transactions</h4>
      <div>
        {asset.transactions.map((transaction, index) => (
          <div key={transaction.id}>
            <p>
              {`Transaction ${index + 1}: `} {transaction.quantity}{" "}
              {`${formatCurrencyUSD(transaction.price)}`} {transaction.type}
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
