import type { Symbol } from "../../../../types";

interface CoinSelectorOptionProps {
  symbol: Symbol;
}

const CoinSelectorOption = ({ symbol }: CoinSelectorOptionProps) => {
  return <option value={symbol.baseAsset}>{symbol.baseAsset}</option>;
};

export default CoinSelectorOption;
