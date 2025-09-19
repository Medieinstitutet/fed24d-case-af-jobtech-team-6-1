import type { JobResult } from "../models/Job"; 
import { get } from "./serviceBase"; 

const BASE_URL = "https://jobsearch.api.jobtechdev.se/search"; 

export const getJobs = async (
  offset = 0,
  limit = 50,
  
  occupationGroup = "2512",  // Systemutvecklare
  region = "01"  // Stockholms län
): Promise<JobResult> => {
  const params = new URLSearchParams({
    offset: offset.toString(),
    limit: limit.toString(),
    "occupation-group": occupationGroup,
    region: region
  });

  return get<JobResult>(`${BASE_URL}?${params.toString()}`);
};


