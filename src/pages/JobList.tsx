import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import type { Job } from "../models/Job";
import { useFavorites } from "../contexts/FavoritesContext";
import { JobActionType } from "../reducers/JobReducer";
import { JobContext } from "../contexts/JobContext";

export default function JobList() {
  const data = useLoaderData() as { hits: Job[] } | Job[] | undefined;
  const initialJobs = Array.isArray(data) ? data : data?.hits ?? [];
  const { jobs, dispatch } = useContext(JobContext);

  const { addFavorite, isFavorite } = useFavorites();

  let visibleJobs = initialJobs.filter((j) => !isFavorite((j as Job).id));

  visibleJobs = visibleJobs.filter((j) => !j.isHidden);

  function removeJob(id: string) {
    console.log("hej");
    if (id) {
      console.log("hallå");
      dispatch({
        type: JobActionType.REMOVEADD,
        payload: id,
      });
    }
    console.log(id);
  }

  return (
    <section>
      <h1>Jobb Jobb Jobb</h1>
      <ul>
        {visibleJobs.map((j) => (
          <li key={j.id}>
            <button onClick={() => removeJob(j.id)}>Ta bort</button>
            <div>{j.headline}</div>{" "}
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
            <button className="btn" onClick={() => addFavorite(j)}>
              Favoritmarkera
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
