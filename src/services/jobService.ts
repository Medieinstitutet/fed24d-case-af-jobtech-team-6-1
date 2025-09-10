import type { JobResult } from "../models/Job"; 
import { get } from "./serviceBase"; 

const BASE_URL = "https://jobsearch.api.jobtechdev.se/search"; 
// const DATA_IT_FIELD_ID = "apaJ_2ja_LuF"; för alla It/data jobb

export const getJobs = async (
  offset = 0,
  limit = 100,
  
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







