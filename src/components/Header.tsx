import { useFavorites } from "../contexts/FavoritesContext";
import {
  DigiHeader,
  DigiHeaderNavigation,
  DigiHeaderNavigationItem,
} from "@designsystem-se/af-react";
import { useLocation } from "react-router-dom";

export const Header = () => {
  const { favorites } = useFavorites();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <DigiHeader
      afSystemName="Platsbanken för utvecklare"
      afHideSystemName={true}
      afMenuButtonText="Meny"
    >
      <a
        slot="header-logo"
        aria-label="Platsbanken för utvecklare"
        href="/"
      ></a>
      <div slot="header-navigation">
        <DigiHeaderNavigation
          afCloseButtonText="Stäng"
          afCloseButtonAriaLabel="Stäng meny"
          afNavAriaLabel="Huvudmeny"
        >
          <DigiHeaderNavigationItem afCurrentPage={currentPath === "/"}>
            <a href="/">Jobbannonser</a>
          </DigiHeaderNavigationItem>
          <DigiHeaderNavigationItem
            afCurrentPage={currentPath === "/favorites"}
          >
            <a href="/favorites">Mina favoriter ({favorites.length})</a>
          </DigiHeaderNavigationItem>
        </DigiHeaderNavigation>
      </div>
    </DigiHeader>
  );
};
