import type { RouteObject } from "react-router-dom";
import QuestionsPage from "./pages/questions-page";
import { submissionRoutes } from "@/features/submission/routes/submission-route";

export const QuestionRoutes: RouteObject[] = [
  {
    path: "questions",
    element: <QuestionsPage />,
  },
  {
    path:'submission',
    children:submissionRoutes
  }
];
