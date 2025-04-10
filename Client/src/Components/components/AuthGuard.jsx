import { Navigate, Outlet } from "react-router-dom";
import { useAuthcontext } from "../../contexts/AuthContext";

export default function AuthGuard() {
    const { isAuthenticated} = useAuthcontext();

   return isAuthenticated
     ? <Outlet />
     : <Navigate to="/login" />;
}