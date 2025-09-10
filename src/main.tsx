import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { FavoritProvider } from "./contexts/FavoritesContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FavoritProvider>
      <App />
    </FavoritProvider>
  </StrictMode>
);
