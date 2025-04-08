"use client";

import { useState, useEffect } from "react";
import PortfolioCard from "@/components/portfolioCard";
import CartList from "@/components/cartList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { useCart } from "@/context/cart.context";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { MobileHeader } from "@/common/mobileHeader";

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState<"project" | "saved" | "shared" | "achievement">("project");
  const { cartCount } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm, activeTab]);

  useEffect(() => {
    setSearchTerm("");
    setDebouncedSearchTerm("");
  }, [activeTab]);

  const fetchProjects = async () => {
    const response = await axios.get("http://localhost:8080/project", {
      params: {
        search: debouncedSearchTerm,
        limit: limit,
        offset: (page - 1) * limit,
      },
    });
    return response.data;
  };

  const fetchCartItems = async () => {
    const response = await axios.get("http://localhost:8080/cart", {
      params: {
        search: debouncedSearchTerm,
        limit: limit,
        offset: (page - 1) * limit,
      },
    });
    console.log('response.data: ', response.data);

    return response.data;
  };

  const { data: projectsData, isLoading: isProjectsLoading } = useQuery({
    queryKey: ["projects", debouncedSearchTerm, page],
    queryFn: fetchProjects,
    enabled: activeTab === "project",
  });
  const { data: cartData, isLoading: isCartLoading } = useQuery({
    queryKey: ["cart", debouncedSearchTerm, page],
    queryFn: fetchCartItems,
    enabled: activeTab === "saved",
  });
  const totalCartPages = cartData ? Math.ceil(cartData.total / limit) : 0;


  const totalProjectPages = projectsData ? Math.ceil(projectsData.total / limit) : 0;

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

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "project":
        return (
          <>
            <PortfolioCard
              isLoading={isProjectsLoading}
              projects={projectsData?.data || []}
            />
            {totalProjectPages > 0 && (
              <RenderPagination
                page={page}
                setPage={setPage}
                totalPages={totalProjectPages}
              />
            )}
          </>
        );
      case "saved":
        return (
          <>
            <CartList
              isLoading={isCartLoading}
              fullData={cartData?.data || []}
            />
            {totalCartPages > 0 && (
              <RenderPagination
                page={page}
                setPage={setPage}
                totalPages={totalCartPages}
              />
            )}
          </>
        );
      case "shared":
        return <div>Shared content goes here.</div>;
      case "achievement":
        return <div>Achievements go here.</div>;
      default:
        return null;
    }
  };

  return (

    <>
      <div className="md:hidden">
        <MobileHeader
          title="Portfolio"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onSearch={(term : string) => setSearchTerm(term)}
        />
      </div>
      <div className="w-full px-4">
        <div className="hidden md:block">
          <h1 className="text-2xl font-bold mb-4">Portfolio</h1>

          <div className="flex items-center justify-between border-b mb-6">
            <div className="flex items-center">
              <TabButton active={activeTab === "project"} onClick={() => setActiveTab("project")}>
                Project
              </TabButton>
              <TabButton active={activeTab === "saved"} onClick={() => setActiveTab("saved")}>
                <span className="relative inline-flex items-center">
                  Saved
                  {cartCount > 0 && (
                    <span className="ml-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-orange-500 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </span>
              </TabButton>
              <TabButton active={activeTab === "shared"} onClick={() => setActiveTab("shared")}>
                Shared
              </TabButton>
              <TabButton active={activeTab === "achievement"} onClick={() => setActiveTab("achievement")}>
                Achievement
              </TabButton>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder={getSearchPlaceholder()}
                  className="pl-8 rounded-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {activeTab === "project" && (
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              )}
            </div>
          </div>
        </div>

        <div>{renderActiveComponent()}</div>
      </div>
    </>

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
      className={`mr-8 py-2 text-sm font-medium border-b-2 ${active
        ? "text-orange-500 border-orange-500"
        : "text-gray-500 border-transparent hover:text-gray-900"
        }`}
    >
      {children}
    </button>
  );
}

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

function RenderPagination({ page, setPage, totalPages }: PaginationProps) {
  return (
    <Pagination className="mt-6">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => setPage(Math.max(1, page - 1))}
            className={page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(p => {
            // Show first page, last page, current page, and pages adjacent to current
            return p === 1 || p === totalPages || Math.abs(p - page) <= 1;
          })
          .map((p, i, array) => {
            // If there's a gap, show ellipsis
            if (i > 0 && p > array[i - 1] + 1) {
              return (
                <PaginationItem key={`ellipsis-${p}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            return (
              <PaginationItem key={p}>
                <PaginationLink
                  onClick={() => setPage(p)}
                  isActive={p === page}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            );
          })}

        <PaginationItem>
          <PaginationNext
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            className={page >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}