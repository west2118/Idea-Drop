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
import { User, ArrowRight } from "lucide-react";
import { useForm } from "@/hooks/useForm";
import axios from "axios";
import { toast } from "react-toastify";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";

type FormData = {
  firstName: string;
  lastName: string;
};

export default function OnboardingPage() {
  const router = useRouter();
  const token = useUserStore((state) => state.userToken);
  const { formData, handleChange } = useForm<FormData>({
    firstName: "",
    lastName: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post("/api/auth", {
        token,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });

      router.push("/profile");
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleSubmit}>
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">
              Welcome to IdeaDrop
            </CardTitle>
            <CardDescription>
              Let's get to know you better. Please tell us your name.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  name="firstName"
                  onChange={handleChange}
                  value={formData.firstName}
                  id="firstName"
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  name="lastName"
                  onChange={handleChange}
                  value={formData.lastName}
                  id="lastName"
                  placeholder="Doe"
                />
              </div>
            </div>

            <Button className="w-full mt-2">
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
