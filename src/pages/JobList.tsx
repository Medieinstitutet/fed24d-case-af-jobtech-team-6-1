import { useContext, useState } from "react";
import type { Job } from "../models/Job";
import { useFavorites } from "../contexts/FavoritesContext";
import { JobContext } from "../contexts/JobContext";
import { NavLink } from "react-router";
import { useJobActions } from "../hooks/useJobAction";
import "../styles/joblist.scss";
import {
  DigiLinkExternal,
  DigiNavigationPagination,
} from "@designsystem-se/af-react";
import { DigiButton } from "@designsystem-se/af-react";
import { DigiTypography, DigiLayoutBlock } from "@designsystem-se/af-react";
import {
  LayoutBlockVariation,
} from "@designsystem-se/af";
import { getJobs } from "../services/jobService";
import { JobActionType } from "../reducers/JobReducer";

// behöver ha dem såhär för att inte typescript ska bråka
const DigiIconHeart = "digi-icon-heart" as unknown as React.ElementType;
const DigiIconHeartSolid =
  "digi-icon-heart-solid" as unknown as React.ElementType;

export default function JobList() {
  const { jobs, dispatch } = useContext(JobContext);

  const { addFavorite, isFavorite } = useFavorites();

  let visibleJobs = jobs.filter((j) => !isFavorite((j as Job).id));

  visibleJobs = visibleJobs.filter((j) => !j.isHidden);

  const { removeJob } = useJobActions();

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 25;

  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const currentJobs = visibleJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  const [offset, setOffset] = useState(0);
  const limit = 100;

  const handlePageChange = async (event: CustomEvent) => {
    setCurrentPage(event.detail);
    console.log(currentPage, totalPages);
    if (currentPage === totalPages) {
      const jobs = await getJobs(offset, limit);
      dispatch({
        type: JobActionType.ADD,
        payload: jobs.hits,
      });
      setOffset(offset + 100);
      console.log("hej");
      console.log(currentPage, totalPages);
      console.log("total:" + jobs.total.toString());
    }
  };

  return (
    <section className="joblist">
      <h1>Jobb Jobb Jobb</h1>
      <ul>
        {currentJobs.map((j) => (
          <li key={j.id} className="joblist-item">
            <DigiTypography>
              <h2 className="job-title">
                <NavLink className="btn" to={`/job/${j.id}`}>
                  {j.headline}
                </NavLink>
              </h2>

              {j.employer?.name && (
                <h3 className="employer">{j.employer.name}</h3>
              )}

              <DigiLayoutBlock
                className="meta"
                afVariation={LayoutBlockVariation.PRIMARY}
              >
                {j.workplace_address?.municipality && (
                  <h4>
                    <strong>Ort:</strong> {j.workplace_address.municipality}
                  </h4>
                )}

                {j.workplace_address?.region && (
                  <h4>
                    <strong>Län:</strong> {j.workplace_address.region}
                  </h4>
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
      <DigiNavigationPagination
        afTotalPages={jobs.length / 25 }
        afInitActive-page={currentPage}
        afCurrentResultStart={(currentPage - 1) * jobsPerPage + 1}
        afCurrentResultEnd={Math.min(currentPage * jobsPerPage, jobs.length)}
        afTotalResults={jobs.length}
        afResultName="jobbannonser"
        onAfOnPageChange={handlePageChange}
      />
    </section>
  );
}