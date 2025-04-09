"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useCart } from "@/context/cart.context";

interface CartProjectImage {
  image_url: string;
}

interface CartProject {
  id: string;
  title: string;
  description: string;
  language: string;
  instructor: string;
  projectImages: CartProjectImage[];
}

interface CartItem {
  id: string;
  quantity: number;
  project: CartProject;
}

interface CartListProps {
  fullData?: CartItem[];
  isLoading?: boolean;
}

export default function CartList({
  isLoading,
  fullData,
}: CartListProps) {
  const queryClient = useQueryClient();
  const [userData, setUserData] = useState({ id: "" });
  const { setCartCount } = useCart();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = JSON.parse(localStorage.getItem("firstUser") || "{}");
      setUserData(userData);
    }
  }, []);

  const deleteCartItem = async (id: string) => {
    await axios.delete(`https://yoliday-backend-hm1v.onrender.com/cart/${id}`);
  };

  const mutation = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      // Invalidate both query keys used in your app
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["cartTotalCount"] });
      
      // Update the cart count immediately in the UI
      if (fullData) {
        // Subtract the deleted item's quantity
        const deletedItem = fullData.find(item => item.id === mutation.variables);
        const totalItems = fullData.reduce((sum, item) => sum + item.quantity, 0);
        const newCount = deletedItem ? totalItems - deletedItem.quantity : totalItems - 1;
        setCartCount(Math.max(0, newCount));
      }
    },
  });

  const userId = userData.id;
  console.log('userId: ', userId);
  
  if (isLoading) return <p>Loading...</p>;
  if (!fullData || fullData.length === 0) return <p>No Cart Items found matching your search criteria.</p>;
    
  return (
    <div className="space-y-6">
      {fullData.map((item) => (
        <div
          key={item.id}
          className="flex flex-col sm:flex-row gap-4 border rounded-xl p-4 shadow-sm"
        >
          <div className="w-full sm:w-32 h-40 sm:h-24 relative flex-shrink-0">
            {item.project.projectImages.length > 0 ? (
              <Image
                src={`https://yoliday-backend-hm1v.onrender.com/upload/${item.project.projectImages[0]?.image_url}`}
                alt={item.project.title}
                fill
                className="object-cover rounded-md"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sm text-gray-500 border rounded-md">
                No Image
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{item.project.title}</h3>
            <p className="text-gray-700 text-sm sm:text-base line-clamp-2">
              {item.project.description}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Instructor: {item.project.instructor}
            </p>
            <p className="text-sm text-gray-500">Language: {item.project.language}</p>
            <p className="mt-1 text-sm font-medium">Qty: {item.quantity}</p>
          </div>
          
          <div className="mt-2 sm:mt-0 sm:ml-auto flex items-center">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => mutation.mutate(item.id)}
              className="flex items-center gap-1"
            >
              <Trash2 className="h-4 w-4" />
              Remove
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}