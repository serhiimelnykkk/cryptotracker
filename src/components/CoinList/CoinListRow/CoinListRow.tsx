import type { Asset } from "../../../types";
import { removeAsset } from "../../../store/assetsSlice";
import { useDispatch } from "react-redux";
import CoinListRowUpdateForm from "./CoinListRowUpdateForm/CoinListRowUpdateForm";

interface CoinListRowProps {
  asset: Asset;
}

const CoinListRow = ({ asset }: CoinListRowProps) => {
  const dispatch = useDispatch();
  const handleRemove = () => {
    dispatch(removeAsset(asset.coin));
  };

  return (
    <div>
      <p>
        {asset.coin} {asset.quantity}
      </p>
      <button onClick={handleRemove}>Remove</button>
      <CoinListRowUpdateForm asset={asset} />
    </div>
  );
};

export default CoinListRow;
