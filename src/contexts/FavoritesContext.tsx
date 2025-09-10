import { createContext, useContext, useEffect, useReducer } from "react";
import type { Job } from "../models/Job";

export const FavoritContext = createContext<fav | undefined>(undefined);

type fav = {
  favorites: Job[];
  addFavorite: (job: Job) => void;
  removeFavorite: (id: string | number) => void;
  isFavorite: (id: string | number) => boolean;
};

type Action =
  |{ type: "ADD"; job: Job }
  |{ type: "REMOVE"; id: string | number };

function reducer(state: Record<string, Job>, action: Action): Record<string, Job> {
  switch (action.type) {
  case "ADD": {
      const favKey = String((action.job as any).id);
      return state[favKey] ? state : { ...state, [favKey]: action.job };
    }
  case "REMOVE": {
      const favKey = String(action.id);
  if (!state[favKey]) return state;
      const { [favKey]: _, ...rest } = state;
  return rest;
    }
    default:
      return state;
  }
}

export function FavoritProvider({ children }: { children: React.ReactNode }) {
  const [favoritesMap, dispatch] = useReducer(reducer, {}, () => {
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

  const addFavorite = (job: Job) => 
        dispatch({ type: "ADD", job });

  const removeFavorite = (id: string | number) =>
  dispatch({ type: "REMOVE", id });

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
