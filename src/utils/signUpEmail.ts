import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const signUpEmail = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export default signUpEmail;
