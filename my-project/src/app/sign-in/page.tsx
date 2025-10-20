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
  ArrowRight,
  Github,
  Chrome,
  Key,
} from "lucide-react";
import Link from "next/link";
import { useForm } from "@/hooks/useForm";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type FormData = {
  email: string;
  password: string;
};

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { formData, handleChange } = useForm<FormData>({
    email: "",
    password: "",
  });

  const handleLoginWithEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const token = await userCredential.user.getIdToken();

      const response = await axios.post("/api/auth", {
        token,
        email: formData.email,
      });

      if (response?.data?.user?.firstName) {
        router.push("/dashboard");
      } else {
        router.push("/onboarding");
      }

      toast.success("Logged In Successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-10 -mt-[66px]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome back
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLoginWithEmail} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
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
                  onChange={handleChange}
                  value={formData.password}
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm font-normal">
                  Remember me
                </Label>
              </div>

              <div className="flex items-center">
                <a href="#" className="text-xs text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <Button className="w-full">
                Sign in
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>

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

          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline">
              <Github className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button variant="outline">
              <Chrome className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>

          <div className="text-center text-sm">
            Don't have an account?{" "}
            <a href="#" className="text-primary hover:underline">
              Sign up
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
