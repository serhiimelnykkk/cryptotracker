import type { Asset, Ticker } from "../../../types";
import { removeAsset, removeTransaction } from "../../../store/assetsSlice";
import { useDispatch } from "react-redux";
import AddTransactionForm from "./CoinListRowUpdateForm/AddTransactionForm";

interface CoinListRowProps {
  asset: Asset;
  ticker: Ticker | undefined;
}

const CoinListRow = ({ asset, ticker }: CoinListRowProps) => {
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
          result.price += current.price;
          break;
        }
        case "sell": {
          result.quantity -= current.quantity;
          result.price -= current.price;
          break;
        }
      }

      return result;
    },
    { quantity: 0, price: 0 }
  );

  return (
    <div>
      <p>
        {asset.coin} {assetInfo.quantity} {assetInfo.price} {ticker && ticker.c}
      </p>
      <button onClick={handleRemoveAsset}>Remove Asset</button>
      <h4>Transactions</h4>
      <div>
        {asset.transactions.map((transaction, index) => (
          <div key={transaction.id}>
            <p>
              {`Transaction ${index + 1}: `} {transaction.quantity}{" "}
              {transaction.price} {transaction.type}
            </p>
            <button onClick={() => handleRemoveTransaction(transaction.id)}>
              Remove Transaction
            </button>
          </div>
        ))}
      </div>
      <AddTransactionForm asset={asset} />
    </div>
  );
};

export default CoinListRow;
