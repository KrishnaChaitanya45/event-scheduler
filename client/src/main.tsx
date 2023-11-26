import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Providers } from "./redux/Provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* //? Provider is the redux provider component which provides the store to the
    app */}
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);
