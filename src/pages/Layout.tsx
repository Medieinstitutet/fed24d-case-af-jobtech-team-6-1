import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { JobContext } from "../contexts/JobContext";
import { useEffect, useReducer } from "react";
import { JobActionType, JobReducer } from "../reducers/JobReducer";
import { getJobs } from "../services/jobService";

export const Layout = () => {
  const [jobs, dispatch] = useReducer(JobReducer, []);

  useEffect(() => {
    if (jobs.length > 0) return; 

    const fetchJobs = async () => {
      const result = await getJobs();
      dispatch({
        type: JobActionType.SET,
        payload: result.hits,
      });
    };

    fetchJobs();
  }, [jobs, dispatch]);
  
  return (
    <>
      <header>
        <Header />
      </header>

      <JobContext.Provider value={{ jobs, dispatch }}>
        <main>
          <Outlet />
        </main>
      </JobContext.Provider>

      <footer></footer>
    </>
  );
};
