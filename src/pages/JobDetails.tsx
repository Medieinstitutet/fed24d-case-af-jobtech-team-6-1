import { useContext, useState } from "react";
import { useParams } from "react-router";
import { JobContext } from "../contexts/JobContext";
import {
  DigiButton,
  DigiLayoutBlock,
  DigiLinkExternal,
  DigiTypography,
} from "@designsystem-se/af-react";
import { LayoutBlockVariation } from "@designsystem-se/af";

export const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { jobs } = useContext(JobContext);
  const [expanded, setExpanded] = useState(false);

  const currentJob = jobs.find((j) => j.id === id);

  if (!currentJob) {
    return <p>Jobbet kunde inte hittas.</p>;
  }

  const SHORT_DESCRIPTION_LENGTH = 500;

  const jobDescriptionHtml = currentJob.description?.text || "";

  const shortDescription = jobDescriptionHtml.slice(
    0,
    SHORT_DESCRIPTION_LENGTH
  );
  const showExpandButton = jobDescriptionHtml.length > SHORT_DESCRIPTION_LENGTH;

  return (
    <DigiLayoutBlock afVariation={LayoutBlockVariation.PRIMARY}>
      <img src={currentJob.logo_url} />

      <DigiTypography>
        <h2>{currentJob.headline}</h2>
        <h3>
          <em>{currentJob.employer?.name}</em>
        </h3>
        <p>
          <strong>Kommun:</strong> {currentJob.workplace_address?.municipality}
        </p>
        <p>
          <strong>Län:</strong> {currentJob.workplace_address?.region}
        </p>

        {currentJob.publication_date && (
          <p>
            <strong>Publicerad:</strong>{" "}
            {new Date(currentJob.publication_date).toLocaleDateString()}
          </p>
        )}
        <h3>Om jobbet:</h3>

        <p
          style={{
            whiteSpace: "pre-wrap",
            lineHeight: 1.6,
            maxWidth: "65ch",
            width: "100%",
            wordWrap: "break-word",
          }}
          dangerouslySetInnerHTML={{
            __html: expanded ? jobDescriptionHtml : `${shortDescription}...`,
          }}
        />

        {showExpandButton && (
          <DigiButton
            onClick={() => setExpanded(!expanded)}
            className="button button--secondary"
            style={{ marginTop: "1rem", display: "inline" }}
          >
            {expanded ? "Visa mindre" : "Visa mer"}
          </DigiButton>
        )}

        {currentJob.webpage_url && (
          <DigiLinkExternal
            afHref={currentJob.webpage_url}
            style={{ display: "block", margin: "1rem" }}
          >
            Annons på Arbetsförmedligens hemsida
          </DigiLinkExternal>
        )}
      </DigiTypography>
    </DigiLayoutBlock>
  );
};
