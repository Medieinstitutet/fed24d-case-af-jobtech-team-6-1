import { useFavoritesLogic } from "../hooks/useFavoritesLogic";
import { DigiButton } from "@designsystem-se/af-react";

export default function Favorites() {
  const {
    removeFavorite,
    isApplied,
    toggleApplied,
    removeApplied,
    total,
    appliedCount,
    items,
  } = useFavoritesLogic();

  return (
    <section>
      <h1>Favoriter</h1>
      <p>Ansökta: {appliedCount} jobb av {total}</p>
      {items.length === 0 ? (
        <p>Inga Favvs ännu?</p>
      ) : (
        <ul>
          {items.map((j) => {
            const id = (j as any).id;
            const applied = isApplied(id);
            return (
              <li key={id}>
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
                <label>
                  <input
                    type="checkbox"
                    checked={applied}
                    onChange={(e) => toggleApplied(id, e.currentTarget.checked)}
                  />{" "}
                  Ansökt
                </label>
                
                <DigiButton
                  className="btn" onAfOnClick={() => {removeFavorite(id);
                  removeApplied(id);
                  }}
                >
                  Ta bort från favoriter
                </DigiButton>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
