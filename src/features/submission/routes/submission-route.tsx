import type { RouteObject } from "react-router-dom";
import SubmissionPage from "./pages/submission-page";

export const submissionRoutes: RouteObject[] = [
  {
    path:':submissionId',
    element: <SubmissionPage />,
  },
];
