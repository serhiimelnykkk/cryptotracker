import type { Asset } from "../types";

export const formatCurrencyUSD = (value: number) => {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export const getAssetTotals = (asset: Asset) =>
  asset.transactions.reduce(
    (result, current) => {
      switch (current.type) {
        case "buy": {
          result.quantity += current.quantity;
          result.cost += current.cost * current.quantity;
          break;
        }
        case "sell": {
          result.quantity -= current.quantity;
          result.cost -= current.cost * current.quantity;
          break;
        }
      }

      return result;
    },
    { quantity: 0, cost: 0 }
  );
