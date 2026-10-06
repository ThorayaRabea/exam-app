import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { Toaster } from "./components/ui/sonner";
import { AuthLayout } from "./features/auth/components/layout/auth-layout";
import AuthGuard from "./features/auth/components/login/auth-guard";
import { authRoutes } from "./features/auth/routes/auth-routes";

import UserLayout from "./features/user/components/layout/user-layout";
import { UserRoutes } from "./features/user/routes/user-routes";
import StepPasswordContextProvider from "./stores/steps-password-context";
import StepContextProvider from "./stores/steps-register-context";
import AdminLayout from "./features/admin-dashboard/components/layout/admin-layout";
import { AdminRoutes } from "./features/admin-dashboard/routes/admin-routes";

const queryClient = new QueryClient();

export const Router = createBrowserRouter([
  {
    path: "/",
    children: [
      // Redirect root to login
      {
        index: true,
        element: <Navigate to="/auth/login" replace />,
      },

      //  Authentication
      {
        path: "auth",
        element: <AuthLayout />,
        children: authRoutes,
      },

      //User Routes
      {
        path: "user",
        element: <AuthGuard />,
        children: [
          {
            element: <UserLayout />,
            children: UserRoutes,
          },
        ],
      },

      //Admin Routes
      {
         path: "admin",
        element: <AuthGuard />,
        children: [
          {
            element: <AdminLayout />,
            children: AdminRoutes,
          },
        ],
      }

    ],
  },
]);
export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
      
          <StepPasswordContextProvider>
            <StepContextProvider>
              <RouterProvider router={Router} />
            </StepContextProvider>
          </StepPasswordContextProvider>
     
        <Toaster
          position="top-center"
          richColors
          toastOptions={{
            style: {
              fontSize: "15px",
              padding: "16px",
            },
          }}
        />
      </QueryClientProvider>
    </>
  );
}
