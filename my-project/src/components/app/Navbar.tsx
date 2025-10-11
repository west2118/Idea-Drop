"use client";

import {
  Filter,
  Lightbulb,
  Plus,
  Search,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useUserStore } from "@/stores/useUserStore";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "react-toastify";

const Navbar = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/sign-in");

      toast.success("Logged out successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleSettings = () => {
    console.log("Opening settings...");
  };

  // Safe user data extraction
  const userName = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
    : "";
  const userEmail = user?.email || "";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between mx-auto px-4 sm:px-6">
        <div className="flex items-center space-x-2">
          <Lightbulb className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold">IdeaDrop</span>
        </div>

        {user ? (
          <>
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search ideas, tags, or people..."
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button onClick={() => router.push("/idea/post")}>
                <Plus className="h-4 w-4 mr-2" />
                New Idea
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full p-0">
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-48">
                  {userName && (
                    <>
                      <DropdownMenuLabel className="font-normal">
                        <Link
                          href={`/profile/${user._id}`}
                          className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {userName}
                          </p>
                          {userEmail && (
                            <p className="text-xs leading-none text-muted-foreground">
                              {userEmail}
                            </p>
                          )}
                        </Link>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                    </>
                  )}

                  <DropdownMenuItem
                    onClick={handleSettings}
                    className="cursor-pointer">
                    <Settings className="h-4 w-4" />
                    Settings
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        ) : (
          <div className="flex space-x-3">
            <Link href="/sign-up">
              <Button variant="outline" className="h-9 px-4">
                Sign Up
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button className="h-9 px-4">Sign In</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
