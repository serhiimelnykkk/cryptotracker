import { createContext, useContext } from "react";
import type { Ticker } from "../types";

export const TickerContext = createContext<Record<string, Ticker>>({});
export const useTickers = () => useContext(TickerContext);
