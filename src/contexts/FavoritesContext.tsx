import { createContext, useContext, useEffect, useReducer } from "react";
import type { Job } from "../models/Job";
import { favoritReducer } from "../reducers/favoritReducer";

export const FavoritContext = createContext<fav | undefined>(undefined);

type fav = {
  favorites: Job[];
  addFavorite: (job: Job) => void;
  removeFavorite: (id: string | number) => void;
  isFavorite: (id: string | number) => boolean;
};

export function FavoritProvider({ children }: { children: React.ReactNode }) {
  const [favoritesMap, dispatch] = useReducer(favoritReducer, {}, () => {
    try {
      const raw = localStorage.getItem("favorites");
      return raw ? (JSON.parse(raw) as Record<string, Job>) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favoritesMap));
    } catch {}
  }, [favoritesMap]);

  const addFavorite = (job: Job) =>dispatch({ type: "ADD", job });

  const removeFavorite = (id: string | number) => dispatch({ type: "REMOVE", id });

  const isFavorite = (id: string | number) => {
    const favKey = String(id);
    return Boolean(favoritesMap[favKey]);
  };

  const favorites = Object.values(favoritesMap);

  return (
    <FavoritContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritContext.Provider>
  );
}

export function useFavorites() {
  const fav = useContext(FavoritContext);
  if (!fav) throw new Error("Error");
  return fav;
}
