import { useFavoritesLogic } from "../hooks/useFavoritesLogic";
import { DigiButton } from "@designsystem-se/af-react";
import { DigiFormCheckbox, DigiLinkExternal } from "@designsystem-se/af-react";
import { ButtonVariation } from "@designsystem-se/af";
import "../styles/favorites.scss";


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
    <section className="favorites">
      <h1>Mina favoriter</h1>
      <p>Ansökta: {appliedCount} jobb av {total}</p>
      {items.length === 0 ? (
        <p>Inga Favvs ännu?</p>
      ) : (
        <ul>
          {items.map((j) => {
            const id = (j as any).id;
            const applied = isApplied(id);
            return (
              <li
                key={id} className={applied ? "favorite-item favorite-item--applied" : "favorite-item"}
              >
                <div>{j.headline}</div>
                {j.employer?.name && <em>– {j.employer.name} </em>}
                {j.workplace_address?.municipality && (
                  <div>Ort: {j.workplace_address.municipality}</div>
                )}
                {j.workplace_address?.region && (
                  <div>Län: {j.workplace_address.region}</div>
                )}
                {j.publication_date && (
                  <div>
                    Publicerad: {new Intl.DateTimeFormat("sv-SE").format(new Date(j.publication_date))}
                  </div>
                )}

                <div className="actions-top">
                  <DigiFormCheckbox
                    afChecked={applied}
                    onAfOnChange={(e: any) => toggleApplied(id, e.detail?.checked ?? !applied) }
                    afLabel="Ansökt"
                  />

                  {j.webpage_url && (
                    <DigiLinkExternal afHref={j.webpage_url}>
                      Läs mer
                    </DigiLinkExternal>
                  )}
                </div>

  
                <DigiButton
                  className="btn"
                  afVariation={ButtonVariation.SECONDARY}
                  afSize="small"
                  onAfOnClick={() => { removeFavorite(id); removeApplied(id)}}
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
