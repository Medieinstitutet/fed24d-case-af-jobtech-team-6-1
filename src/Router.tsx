import { createBrowserRouter } from "react-router";
import { Error } from "./pages/Error";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { jobLoader } from "./loaders/JobLoader";
import { jobsLoader } from "./loaders/JobsLoader";
import { JobDetails } from "./pages/JobDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        loader: jobsLoader,
        element: <Home />,
      },
      {
        path: "/job",
        loader: jobLoader,
        element: <JobDetails />,
      },
    ],
  },
]);
