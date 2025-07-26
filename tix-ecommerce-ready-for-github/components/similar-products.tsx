"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { dataManager, type Product } from "@/lib/data"
import { cartManager } from "@/lib/cart"

interface SimilarProductsProps {
  productId: string
}

export function SimilarProducts({ productId }: SimilarProductsProps) {
  const [similarProducts, setSimilarProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSimilarProducts = () => {
      // طلب 12 منتج مشابه لعرض 3 صفوف
      const similar = dataManager.getSimilarProducts(productId, 12)
      setSimilarProducts(similar)
      setLoading(false)
    }

    fetchSimilarProducts()
  }, [productId])

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    cartManager.addItem(product, 1)
    alert(`تم إضافة ${product.name} إلى السلة!`)
  }

  const handleAddToWishlist = (product: Product, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    alert(`تم إضافة ${product.name} إلى المفضلة!`)
  }

  if (loading) {
    return (
      <div className="py-12 tix-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-tix-black mb-8 text-center">منتجات مشابهة</h2>

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

  if (similarProducts.length === 0) {
    return null
  }

  // تقسيم المنتجات إلى 3 صفوف (4 منتجات في كل صف)
  const rows = []
  for (let i = 0; i < similarProducts.length; i += 4) {
    rows.push(similarProducts.slice(i, i + 4))
  }

  return (
    <div className="py-12 tix-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-tix-black">منتجات مشابهة</h2>
          <Link href="/products">
            <Button
              variant="outline"
              size="lg"
              className="border-tix-blue-primary text-tix-blue-primary hover:bg-tix-blue-primary hover:text-tix-white bg-transparent"
            >
              عرض جميع المنتجات
            </Button>
          </Link>
        </div>

        {/* عرض 3 صفوف من المنتجات */}
        <div className="space-y-8">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {row.map((product) => {
                const discountPercentage = product.originalPrice
                  ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                  : 0

                return (
                  <Link href={`/products/${product.id}`} key={product.id}>
                    <Card className="tix-card card-hover cursor-pointer group h-full border-0 shadow-tix">
                      <CardContent className="p-0">
                        <div className="relative mb-4">
                          <img
                            src={product.images[0] || "/placeholder.svg?height=250&width=250"}
                            alt={product.name}
                            className="w-full h-56 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                          />

                          {/* شارات الحالة والخصم */}
                          <div className="absolute top-3 right-3 flex flex-col gap-2">
                            <Badge
                              className={`${product.condition === "new" ? "tix-badge-status" : "bg-tix-blue-primary"} text-tix-white shadow-tix`}
                            >
                              {product.condition === "new" ? "جديد" : "استيراد"}
                            </Badge>
                            {discountPercentage > 0 && (
                              <Badge className="tix-badge-discount shadow-tix animate-pulse">
                                خصم {discountPercentage}%
                              </Badge>
                            )}
                          </div>

                          {/* أزرار سريعة */}
                          <div className="absolute top-3 left-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-9 w-9 p-0 bg-tix-white/90 hover:bg-tix-white shadow-tix"
                              onClick={(e) => handleAddToWishlist(product, e)}
                            >
                              <Heart className="h-4 w-4 text-tix-red-primary" />
                            </Button>
                          </div>

                          {/* حالة المخزون */}
                          <div className="absolute bottom-3 right-3">
                            {product.stock < 5 && product.stock > 0 && (
                              <Badge
                                variant="outline"
                                className="bg-yellow-100 text-yellow-800 border-yellow-300 shadow-tix"
                              >
                                باقي {product.stock} قطع فقط!
                              </Badge>
                            )}
                            {product.stock === 0 && (
                              <Badge
                                variant="outline"
                                className="bg-tix-red-primary/10 text-tix-red-primary border-tix-red-primary shadow-tix"
                              >
                                نفد المخزون
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="p-4 space-y-3">
                          <h3 className="font-bold text-base mb-2 line-clamp-2 group-hover:text-tix-blue-primary transition-colors min-h-[3rem]">
                            {product.name}
                          </h3>

                          <p className="text-sm tix-text-secondary font-medium">{product.merchant}</p>

                          <div className="flex items-center justify-between">
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
                              <span className="text-sm tix-text-secondary font-medium">({product.reviews})</span>
                            </div>
                            <span className="text-sm font-bold text-tix-black">{product.rating.toFixed(1)}</span>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xl font-bold text-tix-orange-primary">
                                {product.price.toLocaleString()} جنيه
                              </span>
                            </div>
                            {product.originalPrice && (
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-tix-gray-dark line-through">
                                  {product.originalPrice.toLocaleString()} جنيه
                                </span>
                                <span className="text-sm font-bold text-green-600">
                                  وفر {(product.originalPrice - product.price).toLocaleString()} جنيه
                                </span>
                              </div>
                            )}
                          </div>

                          <Button
                            className="w-full tix-btn-primary group-hover:scale-105 transition-all duration-300 shadow-tix"
                            size="sm"
                            disabled={product.stock === 0}
                            onClick={(e) => handleAddToCart(product, e)}
                          >
                            <ShoppingCart className="h-4 w-4 ml-2" />
                            {product.stock === 0 ? "نفد المخزون" : "أضف للسلة"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          ))}
        </div>

        {/* رابط لعرض المزيد */}
        <div className="text-center mt-12">
          <Link href="/products">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-3 border-tix-blue-primary text-tix-blue-primary hover:bg-tix-blue-primary hover:text-tix-white bg-transparent"
            >
              استكشف المزيد من المنتجات
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
