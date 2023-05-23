import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import Home from "./components/Home";
import { ThemeProvider } from "@material-tailwind/react";

const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Home />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const container = document.getElementById("root");
if (!container) {
  throw new Error("no container to render to");
}
const root = createRoot(container);
root.render(<App />);
