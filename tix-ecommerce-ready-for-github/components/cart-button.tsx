"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useCart } from "./cart-provider"

export function CartButton() {
  const { itemCount } = useCart()

  return (
    <Button variant="ghost" size="sm" className="text-tix-white hover:bg-tix-gray-dark" asChild>
      <Link href="/cart">
        <ShoppingCart className="h-4 w-4 ml-2" />
        السلة
        {itemCount > 0 && (
          <Badge className="tix-badge-discount mr-1 h-5 w-5 rounded-full p-0 text-xs">{itemCount}</Badge>
        )}
      </Link>
    </Button>
  )
}
