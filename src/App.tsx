import { createRoot } from "react-dom/client";

const App = () => {
  return (
    <>
      <div>Argentina 5 - 3 Portugal</div>
      <div>Spain 1 - 2 Slovenia</div>
      <div>Italy 1 - 1 Germany</div>
      <div>Andorra 1 - 0 France</div>
    </>
  );
};

const container = document.getElementById("root");
if (!container) {
  throw new Error("no container to render to");
}
const root = createRoot(container);
root.render(<App />);
