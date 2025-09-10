import { useLoaderData } from "react-router-dom";
import type { Job } from "../models/Job";
import { useFavorites } from "../contexts/FavoritesContext";

export default function JobList() {
  const data = useLoaderData() as { hits: Job[] } | Job[] | undefined; 
  const jobs = Array.isArray(data) ? data : data?.hits ?? [];           

  const { addFavorite, isFavorite } = useFavorites();

  const visibleJobs = jobs.filter(j => !isFavorite((j as any).id));

  return (
    <section>
      <h1>Jobb Jobb Jobb</h1>
      <ul>
        {visibleJobs.map(j => (
    <li key={j.id}>
  <div>{j.headline}</div>{" "}
        {j.employer?.name && <em>– {j.employer.name} </em>}
        {j.workplace_address?.municipality && (
            <div>Ort: {j.workplace_address.municipality} </div>
        )}
        {j.workplace_address?.region && (
            <div>Länn: {j.workplace_address.region} </div>
        )}
        {j.publication_date && (
            <div>Publicerad: {new Date(j.publication_date).toLocaleDateString()} </div>
        )}

  {j.webpage_url && (
    <a href={j.webpage_url} target="_blank" rel="noreferrer">
      <div>Läs mer</div>
    </a>
  )}
   <button className="btn" onClick={() => addFavorite(j)}>Favoritmarkera</button>
</li>

        ))}
      </ul>
    </section>
  );
}
