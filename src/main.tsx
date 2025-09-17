import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { FavoritProvider } from "./contexts/FavoritesContext";
import '@designsystem-se/af'; 
import { AppliedProvider } from "./contexts/AppliedContext";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppliedProvider>
    <FavoritProvider>
      <App />
    </FavoritProvider>
    </AppliedProvider>
  </StrictMode>
);
