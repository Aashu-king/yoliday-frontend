"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useCart } from "@/context/cart.context";

interface Image {
  image_url: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  language: string;
  instructor: string;
  projectImages: Image[];
}

interface PortfolioCardProps {
  projects: Project[];
  isLoading: boolean;
}

interface JustForItem{
  quantity : number
}

export default function PortfolioCard({ projects, isLoading }: PortfolioCardProps) {
  const [userData, setUserData] = useState({ id: "" });
  const { setCartCount } = useCart();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = JSON.parse(localStorage.getItem("firstUser") || "{}");
      setUserData(userData);
    }
  }, []);

  const userId = userData.id;

  const mutation = useMutation({
    mutationFn: async ({ userId, projectId }: { userId: string; projectId: string }) => {
      await axios.post("http://localhost:8080/cart", {
        userId,
        projectId,
        quantity: 1,
      });

      const newCart = await axios.get(`http://localhost:8080/cart?userId=${userId}`);
      return newCart.data.data;
    },
    onSuccess: (data) => {
      const totalCount = data.reduce((sum: number, item: JustForItem ) => sum + item.quantity, 0);
      setCartCount(totalCount);
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
    },
    onError: (err) => {
      console.error("Failed to add to cart", err);
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (!projects || projects.length === 0) return <p>No projects found matching your search criteria.</p>;

  return (
    <div>
      {projects.map((project, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row gap-4 mb-6 border-b pb-6"
        >
          <div className="w-full md:w-32 h-24 relative">
            <Image
              src={`http://localhost:8080/upload/${project.projectImages[0]?.image_url}`}
              alt={project.title}
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{project.title}</h3>
            <p className="text-sm text-gray-500 mb-2">{project.description}</p>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs font-medium text-gray-700">{project.language}</p>
                <p className="text-xs text-gray-500">{project.instructor}</p>
              </div>
              <Button
                className="bg-orange-400 hover:bg-orange-500"
                onClick={() => mutation.mutate({ userId, projectId: project.id })}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}