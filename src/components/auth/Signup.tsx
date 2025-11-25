import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import signUpEmail from "@/utils/signUpEmail";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { loginWithGoogle } from "@/utils/loginWithGoogle";
import type { UserCredential } from "firebase/auth";

interface SignUpForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export default function Signup() {
  const [signUpData, setSignUpData] = useState<SignUpForm>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>):Promise<void> {
    e.preventDefault();
    if (
      !signUpData.fullName ||
      !signUpData.email ||
      !signUpData.password ||
      !signUpData.confirmPassword
    ) {
      toast.error("All fields required!");
      return;
    }
    if (signUpData.password !== signUpData.confirmPassword) {
      toast.error("Password and Confirm Password not match!");
      return;
    }
    try {
      const userCredential : UserCredential = await signUpEmail(
        signUpData.email,
        signUpData.password
      );
      const user = userCredential.user;
      if (user) {
        toast.success("Account created successfully");
        const ref = doc(db, "users", user.uid);
        await setDoc(ref, {
          uid: user.uid,
          email: user.email,
          fullName: user.displayName || signUpData.fullName,
          photoURL: user.photoURL || "",
          createdAt: new Date(),
        });
        // console.log(user);
        navigate("/auth/login");
        setSignUpData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      const msgError =
        error instanceof Error
          ? error.message
          : "Unknown error occured in signup!";
      toast.error(msgError);
    }
  }
  async function signupWithGoogleProvider() : Promise<void> {
    const result = await loginWithGoogle();
    
    const user = result.user;
    if (result) {
      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          fullName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: new Date(),
        },
        { merge: true }
      );
      navigate("/");
    }
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl text-center">
            Create Account
          </CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={signUpData.fullName}
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, fullName: e.target.value })
                  }
                  placeholder="Ali Ahmed"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={signUpData.email}
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, email: e.target.value })
                  }
                  placeholder="m@example.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={signUpData.password}
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, password: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={signUpData.confirmPassword}
                  onChange={(e) =>
                    setSignUpData({
                      ...signUpData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Create Account
            </Button>
            <div className="flex items-center justify-between w-full gap-4">
              <div className="w-1/2 h-px bg-gray-300" />
              <span className="text-accent-foreground">Or</span>
              <div className="w-1/2 h-px bg-gray-300" />
            </div>
            <Button
              type="button"
              onClick={signupWithGoogleProvider}
              variant="outline"
              className="w-full flex items-center"
            >
              <IconBrandGoogleFilled /> Login with Google
            </Button>
            <div>
              <p className="text-accent-foreground">
                Already have an account?{" "}
                <Link className="underline text-blue-500" to="/auth/login">
                  login
                </Link>{" "}
              </p>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
