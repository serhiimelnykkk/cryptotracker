import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CoinForm from "./components/CoinForm/CoinForm";
import CoinList from "./components/CoinList/CoinList";
import TickerProvider from "./context/TickerProvider";
import AssetsSummary from "./components/AssetsSummary/AssetsSummary";

const client = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={client}>
      <TickerProvider>
        <AssetsSummary />
        <CoinForm />
        <CoinList />
      </TickerProvider>
    </QueryClientProvider>
  );
};

export default App;
