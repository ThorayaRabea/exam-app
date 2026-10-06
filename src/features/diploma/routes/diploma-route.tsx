import { ExamRoute } from "@/features/exam/routes/exam-routes";
import type { RouteObject } from "react-router-dom";
import DiplomaPage from "./pages/diploma-page";
import AdminDiplomaPage from "./pages/admin-diploma-page";
import DiplomaViewPage from "./pages/diploma-view-page";
import AddNewDiplomaPage from "./pages/add-new-diploma-page";
import EditDiplomaForm from "../components/admin-diploma/diploma-details/edit-diploma-form";
import EditDiplomaPage from "./pages/edit-diploma-page";

export const DiplomaRoutes: RouteObject[] = [
  {
    index: true,
    element: <DiplomaPage />,
  },
  { path: "exam", children: ExamRoute },
];


export const AdminDiplomaRoutes: RouteObject[]=[
  {
    index: true,
    element: <AdminDiplomaPage />,
  },
  {
    path:'diploma-details/:diplomaId',
    element:<DiplomaViewPage />
  },
  {
    path:'edit-diploma/:diplomaId',
    element:<EditDiplomaPage/>
  },
 
  {
    path:'add-diploma',
    element:<AddNewDiplomaPage/>
  }

]
