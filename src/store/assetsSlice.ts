import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Asset, Transaction } from "../types";

const initialState: Asset[] = JSON.parse(
  localStorage.getItem("assets") || "[]"
);

const assetsSlice = createSlice({
  name: "assets",
  initialState: initialState,
  reducers: {
    addAsset: (state, action: PayloadAction<string>) => {
      const existingItem = state.find((asset) => asset.coin === action.payload);
      if (!existingItem) {
        const asset: Asset = {
          id: crypto.randomUUID(),
          coin: action.payload,
          transactions: [],
        };
        state.push(asset);
      }
    },
    removeAsset: (state, action: PayloadAction<string>) => {
      const existingItem = state.find((asset) => asset.id === action.payload);
      if (existingItem) {
        const index = state.indexOf(existingItem);
        state.splice(index, 1);
      }
    },
    addTransaction: (
      state,
      action: PayloadAction<{ coinId: string; transaction: Transaction }>
    ) => {
      const transaction = action.payload.transaction;
      const existingItem = state.find(
        (asset) => asset.id === action.payload.coinId
      );
      if (existingItem) {
        const index = state.indexOf(existingItem);
        state[index].transactions.push(transaction);
      }
    },
    removeTransaction: (
      state,
      action: PayloadAction<{ coinId: string; transactionId: string }>
    ) => {
      const ids = action.payload;
      const existingAsset = state.find((asset) => asset.id === ids.coinId);
      if (existingAsset) {
        const existingTransaction = existingAsset.transactions.find(
          (transaction) => transaction.id === ids.transactionId
        );
        if (existingTransaction) {
          const transactionIndex =
            existingAsset.transactions.indexOf(existingTransaction);
          const assetIndex = state.indexOf(existingAsset);
          state[assetIndex].transactions.splice(transactionIndex, 1);
        }
      }
    },
  },
});

export const assetsReducer = assetsSlice.reducer;
export const { addAsset, removeAsset, addTransaction, removeTransaction } =
  assetsSlice.actions;
