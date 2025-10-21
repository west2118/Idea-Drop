import { useEffect, useState } from "react";
import { Lightbulb, Zap, Rocket } from "lucide-react";

export function Loading() {
  const [activePulse, setActivePulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePulse((prev) => (prev + 1) % 3);
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center">
        {/* IdeaDrop Logo and Brand Name */}
        <div className="flex flex-col items-center mb-12">
          <div className="relative mb-4">
            <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping opacity-75"></div>
            <div className="h-20 w-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center relative shadow-lg">
              <Lightbulb className="h-10 w-10 text-white" fill="currentColor" />
            </div>
          </div>
          <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            IdeaDrop
          </span>
          <p className="text-gray-600 mt-3 text-lg">Where Ideas Take Flight</p>
        </div>
      </div>
    </div>
  );
}
