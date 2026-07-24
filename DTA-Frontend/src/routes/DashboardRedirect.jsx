import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUser } from "../features/auth/auth.slice.js";

function DashboardRedirect() {
  const user = useSelector(selectUser);

  if (user?.role === "employee") {
    return <Navigate to="/employee" replace />;
  }
  if (user?.role === "manager") {
    return <Navigate to="/manager/attendance" replace />;
  }
  if (user?.role === "admin") {
    return <Navigate to="/admin/dir" replace />;
  }

  return <Navigate to="/login" replace />;
}

export default DashboardRedirect;
