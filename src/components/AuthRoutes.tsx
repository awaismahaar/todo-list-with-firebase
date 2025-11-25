import { useEffect, type ReactNode } from "react";
import { Spinner } from "./ui/spinner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const AuthRoutes = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (user && !loading) {
      navigate("/");
    }
  }, [navigate, user, loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }
  return <>{children}</>;
};

export default AuthRoutes;
