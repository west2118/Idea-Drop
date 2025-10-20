"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Github,
  Chrome,
} from "lucide-react";
import { useForm } from "@/hooks/useForm";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import axios from "axios";
import { useRouter } from "next/navigation";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpPage() {
  const router = useRouter();
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAgree, setIsAgree] = useState<boolean>(false);
  const { formData, handleChange } = useForm<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const provider = new GoogleAuthProvider();

  const handleRegisterWithEmail = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => value.trim() === "")) {
      return toast.error("Missing Required Field");
    }

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Password not matched");
    }

    if (!isAgree) {
      return toast.error("Plese check on agree terms");
    }

    setIsLoading(true);

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredentials.user;
      await sendEmailVerification(user);

      const token = await user.getIdToken();
      await axios.post("/api/auth", {
        token,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });

      toast.success(
        "Account created successfully! Please check your inbox to verify your email."
      );

      router.push("/profile");
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterWithGmail = async () => {
    setIsGoogleLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      const response = await axios.post("/api/auth", { token });

      toast.success("Account Created Successfully!");

      if (response?.data?.user?.firstName) {
        router.push("/dashboard");
      } else {
        router.push("/onboarding");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-10 -mt-[66px]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Create an account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your details to get started with our platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleRegisterWithEmail}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    id="firstName"
                    placeholder="John"
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    id="lastName"
                    placeholder="Doe"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  id="email"
                  type="email"
                  placeholder="hello@example.com"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                checked={isAgree}
                onCheckedChange={(value: any) => setIsAgree(value)}
                id="terms"
              />
              <Label htmlFor="terms" className="text-sm font-normal">
                I agree to the{" "}
                <a href="#" className="text-primary hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </Label>
            </div>

            <Button className="w-full">
              Create account
              <ArrowRight className="h-4 w-4" />
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with email
                </span>
              </div>
            </div>

            <Button
              className="w-full"
              type="button"
              onClick={handleRegisterWithGmail}
              variant="outline">
              <Chrome className="h-4 w-4" />
              Google
            </Button>

            <div className="text-center text-sm">
              Already have an account?{" "}
              <a href="#" className="text-primary hover:underline">
                Sign in
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
