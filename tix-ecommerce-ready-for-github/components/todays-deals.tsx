"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Clock, Flame } from "lucide-react"
import Link from "next/link"
import { dataManager, type Product } from "@/lib/data"
import { cartManager } from "@/lib/cart"

export function TodaysDeals() {
  const [deals, setDeals] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    // جلب عروض اليوم
    const todaysDeals = dataManager.getTodaysDeals(12) // 12 منتج للعروض (3 صفوف × 4 منتجات)
    setDeals(todaysDeals)
    setLoading(false)

    // حساب الوقت المتبقي حتى منتصف الليل
    const updateTimer = () => {
      const now = new Date()
      const tomorrow = new Date(now)
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(0, 0, 0, 0)

      const diff = tomorrow.getTime() - now.getTime()
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeLeft(
        `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
      )
    }

    updateTimer()
    const timer = setInterval(updateTimer, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    cartManager.addItem(product, 1)
    alert(`تم إضافة ${product.name} إلى السلة!`)
  }

  if (loading) {
    return (
      <div className="py-16 tix-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="bg-tix-gray-light h-8 w-64 mx-auto rounded mb-4 animate-pulse"></div>
            <div className="bg-tix-gray-light h-4 w-48 mx-auto rounded animate-pulse"></div>
          </div>

          {/* 3 صفوف من المنتجات المحملة */}
          <div className="space-y-8">
            {[...Array(3)].map((_, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, index) => (
                  <Card key={index} className="animate-pulse tix-card">
                    <CardContent className="p-4">
                      <div className="bg-tix-gray-light h-48 rounded-md mb-4"></div>
                      <div className="space-y-2">
                        <div className="bg-tix-gray-light h-4 rounded w-3/4"></div>
                        <div className="bg-tix-gray-light h-3 rounded w-1/2"></div>
                        <div className="bg-tix-gray-light h-4 rounded w-2/3"></div>
                        <div className="bg-tix-gray-light h-8 rounded"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (deals.length === 0) {
    return null
  }

  // تقسيم العروض إلى 3 صفوف (4 منتجات في كل صف)
  const rows = []
  for (let i = 0; i < deals.length; i += 4) {
    rows.push(deals.slice(i, i + 4))
  }

  return (
    <div className="py-16 bg-gradient-to-r from-tix-red-primary/10 via-tix-orange-primary/10 to-tix-red-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Flame className="h-8 w-8 text-tix-red-primary mr-3 animate-bounce" />
            <h2 className="text-4xl font-bold text-tix-black">عروض اليوم الحارقة 🔥</h2>
            <Flame className="h-8 w-8 text-tix-red-primary ml-3 animate-bounce" />
          </div>
          <p className="text-lg tix-text-secondary mb-6">خصومات تصل إلى 70% - لفترة محدودة فقط!</p>

          {/* مؤقت العد التنازلي */}
          <div className="inline-flex items-center bg-tix-red-primary text-tix-white px-6 py-3 rounded-full shadow-tix animate-pulse">
            <Clock className="h-5 w-5 mr-2" />
            <span className="font-bold text-lg">ينتهي العرض خلال: {timeLeft}</span>
          </div>
        </div>

        {/* عرض العروض في 3 صفوف */}
        <div className="space-y-8">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {row.map((product) => {
                const discountPercentage = product.originalPrice
                  ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                  : 0

                return (
                  <Link href={`/products/${product.id}`} key={product.id}>
                    <Card className="tix-card card-hover cursor-pointer group border-2 border-tix-red-primary/20 hover:border-tix-red-primary/40 relative overflow-hidden">
                      <CardContent className="p-0">
                        {/* شارة عرض اليوم */}
                        <div className="absolute top-0 left-0 bg-tix-red-primary text-tix-white px-3 py-1 text-xs font-bold z-10 rounded-br-lg animate-pulse">
                          🔥 عرض اليوم
                        </div>

                        <div className="relative">
                          <img
                            src={product.images[0] || "/placeholder.svg?height=250&width=250"}
                            alt={product.name}
                            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                          />

                          {/* شارة الخصم الكبيرة */}
                          <div className="absolute top-4 right-4">
                            <Badge className="tix-badge-discount text-lg px-3 py-1 shadow-tix animate-bounce">
                              -{discountPercentage}%
                            </Badge>
                          </div>

                          {/* تأثير التدرج في الأسفل */}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-tix-black/50 to-transparent h-16"></div>
                        </div>

                        <div className="p-4 space-y-3">
                          <h3 className="font-bold text-base line-clamp-2 group-hover:text-tix-red-primary transition-colors min-h-[3rem]">
                            {product.name}
                          </h3>

                          <p className="text-sm tix-text-secondary font-medium">{product.merchant}</p>

                          <div className="flex items-center space-x-1 rtl:space-x-reverse">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(product.rating)
                                      ? "text-yellow-400 fill-current"
                                      : "text-tix-gray-light"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm tix-text-secondary">({product.reviews})</span>
                          </div>

                          {/* الأسعار مع التأكيد على التوفير */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-2xl font-bold text-tix-red-primary">
                                {product.price.toLocaleString()} جنيه
                              </span>
                            </div>
                            {product.originalPrice && (
                              <div className="space-y-1">
                                <span className="text-lg text-tix-gray-dark line-through block">
                                  {product.originalPrice.toLocaleString()} جنيه
                                </span>
                                <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-bold text-center">
                                  🎉 وفر {(product.originalPrice - product.price).toLocaleString()} جنيه
                                </div>
                              </div>
                            )}
                          </div>

                          <Button
                            className="w-full tix-btn-deal group-hover:scale-105 transition-all duration-300 shadow-tix font-bold"
                            size="sm"
                            disabled={product.stock === 0}
                            onClick={(e) => handleAddToCart(product, e)}
                          >
                            <ShoppingCart className="h-4 w-4 ml-2" />
                            {product.stock === 0 ? "نفد المخزون" : "اشتري الآن - عرض محدود!"}
                          </Button>

                          {/* تحذير المخزون */}
                          {product.stock < 10 && product.stock > 0 && (
                            <p className="text-xs text-tix-red-primary text-center font-bold animate-pulse">
                              ⚠️ باقي {product.stock} قطع فقط - أسرع!
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          ))}
        </div>

        {/* دعوة للعمل */}
        <div className="text-center mt-12">
          <div className="tix-card rounded-lg shadow-tix p-6 inline-block">
            <h3 className="text-xl font-bold text-tix-black mb-2">لا تفوت هذه الفرصة الذهبية!</h3>
            <p className="tix-text-secondary mb-4">عروض حصرية تنتهي قريباً</p>
            <Link href="/products">
              <Button
                size="lg"
                className="bg-gradient-to-r from-tix-red-primary to-tix-orange-primary hover:from-tix-red-dark hover:to-tix-orange-dark text-tix-white font-bold px-8 py-3 shadow-tix"
              >
                تسوق جميع العروض
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
