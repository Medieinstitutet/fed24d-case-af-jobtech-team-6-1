import type { Job } from "../models/Job";

export type JobsLoader = {
    jobs: Job[];
};

export const jobsLoader = async (): Promise<JobsLoader> => {


}

