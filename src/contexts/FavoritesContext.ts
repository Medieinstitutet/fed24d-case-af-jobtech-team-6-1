import { createContext, useContext, useReducer, createElement, type ReactNode } from "react";
import type { Job } from "../models/Job";
import { favoritReducer } from "../reducers/favoritReducer";

type Fav = {
  favorites: Job[];
  addFavorite: (job: Job) => void;
  removeFavorite: (id: string | number) => void;
  isFavorite: (id: string | number) => boolean;
};

export const FavoritContext = createContext<Fav | undefined>(undefined);

const KEY = "favorites";

export function FavoritProvider({ children }: { children: ReactNode }) {
  const [favoritesMap, dispatch] = useReducer(favoritReducer, {}, () => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
      return raw ? (JSON.parse(raw) as Record<string, Job>) : {};
    } catch {
      return {};
    }
  });

  const save = (next: Record<string, Job>) => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  };

  const commit = (action: any) => {
    const next = favoritReducer(favoritesMap, action);
    save(next);
    dispatch(action);
  };

  const addFavorite = (job: Job) => commit({ type: "ADD", job });
  const removeFavorite = (id: string | number) => commit({ type: "REMOVE", id });
  const isFavorite = (id: string | number) => Boolean(favoritesMap[String(id)]);
  const favorites = Object.values(favoritesMap);

  return createElement(
    FavoritContext.Provider,
    { value: { favorites, addFavorite, removeFavorite, isFavorite } },
    children
  );
}

export function useFavorites() {
  const fav = useContext(FavoritContext);
  if (!fav) throw new Error("Error");
  return fav;
}
