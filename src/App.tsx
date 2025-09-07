import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CoinSelector from "./components/CoinSelector/CoinSelector";

const client = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={client}>
      <CoinSelector />
    </QueryClientProvider>
  );
};

export default App;
