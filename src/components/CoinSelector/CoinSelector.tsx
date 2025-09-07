import { useQuery } from "@tanstack/react-query";
import type { ExchangeInfo } from "../../types";
import CoinSelectorOption from "./CoinSelectorOption/CoinSelectorOption";

const url = "https://fapi.binance.com/fapi/v1/exchangeInfo";

const CoinSelector = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["coin"],
    queryFn: () =>
      fetch(url)
        .then<ExchangeInfo>((res) => res.json())
        .then((data) => {
          return data.symbols.filter(
            (symbol) =>
              symbol.status === "TRADING" && symbol.quoteAsset === "USDT"
          );
        }),
    initialData: [],
  });

  return (
    <select disabled={isFetching}>
      <option value="" hidden>
        Select coin
      </option>
      {data.map((symbol) => (
        <CoinSelectorOption symbol={symbol} />
      ))}
    </select>
  );
};

export default CoinSelector;
