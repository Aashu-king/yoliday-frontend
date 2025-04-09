"use client";

import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface CartContextType {
  cartCount: number;
  setCartCount: (count: number) => void;
}

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

interface CartResponse {
  data: CartItem[];
  total: number;
  limit: number;
  offset: number;
}

const fetchCart = async (userId: string): Promise<CartResponse> => {
  const res = await axios.get(`https://yoliday-backend-hm1v.onrender.com/cart`, {
    params: {
      userId: userId,
    },
  });
  return res.data;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartCount, setCartCount] = useState<number>(0);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedUser = localStorage.getItem("firstUser");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser?.id) {
            setUserId(parsedUser.id);
          }
        }
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
      }
    }
  }, []);

  const { data } = useQuery({
    queryKey: ["cartTotalCount", userId],
    queryFn: () => fetchCart(userId!),
    enabled: !!userId,
  });

  useEffect(() => {
    if (data?.data) {
      const totalCount = data.data.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalCount);
    }
  }, [data, setCartCount]);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};