import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./routes";
import "./styles.css";
import { FavoritesProvider } from "./context/FavoritesContext"; // Import context provider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FavoritesProvider> {/* Wrap entire app with provider */}
      <AppRoutes />
    </FavoritesProvider>
  </React.StrictMode>
);