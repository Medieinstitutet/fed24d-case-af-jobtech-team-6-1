import { createContext, type Dispatch } from "react";
import type { Job } from "../models/Job";
import type { JobAction } from "../reducers/JobReducer";

type JobContextType = {
    jobs: Job[];
    dispatch: Dispatch<JobAction>;
}

export const JobContext = createContext<JobContextType>({
    jobs: [],
    dispatch: () => {},
});