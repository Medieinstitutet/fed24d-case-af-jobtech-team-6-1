import { createBrowserRouter } from "react-router";
import { Error } from "./pages/Error";
import { Layout } from "./pages/Layout";
//import { Home } from "./pages/Home";
import { jobLoader } from "./loaders/JobLoader";
import { jobsLoader } from "./loaders/JobsLoader";
import { JobDetails } from "./pages/JobDetails";
import JobList from "./pages/JobList";
import Favorites from "./pages/Favorites"; // ← NYTT

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        loader: jobsLoader,
        element: <JobList />, //TESTAR ENBART!!! :)
      },
      {
        path: "/job/:id",
        loader: jobLoader,
        element: <JobDetails />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
    ],
  },
]);
