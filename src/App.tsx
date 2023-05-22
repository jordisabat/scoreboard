import { createRoot } from "react-dom/client";
import ScoreBoards from "./components/ScoreBoards";
import dummyData from "./__tests__/fixtures/scores.fixtures";

const App = () => {
  return <ScoreBoards scores={dummyData} />;
};

const container = document.getElementById("root");
if (!container) {
  throw new Error("no container to render to");
}
const root = createRoot(container);
root.render(<App />);
