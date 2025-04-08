"use client";

import { useState, useEffect } from "react";
import { Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/cart.context";

interface MobileHeaderProps {
  title: string;
  onSearch: (term: string) => void;
  activeTab: string;
  setActiveTab: (tab: "project" | "saved" | "shared" | "achievement") => void;
}

export function MobileHeader({
  title,
  onSearch,
  activeTab,
  setActiveTab,
}: MobileHeaderProps) {
  const { cartCount } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const getSearchPlaceholder = () => {
    switch (activeTab) {
      case "project":
        return "Search a project";
      case "saved":
        return "Search in your cart";
      case "shared":
        return "Search shared projects";
      case "achievement":
        return "Search achievements";
      default:
        return "Search";
    }
  };

  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-xl font-bold">{title}</h1>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </Button>
      </div>

      <div className="px-4 pb-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder={getSearchPlaceholder()}
            className="pl-8 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex border-b">
        <TabButton active={activeTab === "project"} onClick={() => setActiveTab("project")}>
          Project
        </TabButton>
        <TabButton active={activeTab === "saved"} onClick={() => setActiveTab("saved")}>
          <div className="relative">
            Saved
            {cartCount > 0 && (
              <span className="ml-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-orange-500 rounded-full">
                {cartCount}
              </span>
            )}
          </div>
        </TabButton>
        <TabButton active={activeTab === "shared"} onClick={() => setActiveTab("shared")}>
          Shared
        </TabButton>
        <TabButton active={activeTab === "achievement"} onClick={() => setActiveTab("achievement")}>
          Achievement
        </TabButton>
      </div>
    </div>
  );
}

interface TabButtonProps {
  children: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}

function TabButton({ children, active, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex-1 text-center py-2 text-sm",
        active
          ? "text-orange-500 border-b-2 border-orange-500"
          : "text-gray-500 border-b-2 border-transparent"
      )}
    >
      {children}
    </button>
  );
}
