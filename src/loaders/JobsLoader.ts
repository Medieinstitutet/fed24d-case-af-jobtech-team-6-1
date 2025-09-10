import type { Job } from "../models/Job";
import { getJobs } from "../services/jobService";

export type JobsLoader = {
    jobs: Job[];
};

export const jobsLoader = async (): Promise<JobsLoader> => {

    const jobsInStorage = localStorage.getItem("jobs");

    if (jobsInStorage !== null) {
        
        return { jobs: JSON.parse(jobsInStorage) as Job[] };
    }

    const jobs = await getJobs();

    localStorage.setItem("jobs", JSON.stringify(jobs));
    return { jobs } satisfies JobsLoader;
}