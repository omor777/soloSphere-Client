import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <span className="text-3xl font-bold text-center">Loading...</span>;
  }
  if (user) {
    return children;
  }
  return <Navigate state={location.pathname} to={"/login"} replace></Navigate>;
};

export default PrivateRoute;
