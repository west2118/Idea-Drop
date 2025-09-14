import { Lightbulb } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-28 mx-auto shadow-md">
      <div className="flex items-center space-x-2">
        <Lightbulb className="h-6 w-6 text-blue-600" />
        <span className="text-xl font-semibold">IdeaDrop</span>
      </div>
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
    </nav>
  );
};

export default Navbar;
