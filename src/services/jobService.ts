import type { JobResult } from "../models/Job"; 
import { get } from "./serviceBase"; 

const BASE_URL = "https://jobsearch.api.jobtechdev.se"; 

export const getJobs = async (offset = 0, limit = 10): Promise<JobResult> => { 
    return get<JobResult>(`${BASE_URL}/search?offset=${offset}&limit=${limit}`); 
};
