import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import CoinListRow from "./CoinListRow/CoinListRow";

const CoinList = () => {
  const assets = useSelector((state: RootState) => state.assets);

  return (
    <div>
      {assets.map((asset) => (
        <CoinListRow key={asset.coin} asset={asset} />
      ))}
    </div>
  );
};

export default CoinList;
