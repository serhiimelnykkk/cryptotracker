import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CoinForm from "./components/CoinForm/CoinForm";
import CoinList from "./components/CoinList/CoinList";

const client = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={client}>
      <CoinForm />
      <CoinList />
    </QueryClientProvider>
  );
};

export default App;
