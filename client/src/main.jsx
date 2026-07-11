import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import ReduxProvider, { store } from "./app/reduxProvider/ReduxProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <ReduxProvider>
        <App />
      </ReduxProvider>
  </StrictMode>,
);
