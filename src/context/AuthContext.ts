import { createContext, useContext } from "react";

export interface User {
  uid: string;
  fullName: string;
  email: string;
  photoURL: string;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
}

export const useAuth = () : AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
