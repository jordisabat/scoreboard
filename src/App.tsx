import { createRoot } from "react-dom/client";
import ScoreBoards from "./components/ScoreBoards";

const App = () => {
  return <ScoreBoards />;
};

const container = document.getElementById("root");
if (!container) {
  throw new Error("no container to render to");
}
const root = createRoot(container);
root.render(<App />);
