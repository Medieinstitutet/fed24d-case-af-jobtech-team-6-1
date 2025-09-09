export type Job = {
  id: string;
  headline: string;
  employer?: { name?: string };
  workplace_address?: { municipality?: string;region?: string };
  publication_date?: string;
  application_deadline?: string;
  webpage_url?: string;
};


export type JobResult =  {
  hits: Job[];
  total: number;
}; 
