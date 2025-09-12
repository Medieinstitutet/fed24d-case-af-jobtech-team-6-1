import type { Job } from "../models/Job";

export enum JobActionType {
  SET,
  REMOVEADD,
}

export type JobAction =
    | { type: JobActionType.SET; payload: Job[] }
    | { type: JobActionType.REMOVEADD; payload: string };


export const JobReducer = (jobs: Job[], action: JobAction): Job[] => {
  let updateJobList: Job[] = [...jobs];

  switch (action.type) {
    case JobActionType.SET:
      updateJobList = action.payload;
      localStorage.setItem("jobs", JSON.stringify(updateJobList));

      break;

    case JobActionType.REMOVEADD:
      updateJobList = jobs.map((j) =>
        j.id === action.payload
          ? { ...j, isHidden: true }
          : j
      );

      localStorage.setItem("jobs", JSON.stringify(updateJobList));
      break;

    default:
      return jobs;
  }

  localStorage.setItem("jobs", JSON.stringify(updateJobList));
  return updateJobList;
};