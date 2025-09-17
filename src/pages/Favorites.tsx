import { useFavoritesLogic } from "../hooks/useFavoritesLogic";
import { DigiButton } from "@designsystem-se/af-react";
import { DigiFormCheckbox, DigiLinkExternal } from "@designsystem-se/af-react";
import { ButtonVariation, LayoutBlockVariation } from "@designsystem-se/af";
import "../styles/favorites.scss";
import { NavLink } from "react-router";
import { DigiTypography, DigiLayoutBlock } from "@designsystem-se/af-react";

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
            key={id}
            className={applied ? "favorite-item favorite-item--applied" : "favorite-item"}
          >

            <div className="favorite-item__status">
              <DigiFormCheckbox
                afChecked={applied}
                onAfOnChange={(e: any) => toggleApplied(id, e.detail?.checked ?? !applied)}
                afLabel="Ansökt"
              />
            </div>

            <DigiLayoutBlock
              afVariation={LayoutBlockVariation.PRIMARY}
              className="favorite-item__body"
            >
              <DigiTypography>
                <h2 className="job-title">
                  <NavLink className="btn" to={`/job/${id}`}>{j.headline}</NavLink>
                </h2>

                {j.employer?.name && <h3 className="employer">{j.employer.name}</h3>}

                <DigiLayoutBlock className="meta" afVariation={LayoutBlockVariation.PRIMARY}>
                  {j.workplace_address?.municipality && (
                    <h4><strong>Ort:</strong> {j.workplace_address.municipality}</h4>
                  )}
                  {j.workplace_address?.region && (
                    <h4><strong>Län:</strong> {j.workplace_address.region}</h4>
                  )}
                  {j.publication_date && (
                    <h4>
                      <strong>Publicerad:</strong>{" "}
                      {new Intl.DateTimeFormat("sv-SE").format(new Date(j.publication_date))}
                    </h4>
                  )}
                  {j.webpage_url && (
                    <DigiLinkExternal afHref={j.webpage_url}>Läs mer</DigiLinkExternal>
                  )}
                </DigiLayoutBlock>
              </DigiTypography>
            </DigiLayoutBlock>

              <DigiButton
                className="btn"
                afVariation={ButtonVariation.SECONDARY}
                afSize="small"
                onAfOnClick={() => { removeFavorite(id); removeApplied(id); }}
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
