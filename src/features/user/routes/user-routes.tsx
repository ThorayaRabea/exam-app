import { DiplomaRoutes } from "@/features/diploma/routes/diploma-route";
import type { RouteObject } from "react-router-dom";
import AccountPage from "./pages/account-page";

export const UserRoutes: RouteObject[] = [
  //Diploma Routes
  {
    path: "diploma",
    children: DiplomaRoutes,
  },
  {
    path:'account',
    element:<AccountPage/>
  }
];
