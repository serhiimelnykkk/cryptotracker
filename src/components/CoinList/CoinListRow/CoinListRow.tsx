import type { Asset, Ticker } from "../../../types";
import { removeAsset } from "../../../store/assetsSlice";
import { useDispatch } from "react-redux";
import CoinListRowUpdateForm from "./CoinListRowUpdateForm/CoinListRowUpdateForm";

interface CoinListRowProps {
  asset: Asset;
  ticker: Ticker | undefined;
}

const CoinListRow = ({ asset, ticker }: CoinListRowProps) => {
  const dispatch = useDispatch();
  const handleRemove = () => {
    dispatch(removeAsset(asset.coin));
  };

  return (
    <div>
      <p>
        {asset.coin} {asset.quantity} {ticker && ticker.c}
      </p>
      <button onClick={handleRemove}>Remove</button>
      <CoinListRowUpdateForm asset={asset} />
    </div>
  );
};

export default CoinListRow;
