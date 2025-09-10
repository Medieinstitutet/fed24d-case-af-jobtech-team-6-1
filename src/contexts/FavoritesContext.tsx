import { createContext, useContext, useEffect, useState } from "react";
import type { Job } from "../models/Job";

const FavoritesContext = createContext<fav | undefined>(undefined);

type fav = {
  favorites: Job[];
  addFavorite: (job: Job) => void;
  removeFavorite: (id: string | number) => void;
  isFavorite: (id: string | number) => boolean;
};



export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoritesMap, setFavoritesMap] = useState<Record<string, Job>>(() => {
    try {
      const raw = localStorage.getItem("favorites");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  } );

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favoritesMap));
    } catch {}
  }, [favoritesMap]);

  const addFavorite = (job: Job) => {
    const  favKey = String((job as any).id);
    setFavoritesMap((prev) => (prev[favKey] ? prev : { ...prev, [favKey]: job }));
  };

  const removeFavorite = (id: string | number) => {
    const favKey = String(id);
    setFavoritesMap((prev) => {
      if (!prev[favKey]) return prev;
      const { [favKey]: _, ...rest } = prev;
      return rest;
    });
  };

  const isFavorite = (id: string | number) => {
    const favKey = String(id);
    return Boolean(favoritesMap[favKey]);
  };

  const favorites = Object.values(favoritesMap);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const fav = useContext(FavoritesContext);
  if (!fav) throw new Error("Error");
  return fav;
}
