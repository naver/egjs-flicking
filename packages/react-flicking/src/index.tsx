import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./demo/App";
import * as serviceWorker from "./demo/serviceWorker";

const container = document.getElementById("root");
const root = createRoot(container as HTMLElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
