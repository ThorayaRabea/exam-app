import { Navigate, Outlet } from "react-router-dom";
import useToken from "../../hooks/use-token";

export default function AuthGuard() {
  // Hooks
  const { getToken } = useToken();
  //Varisbles
  const token = getToken();
  if (!token) return <Navigate to={"/auth/login"} />;

  return (
    <div>
      <Outlet />
    </div>
  );
}
