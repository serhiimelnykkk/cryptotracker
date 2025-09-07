import type { Asset } from "../../../types";
import { useDispatch } from "react-redux";
import { removeAsset } from "../../../store/assetsSlice";

interface CoinListItem {
  asset: Asset;
}

const CoinListItem = ({ asset }: CoinListItem) => {
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
    </div>
  );
};

export default CoinListItem;
