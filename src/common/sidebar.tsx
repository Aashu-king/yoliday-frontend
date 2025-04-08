"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Nut, User } from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { name: "Portfolio", path: "/portfolio", icon: <FileText className="w-5 h-5" /> },
  { name: "Inputs", path: "/input", icon: <Nut className="w-5 h-5" /> },
  { name: "Profile", path: "/user", icon: <User className="w-5 h-5" /> },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex flex-col h-screen bg-orange-500 w-52 text-white">
      <div className="p-4 flex items-center gap-2">
        <div className="bg-white/20 p-1 rounded">
          <span className="font-bold">LOGO</span>
        </div>
      </div>
      
      <nav className="flex flex-col mt-6">
        {menuItems.map((item) => (
          <Link 
            key={item.path} 
            href={item.path}
            className={cn(
              "flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors",
              pathname === item.path && "bg-white/10"
            )}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span>{item.name}</span>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
}