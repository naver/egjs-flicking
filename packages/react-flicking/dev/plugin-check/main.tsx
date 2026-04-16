import { createRoot } from "react-dom/client";
import "@dev/flicking-css";
import "@dev/plugins-css";
import App from "./App";

createRoot(document.getElementById("root")!).render(<App />);
