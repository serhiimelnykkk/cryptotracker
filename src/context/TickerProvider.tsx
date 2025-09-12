import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { useEffect, useState, type ReactNode } from "react";
import type { Ticker } from "../types";
import { TickerContext } from "./TickerContext";

interface WebSocketPayload {
  stream: string;
  data: Ticker;
}

interface TickerProviderProps {
  children?: ReactNode;
}

const TickerProvider = ({ children }: TickerProviderProps) => {
  const assets = useSelector((state: RootState) => state.assets);
  const [tickers, setTickers] = useState<Record<string, Ticker>>({});

  useEffect(() => {
    if (assets.length === 0) {
      setTickers({});
      return;
    }

    const streams = assets
      .map((asset) => `${asset.coin.toLowerCase()}usdt@ticker`)
      .join("/");
    const url = `wss://fstream.binance.com/stream?streams=${streams}`;
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log("Websocket connection opened");
    };

    ws.onmessage = (event) => {
      const message: WebSocketPayload = JSON.parse(event.data);
      setTickers((prevTickers) => ({
        ...prevTickers,
        [message.stream]: message.data,
      }));
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    return () => ws.close();
  }, [assets]);

  return <TickerContext value={tickers}>{children}</TickerContext>;
};

export default TickerProvider;
