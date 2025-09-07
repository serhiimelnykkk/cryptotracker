import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CoinForm from "./components/CoinForm/CoinForm";

const client = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={client}>
      <CoinForm />
    </QueryClientProvider>
  );
};

export default App;
