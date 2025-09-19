import type { LoaderFunctionArgs } from "react-router";
import type { Job } from "../models/Job";
import { getJobs } from "../services/jobService";

export type JobLoader = {
  job: Job;
};

export const jobLoader = async ({ params }: LoaderFunctionArgs): Promise<JobLoader> => {
  const { id } = params;

  if (!id) {
    throw new Response("Job ID saknas", { status: 400 });
  }

  const allJobs = await getJobs();
  const job = allJobs.hits.find((j) => j.id === id);

  if (!job) {
    throw new Response("Jobb hittades inte", { status: 404 });
  }

  return { job };
};
