  import { Navigate, useLocation } from "react-router-dom";
  import { ReactNode } from "react";

  interface ProtectedRouteProps {
    children: ReactNode;
    role: "admin" | "client";
  }

  const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    const location = useLocation();

    // Map "member" thành "client"
    const normalizedRole = user?.role === "member" ? "client" : user?.role;

    if (!user) {
      // Chưa đăng nhập → về login
      return <Navigate to="/login" replace state={{ from: location }} />;
    }

    if (normalizedRole !== role) {
      // Sai quyền → về đúng trang
      return <Navigate to={normalizedRole === "admin" ? "/admin" : "/"} replace />;
    }

    // Hợp lệ → render
    return <>{children}</>;
  };

  export default ProtectedRoute;
