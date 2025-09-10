import { getJobs } from "../services/jobService";
import type { Job } from "../models/Job";

export const jobsLoader = async (): Promise<Job[]> => {
  const res = await getJobs(0, 100);
  return res.hits; 
};
