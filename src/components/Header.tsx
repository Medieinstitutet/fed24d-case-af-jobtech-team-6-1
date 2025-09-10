import { NavLink } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";

export const Header = () => {
  const { favorites } = useFavorites();

  return (
    <nav>
      <NavLink to="/"><p>Till Jobb jobb jobb</p></NavLink>{" "}
      <NavLink to="/favorites">FAV ({favorites.length})</NavLink>
    </nav>
  );
};
