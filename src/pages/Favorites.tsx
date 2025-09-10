import { useFavorites } from "../contexts/FavoritesContext";

export default function Favorites() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <section>
      <h1>Favoriter</h1>
      {favorites.length === 0 ? (
        <p>Inga Favvs ännu?</p>
      ) : (
        <ul>
          {favorites.map((j) => (
            <li key={(j as any).id}>
              <div>{j.headline}</div>{" "}
              {j.employer?.name && <em>– {j.employer.name} </em>}
              {j.workplace_address?.municipality && (
                <div>Ort: {j.workplace_address.municipality}</div>
              )}
              {j.workplace_address?.region && (
                <div>Län: {j.workplace_address.region}</div>
              )}
              {j.publication_date && (
                <div>
                  Publicerad: {new Date(j.publication_date).toLocaleDateString()}
                </div>
              )}
              {j.webpage_url && (
                <a href={j.webpage_url} target="_blank" rel="noreferrer">
                  <div>Läs mer</div>
                </a>
              )}
              <button className="btn" onClick={() => removeFavorite((j as any).id)}>
                Ta bort från favoriter
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
