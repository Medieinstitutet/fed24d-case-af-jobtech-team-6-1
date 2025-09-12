import { useContext } from "react";
import { useParams } from "react-router";
import { JobContext } from "../contexts/JobContext";

export const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { jobs } = useContext(JobContext);

  const currentJob = jobs.find((j) => j.id === id);


  if (!currentJob) {
    return <p>Jobbet kunde inte hittas.</p>;
  }

  return (
    <>
      <div>
        <h2>{currentJob.headline}</h2>
        {currentJob.employer?.name && <em> {currentJob.employer.name} </em>}
        {currentJob.workplace_address?.municipality && (
          <div>Ort: {currentJob.workplace_address.municipality} </div>
        )}
        {currentJob.workplace_address?.region && (
          <div>Län: {currentJob.workplace_address.region} </div>
        )}
        {currentJob.publication_date && (
          <div>
            Publicerad:{" "}
            {new Date(currentJob.publication_date).toLocaleDateString()}{" "}
          </div>
        )}
        {currentJob.webpage_url && (
          <a href={currentJob.webpage_url} target="_blank" rel="noreferrer">
            <div>Läs mer</div>
          </a>
        )}
      </div>
    </>
  );
};
