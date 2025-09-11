import { configureStore, isAnyOf } from "@reduxjs/toolkit";
import {
  addTransaction,
  assetsReducer,
  addAsset,
  removeAsset,
} from "./assetsSlice";
import { startAppListening, listenerMiddleware } from "./listenerMiddleware";

startAppListening({
  matcher: isAnyOf(addAsset, removeAsset, addTransaction),
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
