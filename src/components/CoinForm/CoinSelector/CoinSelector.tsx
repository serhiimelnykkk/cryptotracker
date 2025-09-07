import { useQuery } from "@tanstack/react-query";
import type { ExchangeInfo } from "../../../types";
import CoinSelectorOption from "./CoinSelectorOption/CoinSelectorOption";
import type { UseFormRegister } from "react-hook-form";
import type { CoinFormValues } from "../CoinForm.types";

const url = "https://fapi.binance.com/fapi/v1/exchangeInfo";

interface CoinSelectorProps {
  register: UseFormRegister<CoinFormValues>;
}

const CoinSelector = ({ register }: CoinSelectorProps) => {
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
    <select disabled={isFetching} {...register("coin", { required: true })}>
      <option value="" hidden>
        Select coin
      </option>
      {data.map((symbol) => (
        <CoinSelectorOption key={symbol.symbol} symbol={symbol} />
      ))}
    </select>
  );
};

export default CoinSelector;
