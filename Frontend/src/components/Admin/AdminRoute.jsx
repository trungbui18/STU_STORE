import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const isAdminLoggedIn = sessionStorage.getItem("idStaff");

  return isAdminLoggedIn ? children : <Navigate to="/admin" replace />;
}
