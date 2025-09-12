import type { Asset, Ticker } from "../../../types";
import AddTransactionForm from "./AddTransactionForm/AddTransactionForm";
import Coin from "./Coin/Coin";

interface CoinListRowProps {
  asset: Asset;
  ticker: Ticker | undefined;
}

const CoinListRow = ({ asset, ticker }: CoinListRowProps) => {
  return (
    <div>
      <Coin asset={asset} ticker={ticker} />
      <AddTransactionForm asset={asset} />
    </div>
  );
};

export default CoinListRow;
