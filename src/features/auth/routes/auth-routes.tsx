import type { RouteObject } from "react-router-dom";
import LogInPage from "./pages/login-page";

import RegisterPage from "./pages/register-page";
import PasswordPage from "./pages/password-page";
import CreateNewPasswordPage from "./pages/reset-password";

export const authRoutes: RouteObject[] = [
  {
    path: "login",
    element: <LogInPage />,
  },
  {
    path: "register",
    element: <RegisterPage />,
    
  },
  {
    path: "forgot-password",
    element: <PasswordPage />,
    
  },
  {
  path: "reset-password",
  element: <CreateNewPasswordPage />,
},

];
