import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectUser } from "../features/auth/auth.slice.js";

function DashboardRedirect() {
  const user = useSelector(selectUser);
  const location = useLocation();

  if (location.pathname === "/") {
    if (user?.role === "employee") {
      return <Navigate to="/employee" replace />;
    }
    if (user?.role === "manager") {
      return <Navigate to="/manager/attendance" replace />;
    }
    if (user?.role === "admin") {
      return <Navigate to="/admin/dir" replace />;
    }
  }

  return null;
}

export default DashboardRedirect;
