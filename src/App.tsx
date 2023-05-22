import { createRoot } from "react-dom/client";
import Home from "./components/Home";

const App = () => {
  return (
    <div className="App">
      <Home />
    </div>
  );
};

const container = document.getElementById("root");
if (!container) {
  throw new Error("no container to render to");
}
const root = createRoot(container);
root.render(<App />);
