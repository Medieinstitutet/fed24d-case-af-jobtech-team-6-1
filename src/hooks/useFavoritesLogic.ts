import { useMemo } from "react";
import { useFavorites } from "../contexts/FavoritesContext";
import { useApplied } from "../contexts/AppliedContext";


export function useFavoritesLogic() {
  const { favorites, removeFavorite } =useFavorites();
  const { isApplied, toggleApplied, removeApplied } = useApplied();


  const total = favorites.length;


  const appliedCount = useMemo(
    () => favorites.reduce(( n, j ) => n + (isApplied(( j as any ).id) ?  1 : 0), 0),
    [favorites, isApplied]
  );
  const items = useMemo(
    () =>
      [...favorites].sort(
        (a, b) => Number(isApplied(( a as any ).id)) - Number(isApplied((b as any).id))
      ),
    [favorites, isApplied]
  );


  return {
    favorites,
    removeFavorite,
    isApplied,
    toggleApplied,
    removeApplied,
    total,
    appliedCount,
    items,
  };
}
