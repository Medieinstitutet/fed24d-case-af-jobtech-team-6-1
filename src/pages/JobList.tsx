import { useContext } from "react";
import type { Job } from "../models/Job";
import { useFavorites } from "../contexts/FavoritesContext";
import { JobContext } from "../contexts/JobContext";
import { NavLink } from "react-router";
import { useJobActions } from "../hooks/useJobAction";
import { DigiButton } from "@designsystem-se/af-react";

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
    <section>
      <h1>Jobb Jobb Jobb</h1>
      <ul>
        {visibleJobs.map((j) => (
          <li key={j.id}>
            
            <DigiButton onAfOnClick={() => removeJob(j.id)}>
              Ta bort
            </DigiButton>

            <NavLink to={`/job/${j.id}`}>{j.headline}</NavLink>{" "}
            {j.employer?.name && <em> {j.employer.name} </em>}
            {j.workplace_address?.municipality && (
              <div>Ort: {j.workplace_address.municipality} </div>
            )}
            {j.workplace_address?.region && (
              <div>Län: {j.workplace_address.region} </div>
            )}
            {j.publication_date && (
              <div>
                Publicerad: {new Date(j.publication_date).toLocaleDateString()}{" "}
              </div>
            )}
            {j.webpage_url && (
              <a href={j.webpage_url} target="_blank" rel="noreferrer">
                <div>Läs mer</div>
              </a>
            )}

            <DigiButton onAfOnClick={() => addFavorite(j)}>
              Favoritmarkera
            </DigiButton>
            
          </li>
        ))}
      </ul>
    </section>
  );
}
