import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import CoinListItem from "./CoinListRow/CoinListItem";

const CoinList = () => {
  const assets = useSelector((state: RootState) => state.assets);

  return (
    <div>
      {assets.map((asset) => (
        <CoinListItem key={asset.coin} asset={asset} />
      ))}
    </div>
  );
};

export default CoinList;
