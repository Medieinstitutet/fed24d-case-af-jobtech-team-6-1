import { useContext } from "react";
import type { Job } from "../models/Job";
import { useFavorites } from "../contexts/FavoritesContext";
import { JobContext } from "../contexts/JobContext";
import { NavLink } from "react-router";
import { useJobActions } from "../hooks/useJobAction";
import "../styles/joblist.scss";
import { DigiLinkExternal } from "@designsystem-se/af-react";
import { DigiButton } from "@designsystem-se/af-react";
import { DigiTypography, DigiLayoutBlock } from "@designsystem-se/af-react";
import { LayoutBlockVariation } from "@designsystem-se/af";


// behöver ha dem såhär för att inte typescript ska bråka
const DigiIconHeart = 'digi-icon-heart' as unknown as React.ElementType;
const DigiIconHeartSolid = 'digi-icon-heart-solid' as unknown as React.ElementType;



export default function JobList() {
//  const data = useLoaderData() as { hits: Job[] } | Job[] | undefined;
//  const initialJobs = Array.isArray(data) ? data : data?.hits ?? [];
  const { jobs } = useContext(JobContext);

  const { addFavorite, isFavorite } = useFavorites();

  let visibleJobs = jobs.filter((j) => !isFavorite((j as Job).id));

  visibleJobs = visibleJobs.filter((j) => !j.isHidden);

  const { removeJob } = useJobActions();

  // function removeJob(id: string) {
  //   console.log("hej");
  //   if (id) {
  //     console.log("hallå");
  //     dispatch({
  //       type: JobActionType.REMOVEADD,
  //       payload: id,
  //     });
  //   }
  //   console.log(id);
  // }

  return (
    <section className="joblist">
      <h1>Jobbannonser:</h1>
      <ul>
        {visibleJobs.map((j) => (
          <li key={j.id} className="joblist-item">

            <DigiTypography>
              <h2 className="job-title">
                <NavLink className="btn" to={`/job/${j.id}`}>
                  {j.headline}
                </NavLink>
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
                    {new Date(j.publication_date).toLocaleDateString()}
                  </h4>
                )}

                {j.webpage_url && (
                  <DigiLinkExternal afHref={j.webpage_url}>
                    Läs mer
                  </DigiLinkExternal>
                )}
              </DigiLayoutBlock>
            </DigiTypography>

            <span
              className="fav-icon"
              role="button"
              tabIndex={0}
              aria-label={`Favoritmarkera ${j.headline}`}
              onClick={() => addFavorite(j)}
            >
              <DigiIconHeart />
              <DigiIconHeartSolid />
            </span>
            <DigiButton
              className="btn"
              afVariation="secondary"
              onAfOnClick={() => removeJob(j.id)}
            >
              Ta bort
            </DigiButton>

          </li>
        ))}
      </ul>
    </section>
  );
}



// <digi-icon-trash></digi-icon-trash>

//<digi-icon-heart></digi-icon-heart>
//<digi-icon-heart-solid></digi-icon-heart-solid>

