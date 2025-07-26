"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Upload, X, ArrowLeft, ImagePlus } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { dataManager } from "@/lib/data"

export default function AddProductPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState("")
  const [productCondition, setProductCondition] = useState("new")
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    condition: "new",
    // مواصفات حسب الفئة
    brand: "",
    model: "",
    color: "",
    size: "",
    material: "",
    warranty: "",
  })

  useEffect(() => {
    // التحقق من تسجيل الدخول
    const user = localStorage.getItem("currentUser")
    if (user) {
      const parsedUser = JSON.parse(user)
      if (parsedUser.type === "merchant") {
        setCurrentUser(parsedUser)
      } else {
        router.push("/auth/login")
      }
    } else {
      router.push("/auth/login")
    }
  }, [router])

  const categories = [
    { value: "electronics", label: "إلكترونيات" },
    { value: "fashion", label: "أزياء" },
    { value: "home", label: "منزل ومطبخ" },
    { value: "books", label: "كتب" },
    { value: "sports", label: "رياضة" },
    { value: "beauty", label: "جمال" },
    { value: "games", label: "ألعاب" },
    { value: "cars", label: "سيارات" },
  ]

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])

    if (files.length + uploadedImages.length > 5) {
      alert("يمكنك رفع 5 صور كحد أقصى")
      return
    }

    files.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB
        alert("حجم الصورة يجب أن يكون أقل من 5 ميجابايت")
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string
        setUploadedImages((prev) => [...prev, imageUrl])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentUser) {
      alert("يجب تسجيل الدخول أولاً")
      return
    }

    if (!formData.name || !formData.description || !formData.price || !formData.stock || !selectedCategory) {
      alert("يرجى ملء جميع الحقول المطلوبة")
      return
    }

    if (uploadedImages.length === 0) {
      alert("يرجى رفع صورة واحدة على الأقل للمنتج")
      return
    }

    setIsLoading(true)

    try {
      // إنشاء المواصفات
      const specifications: Record<string, string> = {}
      if (formData.brand) specifications["الماركة"] = formData.brand
      if (formData.model) specifications["الموديل"] = formData.model
      if (formData.color) specifications["اللون"] = formData.color
      if (formData.size) specifications["المقاس"] = formData.size
      if (formData.material) specifications["الخامة"] = formData.material
      if (formData.warranty) specifications["الضمان"] = formData.warranty

      // إضافة المنتج
      const newProduct = dataManager.addProduct({
        name: formData.name,
        description: formData.description,
        price: Number.parseFloat(formData.price),
        originalPrice: Number.parseFloat(formData.price) * 1.2, // سعر أصلي أعلى بـ 20%
        stock: Number.parseInt(formData.stock),
        category: selectedCategory,
        condition: productCondition as "new" | "import",
        images: uploadedImages,
        merchant: currentUser.data.storeName,
        merchantId: currentUser.id,
        specifications,
        features: [], // يمكن إضافة المميزات لاحقاً
        status: "active",
      })

      alert("تم إضافة المنتج بنجاح!")
      router.push("/merchant/dashboard")
    } catch (error) {
      alert("حدث خطأ أثناء إضافة المنتج")
    } finally {
      setIsLoading(false)
    }
  }

  const getCategorySpecs = (category: string) => {
    switch (category) {
      case "electronics":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="brand">الماركة</Label>
              <Input
                id="brand"
                placeholder="Samsung, Apple, Huawei..."
                value={formData.brand}
                onChange={(e) => handleInputChange("brand", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="model">الموديل</Label>
              <Input
                id="model"
                placeholder="Galaxy S24, iPhone 15..."
                value={formData.model}
                onChange={(e) => handleInputChange("model", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="color">اللون</Label>
              <Input
                id="color"
                placeholder="أسود، أبيض، أزرق..."
                value={formData.color}
                onChange={(e) => handleInputChange("color", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="warranty">فترة الضمان</Label>
              <Select value={formData.warranty} onValueChange={(value) => handleInputChange("warranty", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر فترة الضمان" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6months">6 أشهر</SelectItem>
                  <SelectItem value="1year">سنة واحدة</SelectItem>
                  <SelectItem value="2years">سنتان</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      case "fashion":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="brand">الماركة</Label>
              <Input
                id="brand"
                placeholder="Nike, Adidas, Zara..."
                value={formData.brand}
                onChange={(e) => handleInputChange("brand", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="size">المقاس</Label>
              <Select value={formData.size} onValueChange={(value) => handleInputChange("size", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المقاس" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xs">XS</SelectItem>
                  <SelectItem value="s">S</SelectItem>
                  <SelectItem value="m">M</SelectItem>
                  <SelectItem value="l">L</SelectItem>
                  <SelectItem value="xl">XL</SelectItem>
                  <SelectItem value="xxl">XXL</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="color">اللون</Label>
              <Input
                id="color"
                placeholder="أحمر، أزرق، أسود..."
                value={formData.color}
                onChange={(e) => handleInputChange("color", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="material">الخامة</Label>
              <Input
                id="material"
                placeholder="قطن، بوليستر، حرير..."
                value={formData.material}
                onChange={(e) => handleInputChange("material", e.target.value)}
              />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Link href="/merchant/dashboard" className="text-2xl font-bold text-orange-600">
                Tix Merchant
              </Link>
            </div>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Button variant="outline" asChild>
                <Link href="/merchant/dashboard">
                  <ArrowLeft className="h-4 w-4 ml-2" />
                  العودة للوحة التحكم
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">إضافة منتج جديد</h1>
          <p className="text-gray-600 mt-2">أضف منتج جديد إلى متجر {currentUser.data.storeName}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* المعلومات الأساسية */}
          <Card>
            <CardHeader>
              <CardTitle>المعلومات الأساسية</CardTitle>
              <CardDescription>أدخل المعلومات الأساسية للمنتج</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="product-name">اسم المنتج *</Label>
                    <Input
                      id="product-name"
                      placeholder="أدخل اسم المنتج"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="product-category">الفئة *</Label>
                    <Select
                      value={selectedCategory}
                      onValueChange={(value) => {
                        setSelectedCategory(value)
                        handleInputChange("category", value)
                      }}
                    >
                      <SelectTrigger>
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
                  </div>
                  <div>
                    <Label htmlFor="product-price">السعر (جنيه) *</Label>
                    <Input
                      id="product-price"
                      type="number"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="product-stock">الكمية المتوفرة *</Label>
                    <Input
                      id="product-stock"
                      type="number"
                      placeholder="0"
                      value={formData.stock}
                      onChange={(e) => handleInputChange("stock", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label>حالة المنتج *</Label>
                    <RadioGroup
                      value={productCondition}
                      onValueChange={(value) => {
                        setProductCondition(value)
                        handleInputChange("condition", value)
                      }}
                      className="flex space-x-4 rtl:space-x-reverse mt-2"
                    >
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <RadioGroupItem value="new" id="new" />
                        <Label htmlFor="new">جديد</Label>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <RadioGroupItem value="import" id="import" />
                        <Label htmlFor="import">استيراد</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="product-description">وصف المنتج *</Label>
                    <Textarea
                      id="product-description"
                      placeholder="أدخل وصف مفصل للمنتج"
                      className="min-h-[120px]"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* صور المنتج */}
          <Card>
            <CardHeader>
              <CardTitle>صور المنتج</CardTitle>
              <CardDescription>ارفع صور عالية الجودة للمنتج (حتى 5 صور)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <ImagePlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">اسحب الصور هنا أو انقر للتحديد</p>
                  <p className="text-sm text-gray-500 mb-4">يمكنك رفع حتى 5 صور • الحد الأقصى 5 ميجابايت لكل صورة</p>
                  <p className="text-sm text-gray-500 mb-4">الصيغ المدعومة: JPG, PNG, WebP</p>
                  <input
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="product-images"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById("product-images")?.click()}
                    disabled={uploadedImages.length >= 5}
                  >
                    <Upload className="h-4 w-4 ml-2" />
                    اختيار الصور
                  </Button>
                </div>

                {/* معاينة الصور المرفوعة */}
                {uploadedImages.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-medium mb-4">الصور المرفوعة ({uploadedImages.length}/5)</h4>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {uploadedImages.map((image, index) => (
                        <div
                          key={index}
                          className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group"
                        >
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`معاينة المنتج ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button
                              type="button"
                              size="sm"
                              variant="destructive"
                              onClick={() => removeImage(index)}
                              className="h-8 w-8 p-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          {index === 0 && (
                            <Badge className="absolute top-2 left-2 bg-orange-600">الصورة الرئيسية</Badge>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">الصورة الأولى ستكون الصورة الرئيسية للمنتج</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* المواصفات حسب الفئة */}
          {selectedCategory && (
            <Card>
              <CardHeader>
                <CardTitle>مواصفات المنتج</CardTitle>
                <CardDescription>أدخل المواصفات التفصيلية للمنتج</CardDescription>
              </CardHeader>
              <CardContent>{getCategorySpecs(selectedCategory)}</CardContent>
            </Card>
          )}

          {/* معاينة المنتج */}
          <Card>
            <CardHeader>
              <CardTitle>معاينة المنتج</CardTitle>
              <CardDescription>كيف سيظهر منتجك للعملاء</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="aspect-square bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                    {uploadedImages.length > 0 ? (
                      <img
                        src={uploadedImages[0] || "/placeholder.svg"}
                        alt="معاينة المنتج"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center text-gray-500">
                        <ImagePlus className="h-12 w-12 mx-auto mb-2" />
                        <p className="text-sm">معاينة الصورة الرئيسية</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900">{formData.name || "اسم المنتج"}</h4>
                    <p className="text-sm text-gray-600 mt-1">{formData.description || "وصف المنتج سيظهر هنا..."}</p>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-2xl font-bold text-orange-600">
                      {formData.price ? `${Number(formData.price).toLocaleString()} جنيه` : "0 جنيه"}
                    </span>
                    <Badge variant={productCondition === "new" ? "default" : "secondary"}>
                      {productCondition === "new" ? "جديد" : "استيراد"}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">المخزون: {formData.stock || "0"} قطعة</p>
                    <p className="text-sm text-gray-600">
                      الفئة: {categories.find((c) => c.value === selectedCategory)?.label || "غير محدد"}
                    </p>
                    <p className="text-sm text-gray-600">المتجر: {currentUser.data.storeName}</p>
                    {formData.brand && <p className="text-sm text-gray-600">الماركة: {formData.brand}</p>}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* أزرار الإجراءات */}
          <div className="flex justify-between pt-6">
            <Button type="button" variant="outline" asChild>
              <Link href="/merchant/dashboard">إلغاء</Link>
            </Button>
            <Button type="submit" disabled={isLoading} className="min-w-[150px]">
              {isLoading ? (
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>جاري الإضافة...</span>
                </div>
              ) : (
                <>
                  <Upload className="h-4 w-4 ml-2" />
                  إضافة المنتج
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
