import { useEffect, useState } from "react";
import { getJobs } from "../services/jobService";
import type { Job } from "../models/Job";

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]> ([]);
  const [error, setError] = useState<string | null> (null);

  useEffect(() => {
    getJobs(0, 10)
      .then(r => setJobs(r.hits))
      .catch(() => setError("Kan ej hämta annonser"));
  }, []);

  if (error) return <p role="alert">{error}</p>;

  return (
    <section>
      <h1>Jobb Jobb Jobb</h1>
      <ul>
        {jobs.map(j => (
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
</li>

        ))}
      </ul>
    </section>
  );
}
