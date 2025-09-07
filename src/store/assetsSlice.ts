import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Asset } from "../types";

const initialState: Asset[] = [];

const assetsSlice = createSlice({
  name: "assets",
  initialState: initialState,
  reducers: {
    addAsset: (state, action: PayloadAction<Asset>) => {
      const existingItem = state.find(
        (asset) => asset.coin === action.payload.coin
      );
      if (!existingItem) {
        state.push(action.payload);
      } else {
        const index = state.indexOf(existingItem);
        state[index].quantity += action.payload.quantity;
      }
    },
    removeAsset: (state, action: PayloadAction<string>) => {
      const existingItem = state.find((asset) => asset.coin === action.payload);
      if (existingItem) {
        const index = state.indexOf(existingItem);
        state.splice(index, 1);
      }
    },
  },
});

export const assetsReducer = assetsSlice.reducer;
export const { addAsset, removeAsset } = assetsSlice.actions;
