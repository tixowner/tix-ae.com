"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Home } from "lucide-react"
import Link from "next/link"
import { cartManager, type CartItem } from "@/lib/cart"
import { useCart } from "@/components/cart-provider"

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([])
  const { refreshCart } = useCart()

  useEffect(() => {
    setItems(cartManager.getItems())
  }, [])

  const updateQuantity = (productId: string, newQuantity: number) => {
    cartManager.updateQuantity(productId, newQuantity)
    setItems(cartManager.getItems())
    refreshCart()
  }

  const removeItem = (productId: string) => {
    cartManager.removeItem(productId)
    setItems(cartManager.getItems())
    refreshCart()
  }

  const total = cartManager.getTotal()
  const itemCount = cartManager.getItemCount()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-tix-white">
        {/* Header */}
        <header className="tix-header">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="text-2xl font-bold text-tix-orange-primary">
                Tix
              </Link>
              <nav className="flex items-center space-x-4 rtl:space-x-reverse">
                <Link href="/" className="text-tix-white hover:text-tix-orange-primary">
                  <Home className="h-5 w-5" />
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Empty Cart */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 tix-text-secondary mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-tix-black mb-4">سلة التسوق فارغة</h1>
            <p className="text-lg tix-text-secondary mb-8">لم تقم بإضافة أي منتجات إلى سلة التسوق بعد</p>
            <div className="flex justify-center space-x-4 rtl:space-x-reverse">
              <Button className="tix-btn-primary" size="lg" asChild>
                <Link href="/products">
                  تسوق الآن
                  <ArrowRight className="h-5 w-5 mr-2" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-tix-blue-primary text-tix-blue-primary hover:bg-tix-blue-primary hover:text-tix-white bg-transparent"
                asChild
              >
                <Link href="/">العودة للرئيسية</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-tix-white">
      {/* Header */}
      <header className="tix-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold text-tix-orange-primary">
              Tix
            </Link>
            <nav className="flex items-center space-x-4 rtl:space-x-reverse">
              <Link href="/" className="text-tix-white hover:text-tix-orange-primary">
                <Home className="h-5 w-5" />
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="tix-card">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-tix-black">سلة التسوق ({itemCount} منتج)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 rtl:space-x-reverse p-4 border border-tix-gray-light rounded-lg"
                  >
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-tix-black mb-1">{item.name}</h3>
                      <p className="text-sm tix-text-secondary mb-2">بواسطة: {item.merchant}</p>
                      <p className="text-lg font-bold text-tix-orange-primary">{item.price.toLocaleString()} جنيه</p>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 border-tix-gray-light hover:bg-tix-gray-light bg-transparent"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                        className="w-16 text-center border-tix-gray-light"
                        min="1"
                        max={item.stock}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 border-tix-gray-light hover:bg-tix-gray-light bg-transparent"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="text-left rtl:text-right">
                      <p className="font-bold text-tix-black">{(item.price * item.quantity).toLocaleString()} جنيه</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-tix-red-primary hover:bg-tix-red-primary/10 mt-1"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="tix-card sticky top-8">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-tix-black">ملخص الطلب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="tix-text-secondary">المجموع الفرعي:</span>
                  <span className="font-semibold text-tix-black">{total.toLocaleString()} جنيه</span>
                </div>
                <div className="flex justify-between">
                  <span className="tix-text-secondary">الشحن:</span>
                  <span className="font-semibold text-green-600">مجاني</span>
                </div>
                <div className="border-t border-tix-gray-light pt-4">
                  <div className="flex justify-between text-lg">
                    <span className="font-bold text-tix-black">المجموع الكلي:</span>
                    <span className="font-bold text-tix-orange-primary">{total.toLocaleString()} جنيه</span>
                  </div>
                </div>
                <Button className="w-full tix-btn-primary" size="lg" asChild>
                  <Link href="/checkout">
                    متابعة الدفع
                    <ArrowRight className="h-5 w-5 mr-2" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-tix-blue-primary text-tix-blue-primary hover:bg-tix-blue-primary hover:text-tix-white bg-transparent"
                  asChild
                >
                  <Link href="/products">متابعة التسوق</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
