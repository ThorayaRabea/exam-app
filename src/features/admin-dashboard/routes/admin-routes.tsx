import { AdminDiplomaRoutes} from "@/features/diploma/routes/diploma-route";
import { AdminExamRoutes } from "@/features/exam/routes/exam-routes";
import type { RouteObject } from "react-router-dom";
import AdminAccountPage from "./pages/admin-account-page";
import AdminAuditLogPage from "./pages/admin-audit-log-page";
import AdminAuditLogViewPage from "./pages/admin-audit-log-view-page";

export const AdminRoutes: RouteObject[] = [
  //Diploma Routes
  {
    path: "diploma",
    children: AdminDiplomaRoutes,
  },
  //Exam Routes
  {
    path: "exam",
    children: AdminExamRoutes,
  },
 //Account Routes
  {
    path:'account',
      element:<AdminAccountPage/>
  }
  ,
  //Audit Log Routes
  {
    path:'logs',
    element:<AdminAuditLogPage/>,
    
  }
  ,
  {
    path:'logs/:auditLogId',
    element:<AdminAuditLogViewPage/>,
    
  }
];
