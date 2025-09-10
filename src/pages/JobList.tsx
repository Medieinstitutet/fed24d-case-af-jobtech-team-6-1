import { useEffect, useState } from "react";
import { getJobs } from "../services/jobService";
import type { Job } from "../models/Job";
import { useFavorites } from "../contexts/FavoritesContext";

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]> ([]);
  const [error, setError] = useState<string | null> (null);
  const { addFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    getJobs(0, 100)
      .then(r => setJobs(r.hits))
      .catch(() => setError("Kan ej hämta annonser"));
  }, []);

  if (error) return <p role="alert">{error}</p>;
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
