"use client"

import type React from "react"
import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, ShoppingCart, Heart, Filter, Grid, List, User, Menu } from "lucide-react"
import Link from "next/link"
import SearchBar from "@/components/search-bar"
import { dataManager } from "@/lib/data"
import { CartButton } from "@/components/cart-button"
import { cartManager } from "@/lib/cart"

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("popular")
  const [filterCategory, setFilterCategory] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [allProducts, setAllProducts] = useState<any[]>([])

  useEffect(() => {
    // تحميل المنتجات من قاعدة البيانات
    const products = dataManager.getProducts().filter((p) => p.status === "active")
    setAllProducts(products)
  }, [])

  const categories = [
    { value: "all", label: "جميع الفئات" },
    { value: "electronics", label: "إلكترونيات" },
    { value: "fashion", label: "أزياء" },
    { value: "home", label: "منزل ومطبخ" },
    { value: "books", label: "كتب" },
    { value: "sports", label: "رياضة" },
    { value: "beauty", label: "جمال" },
    { value: "games", label: "ألعاب" },
    { value: "cars", label: "سيارات" },
  ]

  const priceRanges = [
    { value: "all", label: "جميع الأسعار" },
    { value: "0-1000", label: "أقل من 1,000 جنيه" },
    { value: "1000-5000", label: "1,000 - 5,000 جنيه" },
    { value: "5000-15000", label: "5,000 - 15,000 جنيه" },
    { value: "15000-30000", label: "15,000 - 30,000 جنيه" },
    { value: "30000+", label: "أكثر من 30,000 جنيه" },
  ]

  // تطبيق الفلاتر والبحث
  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts]

    // فلتر الفئة
    if (filterCategory !== "all") {
      filtered = filtered.filter((product) => product.category === filterCategory)
    }

    // فلتر السعر
    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map((p) => p.replace("+", ""))
      const minPrice = Number.parseInt(min)
      const maxPrice = max ? Number.parseInt(max) : Number.POSITIVE_INFINITY
      filtered = filtered.filter((product) => product.price >= minPrice && product.price <= maxPrice)
    }

    // فلتر البحث
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.merchant.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // ترتيب النتائج
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      default: // popular
        filtered.sort((a, b) => b.reviews - a.reviews)
    }

    return filtered
  }, [allProducts, filterCategory, priceRange, searchQuery, sortBy])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault()
    cartManager.addItem(product, 1)
    alert(`تم إضافة ${product.name} إلى السلة!`)
  }

  const handleAddToWishlist = (product: any, e: React.MouseEvent) => {
    e.preventDefault()
    alert(`تم إضافة ${product.name} إلى المفضلة!`)
  }

  return (
    <div className="min-h-screen bg-tix-white">
      {/* Header */}
      <header className="tix-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Link href="/" className="text-2xl font-bold text-tix-orange-primary">
                Tix
              </Link>
              <div className="hidden md:flex items-center space-x-2 rtl:space-x-reverse">
                <Button variant="ghost" size="sm" className="text-tix-white hover:bg-tix-gray-dark">
                  <Menu className="h-4 w-4 ml-2" />
                  الأقسام
                </Button>
              </div>
            </div>

            <div className="flex-1 max-w-2xl mx-8">
              <SearchBar onSearch={handleSearch} placeholder="ابحث في المنتجات..." />
            </div>

            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Button variant="ghost" size="sm" className="text-tix-white hover:bg-tix-gray-dark" asChild>
                <Link href="/auth/login">
                  <User className="h-4 w-4 ml-2" />
                  تسجيل الدخول
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="text-tix-white hover:bg-tix-gray-dark">
                <Heart className="h-4 w-4 ml-2" />
                المفضلة
              </Button>
              <CartButton />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-tix-black">جميع المنتجات</h1>
              {searchQuery && <p className="tix-text-secondary mt-1">نتائج البحث عن: "{searchQuery}"</p>}
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                className={
                  viewMode === "grid"
                    ? "tix-btn-primary"
                    : "border-tix-blue-primary text-tix-blue-primary hover:bg-tix-blue-primary hover:text-tix-white bg-transparent"
                }
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                className={
                  viewMode === "list"
                    ? "tix-btn-primary"
                    : "border-tix-blue-primary text-tix-blue-primary hover:bg-tix-blue-primary hover:text-tix-white bg-transparent"
                }
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Filter className="h-4 w-4 tix-text-secondary" />
              <span className="text-sm font-medium text-tix-black">تصفية:</span>
            </div>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48 border-tix-gray-light focus:border-tix-blue-primary">
                <SelectValue placeholder="اختر الفئة" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-48 border-tix-gray-light focus:border-tix-blue-primary">
                <SelectValue placeholder="نطاق السعر" />
              </SelectTrigger>
              <SelectContent>
                {priceRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 border-tix-gray-light focus:border-tix-blue-primary">
                <SelectValue placeholder="ترتيب حسب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">الأكثر شعبية</SelectItem>
                <SelectItem value="price-low">السعر: من الأقل للأعلى</SelectItem>
                <SelectItem value="price-high">السعر: من الأعلى للأقل</SelectItem>
                <SelectItem value="rating">التقييم الأعلى</SelectItem>
                <SelectItem value="newest">الأحدث</SelectItem>
              </SelectContent>
            </Select>

            {(searchQuery || filterCategory !== "all" || priceRange !== "all") && (
              <Button
                variant="outline"
                size="sm"
                className="border-tix-red-primary text-tix-red-primary hover:bg-tix-red-primary hover:text-tix-white bg-transparent"
                onClick={() => {
                  setSearchQuery("")
                  setFilterCategory("all")
                  setPriceRange("all")
                }}
              >
                مسح الفلاتر
              </Button>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="h-16 w-16 tix-text-secondary mx-auto mb-4" />
            <h3 className="text-lg font-medium text-tix-black mb-2">لا توجد منتجات</h3>
            <p className="tix-text-secondary mb-6">
              {allProducts.length === 0
                ? "لا توجد منتجات متاحة حالياً. كن أول من يضيف منتجات!"
                : "جرب تغيير معايير البحث أو الفلاتر"}
            </p>
            {allProducts.length === 0 && (
              <div className="flex justify-center space-x-4 rtl:space-x-reverse">
                <Button className="tix-btn-primary" asChild>
                  <Link href="/merchant/register">انضم كتاجر</Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-tix-blue-primary text-tix-blue-primary hover:bg-tix-blue-primary hover:text-tix-white bg-transparent"
                  asChild
                >
                  <Link href="/auth/login">تسجيل الدخول</Link>
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div
            className={`grid gap-6 ${
              viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
            }`}
          >
            {filteredProducts.map((product) => (
              <Link href={`/products/${product.id}`} key={product.id}>
                <Card className="tix-card card-hover cursor-pointer">
                  <CardContent className="p-4">
                    {viewMode === "grid" ? (
                      <>
                        <div className="relative mb-4">
                          <img
                            src={product.images[0] || "/placeholder.svg?height=200&width=200"}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-md"
                          />
                          <Badge
                            className={`absolute top-2 right-2 ${product.condition === "new" ? "tix-badge-status" : "bg-tix-blue-primary text-tix-white"}`}
                          >
                            {product.condition === "new" ? "جديد" : "استيراد"}
                          </Badge>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute bottom-2 right-2 h-8 w-8 p-0 bg-tix-white/80 hover:bg-tix-white"
                            onClick={(e) => handleAddToWishlist(product, e)}
                          >
                            <Heart className="h-4 w-4 text-tix-red-primary" />
                          </Button>
                        </div>
                        <h3 className="font-semibold text-sm mb-2 line-clamp-2 text-tix-black">{product.name}</h3>
                        <p className="text-xs tix-text-secondary mb-2">{product.merchant}</p>
                        <div className="flex items-center mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.floor(product.rating)
                                    ? "text-yellow-400 fill-current"
                                    : "text-tix-gray-light"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs tix-text-secondary mr-2">({product.reviews})</span>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="text-lg font-bold text-tix-orange-primary">
                              {product.price.toLocaleString()} جنيه
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm tix-text-secondary line-through mr-2">
                                {product.originalPrice.toLocaleString()} جنيه
                              </span>
                            )}
                          </div>
                        </div>
                        <Button
                          className="w-full tix-btn-primary"
                          size="sm"
                          disabled={product.stock === 0}
                          onClick={(e) => handleAddToCart(product, e)}
                        >
                          {product.stock > 0 ? "أضف للسلة" : "نفد المخزون"}
                        </Button>
                      </>
                    ) : (
                      <div className="flex space-x-4 rtl:space-x-reverse">
                        <div className="relative">
                          <img
                            src={product.images[0] || "/placeholder.svg?height=150&width=150"}
                            alt={product.name}
                            className="w-32 h-32 object-cover rounded-md"
                          />
                          <Badge
                            className={`absolute top-1 right-1 text-xs ${product.condition === "new" ? "tix-badge-status" : "bg-tix-blue-primary text-tix-white"}`}
                          >
                            {product.condition === "new" ? "جديد" : "استيراد"}
                          </Badge>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2 text-tix-black">{product.name}</h3>
                          <p className="text-sm tix-text-secondary mb-2">{product.description}</p>
                          <p className="text-sm tix-text-secondary mb-2">بواسطة: {product.merchant}</p>
                          <div className="flex items-center mb-2">
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
                            <span className="text-sm tix-text-secondary mr-2">({product.reviews} تقييم)</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-xl font-bold text-tix-orange-primary">
                                {product.price.toLocaleString()} جنيه
                              </span>
                              {product.originalPrice && (
                                <span className="text-sm tix-text-secondary line-through mr-2">
                                  {product.originalPrice.toLocaleString()} جنيه
                                </span>
                              )}
                            </div>
                            <div className="flex space-x-2 rtl:space-x-reverse">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-tix-red-primary text-tix-red-primary hover:bg-tix-red-primary hover:text-tix-white bg-transparent"
                                onClick={(e) => handleAddToWishlist(product, e)}
                              >
                                <Heart className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                className="tix-btn-primary"
                                disabled={product.stock === 0}
                                onClick={(e) => handleAddToCart(product, e)}
                              >
                                {product.stock > 0 ? "أضف للسلة" : "نفد المخزون"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Results Info */}
        <div className="mt-8 text-center tix-text-secondary">
          <p>
            عرض {filteredProducts.length} من أصل {allProducts.length} منتج
          </p>
        </div>
      </div>
    </div>
  )
}
