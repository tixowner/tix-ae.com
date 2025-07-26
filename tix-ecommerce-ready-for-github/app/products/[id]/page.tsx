"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, Heart, Share2, ShoppingCart, Minus, Plus, Truck, Shield, RotateCcw, Home } from "lucide-react"
import Link from "next/link"
import { dataManager, type Product } from "@/lib/data"
import { cartManager } from "@/lib/cart"
import { SimilarProducts } from "@/components/similar-products"
import { useCart } from "@/components/cart-provider"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const { refreshCart } = useCart()

  useEffect(() => {
    const fetchProduct = () => {
      const foundProduct = dataManager.getProductById(params.id)
      setProduct(foundProduct || null)
      setLoading(false)
    }

    fetchProduct()
  }, [params.id])

  const handleAddToCart = () => {
    if (product) {
      cartManager.addItem(product, quantity)
      refreshCart()
      alert(`تم إضافة ${product.name} إلى السلة!`)
    }
  }

  const handleAddToWishlist = () => {
    if (product) {
      alert(`تم إضافة ${product.name} إلى المفضلة!`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-tix-white">
        <header className="tix-header">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="text-2xl font-bold text-tix-orange-primary">
                Tix
              </Link>
            </div>
          </div>
        </header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="bg-tix-gray-light h-96 rounded-lg"></div>
              <div className="space-y-4">
                <div className="bg-tix-gray-light h-8 rounded w-3/4"></div>
                <div className="bg-tix-gray-light h-4 rounded w-1/2"></div>
                <div className="bg-tix-gray-light h-6 rounded w-1/4"></div>
                <div className="bg-tix-gray-light h-12 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-tix-white">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-tix-black mb-4">المنتج غير موجود</h1>
            <p className="text-lg tix-text-secondary mb-8">عذراً، لم نتمكن من العثور على المنتج المطلوب</p>
            <Button className="tix-btn-primary" asChild>
              <Link href="/products">تصفح المنتجات</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

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
              <Link href="/products" className="text-tix-white hover:text-tix-orange-primary">
                المنتجات
              </Link>
              <Link href="/" className="text-tix-white hover:text-tix-orange-primary">
                <Home className="h-5 w-5" />
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 rtl:space-x-reverse text-sm tix-text-secondary">
            <li>
              <Link href="/" className="hover:text-tix-blue-primary">
                الرئيسية
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/products" className="hover:text-tix-blue-primary">
                المنتجات
              </Link>
            </li>
            <li>/</li>
            <li className="text-tix-black">{product.name}</li>
          </ol>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={product.images[selectedImage] || "/placeholder.svg?height=500&width=500"}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg shadow-tix"
              />
              {discountPercentage > 0 && (
                <Badge className="absolute top-4 right-4 tix-badge-discount text-lg px-3 py-1">
                  خصم {discountPercentage}%
                </Badge>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex space-x-2 rtl:space-x-reverse">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-md overflow-hidden border-2 ${
                      selectedImage === index ? "border-tix-blue-primary" : "border-tix-gray-light"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg?height=80&width=80"}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-tix-black mb-2">{product.name}</h1>
              <p className="text-lg tix-text-secondary mb-4">{product.description}</p>

              <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-tix-gray-light"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-tix-black font-semibold">{product.rating.toFixed(1)}</span>
                <span className="tix-text-secondary">({product.reviews} تقييم)</span>
              </div>

              <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
                <Badge
                  className={product.condition === "new" ? "tix-badge-status" : "bg-tix-blue-primary text-tix-white"}
                >
                  {product.condition === "new" ? "جديد" : "استيراد"}
                </Badge>
                <span className="tix-text-secondary">بواسطة: {product.merchant}</span>
              </div>
            </div>

            <Separator className="bg-tix-gray-light" />

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <span className="text-3xl font-bold text-tix-orange-primary">
                  {product.price.toLocaleString()} جنيه
                </span>
                {product.originalPrice && (
                  <span className="text-xl tix-text-secondary line-through">
                    {product.originalPrice.toLocaleString()} جنيه
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-green-600 font-semibold">
                  وفر {(product.originalPrice - product.price).toLocaleString()} جنيه
                </p>
              )}
            </div>

            <Separator className="bg-tix-gray-light" />

            {/* Stock Status */}
            <div>
              {product.stock > 0 ? (
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 font-semibold">متوفر في المخزون ({product.stock} قطعة)</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <div className="w-3 h-3 bg-tix-red-primary rounded-full"></div>
                  <span className="text-tix-red-primary font-semibold">نفد من المخزون</span>
                </div>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            {product.stock > 0 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <span className="font-semibold text-tix-black">الكمية:</span>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-10 w-10 p-0 border-tix-gray-light hover:bg-tix-gray-light bg-transparent"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-semibold text-tix-black">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-10 w-10 p-0 border-tix-gray-light hover:bg-tix-gray-light bg-transparent"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex space-x-4 rtl:space-x-reverse">
                  <Button className="flex-1 tix-btn-primary" size="lg" onClick={handleAddToCart}>
                    <ShoppingCart className="h-5 w-5 ml-2" />
                    أضف إلى السلة
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-tix-red-primary text-tix-red-primary hover:bg-tix-red-primary hover:text-tix-white bg-transparent"
                    onClick={handleAddToWishlist}
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-tix-blue-primary text-tix-blue-primary hover:bg-tix-blue-primary hover:text-tix-white bg-transparent"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Truck className="h-5 w-5 text-tix-blue-primary" />
                <span className="text-sm tix-text-secondary">توصيل مجاني</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Shield className="h-5 w-5 text-tix-blue-primary" />
                <span className="text-sm tix-text-secondary">ضمان الجودة</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RotateCcw className="h-5 w-5 text-tix-blue-primary" />
                <span className="text-sm tix-text-secondary">إرجاع سهل</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Specifications */}
        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <Card className="tix-card mb-16">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-tix-black mb-6">المواصفات</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-tix-gray-light last:border-b-0">
                    <span className="font-semibold text-tix-black">{key}:</span>
                    <span className="tix-text-secondary">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Similar Products */}
      <SimilarProducts productId={product.id} />
    </div>
  )
}
