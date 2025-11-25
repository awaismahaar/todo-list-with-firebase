import { useEffect, useState, type ReactNode } from "react";
import { AuthContext, type User } from "./AuthContext";
import { auth, db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
          setUser(snap.data() as User);
          setLoading(false);
        }
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
