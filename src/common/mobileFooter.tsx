"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, FileText, Search, User } from "lucide-react";

const mobileMenuItems = [
  { name: "Portfolio", path: "/portfolio", icon: <Home className="h-5 w-5" /> },
  { name: "Search", path: "/search", icon: <Search className="h-5 w-5" /> },
  { name: "Input", path: "/input", icon: <FileText className="h-5 w-5" /> },
  { name: "Profile", path: "/user", icon: <User className="h-5 w-5" /> },
];

export function MobileFooter() {
  const pathname = usePathname();
  
  
  return (
    <>
      
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-white">
        <nav className="flex justify-around">
          {mobileMenuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "flex flex-col items-center py-2 px-3 text-xs",
                pathname === item.path
                  ? "text-orange-500"
                  : "text-gray-500 hover:text-gray-900"
              )}
            >
              {item.icon}
              <span className="mt-1">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}