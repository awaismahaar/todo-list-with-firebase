import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";

export const loginWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

