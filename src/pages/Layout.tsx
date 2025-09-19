import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { JobContext } from "../contexts/JobContext";
import { useEffect, useReducer } from "react";
import { JobActionType, JobReducer } from "../reducers/JobReducer";
import { getJobs } from "../services/jobService";

export const Layout = () => {
  const [jobs, dispatch] = useReducer(JobReducer, []);
  const limit = 100;

  useEffect(() => {
    if (jobs.length > 0) return;

    const fetchFirstHundredJobs = async () => {
      try {
        let currentOffset = 0;
        const firstResult = await getJobs(currentOffset, limit);
        let allJobs = [...firstResult.hits];
        const totalJobs = firstResult.total;

        while (allJobs.length < totalJobs) {
          currentOffset += limit;
          const nextResult = await getJobs(currentOffset, limit);

          if (!nextResult.hits || nextResult.hits.length === 0) break;

          allJobs = [...allJobs, ...nextResult.hits];
        }

        dispatch({
          type: JobActionType.SET,
          payload: allJobs,
        });
      } catch (error) {
        console.error("Fel vid hämtning av jobb:", error);
      }
    };

    fetchFirstHundredJobs();
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
