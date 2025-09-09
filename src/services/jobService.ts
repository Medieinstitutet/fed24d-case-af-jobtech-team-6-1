import type { Job } from "../models/Job";
import { get } from "./serviceBase";

const BASE_URL = "API-";

export const getJobs = async (): Promise<Job[]> => {
    const data = await get<Job[]>(`${BASE_URL}`);
    return data;
}