import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

export const loginEmail = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};
