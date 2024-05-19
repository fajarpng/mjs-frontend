import { createRoot } from "react-dom/client";

import { App } from "./app";
import "./index.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error("React root element doesn't exist!");
}

const root = createRoot(container);

root.render(<App />);
