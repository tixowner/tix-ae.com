"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { cartManager } from "@/lib/cart"

interface CartContextType {
  itemCount: number
  total: number
  refreshCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [itemCount, setItemCount] = useState(0)
  const [total, setTotal] = useState(0)

  const refreshCart = () => {
    setItemCount(cartManager.getItemCount())
    setTotal(cartManager.getTotal())
  }

  useEffect(() => {
    // تحميل السلة من التخزين المحلي
    cartManager.loadFromStorage()
    refreshCart()

    // الاشتراك في تحديثات السلة
    const unsubscribe = cartManager.subscribe(refreshCart)

    return unsubscribe
  }, [])

  return <CartContext.Provider value={{ itemCount, total, refreshCart }}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
