import type { LoaderFunctionArgs } from "react-router";
import type { Job } from "../models/Job"

export type JobLoader = {
    job: Job;
}

export const jobLoader = async ({
    params,
  }: LoaderFunctionArgs): Promise<JobLoader> => {
    
    const { id } = params;
    
    return {
      job: {
        id: "",
      },
    };
  };