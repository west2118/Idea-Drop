"use client";

import { Filter, Lightbulb, Plus, Search } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useUserStore } from "@/stores/useUserStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center py-4 px-28 mx-auto shadow-md bg-white">
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
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/user.jpg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
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
    </nav>
  );
};

export default Navbar;
