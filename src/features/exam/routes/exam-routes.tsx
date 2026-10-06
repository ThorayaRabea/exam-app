// exam-routes.tsx
import QuestionViewPage from "@/features/question/components/admin/question-view-page/question-view-page";
import { QuestionRoutes } from "@/features/question/routes/questions-route";
import type { RouteObject } from "react-router-dom";
import AddExamPage from "./pages/add-exam-page";
import AdminExamPage from "./pages/admin-exam-page";
import ExamViewPage from "./pages/exam-view-page";
import ExamsPage from "./pages/exams-page";
import QuestionEditPage from "@/features/question/components/admin/edit-question/question-edit-page";
import AddBulkQuestionsPage from "@/features/question/components/admin/add-bulk-question/add-bulk-questions-page";
import EditExamPage from "./pages/edit-exam-page";

export const ExamRoute: RouteObject[] = [
  { path: ":diplomaId", element: <ExamsPage /> },
  { path: ":diplomaId/:examId", children: QuestionRoutes },
];

export const AdminExamRoutes: RouteObject[] = [
  { index: true, element: <AdminExamPage /> },
  { path: "add-exam", element: <AddExamPage /> },
  {
    path: "exam-details/:examId",
    children: [
      { index: true, element: <ExamViewPage /> },
      { path: "questions/:questionId", element: <QuestionViewPage /> },
      { path: "questions/:questionId/edit", element: <QuestionEditPage /> },
      { path: "questions/add", element: <AddBulkQuestionsPage /> },
    ],
  },
  {
    path: "edit-exam/:examId",
    children: [
      { index: true, element: <EditExamPage /> },
      { path: "questions/:questionId", element: <QuestionViewPage /> },
      { path: "questions/:questionId/edit", element: <QuestionEditPage /> },
      { path: "questions/add", element: <AddBulkQuestionsPage /> },
    ],
  }
];
