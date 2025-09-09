import { configureStore, isAnyOf } from "@reduxjs/toolkit";
import { assetsReducer } from "./assetsSlice";
import { startAppListening, listenerMiddleware } from "./listenerMiddleware";
import { addAsset, removeAsset, updateAssetQuantity } from "./assetsSlice";

startAppListening({
  matcher: isAnyOf(addAsset, removeAsset, updateAssetQuantity),
  effect: (_, listenerApi) => {
    localStorage.setItem(
      "assets",
      JSON.stringify(listenerApi.getState().assets)
    );
  },
});

export const store = configureStore({
  reducer: {
    assets: assetsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
