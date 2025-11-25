import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Todo from "./Todo";
import { useAuth } from "@/context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { user, setUser} = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success("User logged out successfully!");
      navigate("/auth/login");
    } catch (error) {
      const msgError =
        error instanceof Error
          ? error.message
          : "Unknown error occued using logout";
      toast.error(msgError);
    }
  };

  return (
    <>
      {user ? (
        <div className="max-w-7xl mx-auto py-12 px-4 space-y-12">
          <Card className="flex flex-col items-center gap-6 max-w-xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl text-center lg:text-5xl font-bold">
              Welcome
            </h1>
            <div className="text-center flex flex-col items-center gap-4">
              <div className="h-32 w-32">
                <img
                  alt="user logo"
                  src={
                    user.photoURL
                      ? user.photoURL
                      : "https://www.citypng.com/public/uploads/preview/hd-profile-user-round-blue-icon-symbol-transparent-png-701751695033492ww0i0raud4.png"
                  }
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl">
                Name: {user.fullName}
              </p>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl">
                Email: {user.email}
              </p>
            </div>
            <Button onClick={handleLogout}>Logout</Button>
          </Card>
          <Todo />
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <Spinner className="h-8 w-8" />
        </div>
      )}
    </>
  );
};

export default Home;
