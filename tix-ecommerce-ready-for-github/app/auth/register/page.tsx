"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, Store, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { dataManager } from "@/lib/data"

export default function RegisterPage() {
  const router = useRouter()
  const [userType, setUserType] = useState("customer")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)

  // بيانات النموذج
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    city: "",
    address: "",
    birthDate: "",
    gender: "",
    agreeToTerms: false,
    agreeToPrivacy: false,
    // بيانات إضافية للتجار
    storeName: "",
    storeCategory: "",
    businessType: "",
    commercialRegister: "",
  })

  const cities = [
    "القاهرة",
    "الجيزة",
    "الإسكندرية",
    "القليوبية",
    "بورسعيد",
    "السويس",
    "الأقصر",
    "أسوان",
    "أسيوط",
    "البحيرة",
    "بني سويف",
    "الدقهلية",
    "دمياط",
    "الفيوم",
    "الغربية",
    "الإسماعيلية",
    "كفر الشيخ",
    "مطروح",
    "المنيا",
    "المنوفية",
    "الوادي الجديد",
    "شمال سيناء",
    "قنا",
    "البحر الأحمر",
    "الشرقية",
    "سوهاج",
    "جنوب سيناء",
  ]

  const storeCategories = [
    "إلكترونيات",
    "أزياء",
    "منزل ومطبخ",
    "كتب",
    "رياضة",
    "جمال",
    "ألعاب",
    "سيارات",
    "صحة",
    "مجوهرات",
    "أطفال",
    "حيوانات أليفة",
  ]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // مسح الخطأ عند التعديل
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // التحقق من الحقول الأساسية
    if (!formData.firstName.trim()) newErrors.firstName = "الاسم الأول مطلوب"
    if (!formData.lastName.trim()) newErrors.lastName = "اسم العائلة مطلوب"

    // التحقق من البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "البريد الإلكتروني غير صحيح"
    }

    // التحقق من رقم الهاتف
    const phoneRegex = /^(\+20|0)?1[0-9]{9}$/
    if (!formData.phone.trim()) {
      newErrors.phone = "رقم الهاتف مطلوب"
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "رقم الهاتف غير صحيح"
    }

    // التحقق من كلمة المرور
    if (!formData.password) {
      newErrors.password = "كلمة المرور مطلوبة"
    } else if (formData.password.length < 8) {
      newErrors.password = "كلمة المرور يجب أن تكون 8 أحرف على الأقل"
    }

    // التحقق من تأكيد كلمة المرور
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "تأكيد كلمة المرور مطلوب"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "كلمات المرور غير متطابقة"
    }

    if (!formData.city) newErrors.city = "المدينة مطلوبة"
    if (!formData.address.trim()) newErrors.address = "العنوان مطلوب"

    // التحقق من الشروط
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "يجب الموافقة على الشروط والأحكام"
    if (!formData.agreeToPrivacy) newErrors.agreeToPrivacy = "يجب الموافقة على سياسة الخصوصية"

    // التحقق من بيانات التجار
    if (userType === "merchant") {
      if (!formData.storeName.trim()) newErrors.storeName = "اسم المتجر مطلوب"
      if (!formData.storeCategory) newErrors.storeCategory = "فئة المتجر مطلوبة"
      if (!formData.businessType) newErrors.businessType = "نوع النشاط التجاري مطلوب"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // محاكاة إرسال البيانات للخادم
      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (userType === "customer") {
        // إنشاء حساب عميل
        const customer = dataManager.addCustomer({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          address: formData.address,
        })

        // تسجيل دخول تلقائي
        const user = dataManager.login(formData.email, formData.password, "customer")
        if (user) {
          localStorage.setItem("currentUser", JSON.stringify(user))
        }
      } else {
        // إنشاء حساب تاجر
        const merchant = dataManager.addMerchant({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          storeName: formData.storeName,
          storeCategory: formData.storeCategory,
          businessType: formData.businessType,
          city: formData.city,
          address: formData.address,
          phone: formData.phone,
          status: "active", // في التطبيق الحقيقي سيكون "pending"
        })

        // تسجيل دخول تلقائي
        const user = dataManager.login(formData.email, formData.password, "merchant")
        if (user) {
          localStorage.setItem("currentUser", JSON.stringify(user))
        }
      }

      setSuccess(true)

      // إعادة توجيه بعد 3 ثوان
      setTimeout(() => {
        if (userType === "customer") {
          router.push("/customer/dashboard")
        } else {
          router.push("/merchant/dashboard")
        }
      }, 3000)
    } catch (error) {
      setErrors({ general: "حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى." })
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <Card>
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">تم إنشاء الحساب بنجاح!</h2>
              <p className="text-gray-600 mb-6">
                {userType === "customer"
                  ? "مرحباً بك في Tix! سيتم توجيهك إلى حسابك خلال لحظات..."
                  : "تم إنشاء حساب التاجر بنجاح. سيتم توجيهك إلى لوحة التحكم..."}
              </p>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="text-3xl font-bold text-orange-600">
            Tix
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">إنشاء حساب جديد</h2>
          <p className="mt-2 text-gray-600">انضم إلى مجتمع Tix اليوم</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>اختر نوع الحساب</CardTitle>
            <CardDescription>حدد نوع الحساب الذي تريد إنشاؤه</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={userType} onValueChange={setUserType} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="customer" className="flex items-center space-x-2 rtl:space-x-reverse">
                  <User className="h-4 w-4" />
                  <span>عميل</span>
                </TabsTrigger>
                <TabsTrigger value="merchant" className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Store className="h-4 w-4" />
                  <span>تاجر</span>
                </TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit} className="mt-6">
                {errors.general && (
                  <Alert className="mb-6 border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">{errors.general}</AlertDescription>
                  </Alert>
                )}

                <TabsContent value="customer" className="space-y-6 mt-6">
                  {/* البيانات الشخصية */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">البيانات الشخصية</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">الاسم الأول *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className={errors.firstName ? "border-red-500" : ""}
                          placeholder="أدخل اسمك الأول"
                        />
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                      </div>
                      <div>
                        <Label htmlFor="lastName">اسم العائلة *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          className={errors.lastName ? "border-red-500" : ""}
                          placeholder="أدخل اسم العائلة"
                        />
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">البريد الإلكتروني *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className={errors.email ? "border-red-500" : ""}
                          placeholder="example@email.com"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <Label htmlFor="phone">رقم الهاتف *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className={errors.phone ? "border-red-500" : ""}
                          placeholder="01xxxxxxxxx"
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="password">كلمة المرور *</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                            className={errors.password ? "border-red-500" : ""}
                            placeholder="8 أحرف على الأقل"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute left-2 rtl:right-2 rtl:left-auto top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">تأكيد كلمة المرور *</Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                            className={errors.confirmPassword ? "border-red-500" : ""}
                            placeholder="أعد كتابة كلمة المرور"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute left-2 rtl:right-2 rtl:left-auto top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                        {errors.confirmPassword && (
                          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="birthDate">تاريخ الميلاد</Label>
                        <Input
                          id="birthDate"
                          type="date"
                          value={formData.birthDate}
                          onChange={(e) => handleInputChange("birthDate", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="gender">الجنس</Label>
                        <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الجنس" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">ذكر</SelectItem>
                            <SelectItem value="female">أنثى</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* معلومات العنوان */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">معلومات العنوان</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">المدينة *</Label>
                        <Select value={formData.city} onValueChange={(value) => handleInputChange("city", value)}>
                          <SelectTrigger className={errors.city ? "border-red-500" : ""}>
                            <SelectValue placeholder="اختر المدينة" />
                          </SelectTrigger>
                          <SelectContent>
                            {cities.map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address">العنوان التفصيلي *</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        className={errors.address ? "border-red-500" : ""}
                        placeholder="الشارع، الحي، رقم المبنى..."
                      />
                      {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="merchant" className="space-y-6 mt-6">
                  {/* البيانات الشخصية للتاجر */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">البيانات الشخصية</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">الاسم الأول *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className={errors.firstName ? "border-red-500" : ""}
                          placeholder="أدخل اسمك الأول"
                        />
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                      </div>
                      <div>
                        <Label htmlFor="lastName">اسم العائلة *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          className={errors.lastName ? "border-red-500" : ""}
                          placeholder="أدخل اسم العائلة"
                        />
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">البريد الإلكتروني *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className={errors.email ? "border-red-500" : ""}
                          placeholder="store@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <Label htmlFor="phone">رقم الهاتف *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className={errors.phone ? "border-red-500" : ""}
                          placeholder="01xxxxxxxxx"
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="password">كلمة المرور *</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                            className={errors.password ? "border-red-500" : ""}
                            placeholder="8 أحرف على الأقل"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute left-2 rtl:right-2 rtl:left-auto top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">تأكيد كلمة المرور *</Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                            className={errors.confirmPassword ? "border-red-500" : ""}
                            placeholder="أعد كتابة كلمة المرور"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute left-2 rtl:right-2 rtl:left-auto top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                        {errors.confirmPassword && (
                          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* معلومات المتجر */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">معلومات المتجر</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="storeName">اسم المتجر *</Label>
                        <Input
                          id="storeName"
                          value={formData.storeName}
                          onChange={(e) => handleInputChange("storeName", e.target.value)}
                          className={errors.storeName ? "border-red-500" : ""}
                          placeholder="أدخل اسم متجرك"
                        />
                        {errors.storeName && <p className="text-red-500 text-sm mt-1">{errors.storeName}</p>}
                      </div>
                      <div>
                        <Label htmlFor="storeCategory">فئة المتجر *</Label>
                        <Select
                          value={formData.storeCategory}
                          onValueChange={(value) => handleInputChange("storeCategory", value)}
                        >
                          <SelectTrigger className={errors.storeCategory ? "border-red-500" : ""}>
                            <SelectValue placeholder="اختر فئة المتجر" />
                          </SelectTrigger>
                          <SelectContent>
                            {storeCategories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.storeCategory && <p className="text-red-500 text-sm mt-1">{errors.storeCategory}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="businessType">نوع النشاط التجاري *</Label>
                        <Select
                          value={formData.businessType}
                          onValueChange={(value) => handleInputChange("businessType", value)}
                        >
                          <SelectTrigger className={errors.businessType ? "border-red-500" : ""}>
                            <SelectValue placeholder="اختر نوع النشاط" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="individual">فردي</SelectItem>
                            <SelectItem value="company">شركة</SelectItem>
                            <SelectItem value="establishment">مؤسسة</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.businessType && <p className="text-red-500 text-sm mt-1">{errors.businessType}</p>}
                      </div>
                      <div>
                        <Label htmlFor="commercialRegister">السجل التجاري (اختياري)</Label>
                        <Input
                          id="commercialRegister"
                          value={formData.commercialRegister}
                          onChange={(e) => handleInputChange("commercialRegister", e.target.value)}
                          placeholder="رقم السجل التجاري"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="city">المدينة *</Label>
                      <Select value={formData.city} onValueChange={(value) => handleInputChange("city", value)}>
                        <SelectTrigger className={errors.city ? "border-red-500" : ""}>
                          <SelectValue placeholder="اختر المدينة" />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>

                    <div>
                      <Label htmlFor="address">عنوان المتجر *</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        className={errors.address ? "border-red-500" : ""}
                        placeholder="العنوان الكامل للمتجر أو المستودع"
                      />
                      {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>
                  </div>
                </TabsContent>

                {/* الشروط والأحكام */}
                <div className="space-y-4 pt-6 border-t">
                  <div className="flex items-start space-x-3 rtl:space-x-reverse">
                    <Checkbox
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                      className={errors.agreeToTerms ? "border-red-500" : ""}
                    />
                    <div className="flex-1">
                      <Label htmlFor="agreeToTerms" className="text-sm cursor-pointer">
                        أوافق على{" "}
                        <Link href="/terms" className="text-orange-600 hover:underline" target="_blank">
                          الشروط والأحكام
                        </Link>
                        {userType === "merchant" && (
                          <>
                            {" "}
                            و{" "}
                            <Link href="/merchant/terms" className="text-orange-600 hover:underline" target="_blank">
                              شروط البيع للتجار
                            </Link>
                          </>
                        )}
                      </Label>
                      {errors.agreeToTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>}
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 rtl:space-x-reverse">
                    <Checkbox
                      id="agreeToPrivacy"
                      checked={formData.agreeToPrivacy}
                      onCheckedChange={(checked) => handleInputChange("agreeToPrivacy", checked as boolean)}
                      className={errors.agreeToPrivacy ? "border-red-500" : ""}
                    />
                    <div className="flex-1">
                      <Label htmlFor="agreeToPrivacy" className="text-sm cursor-pointer">
                        أوافق على{" "}
                        <Link href="/privacy" className="text-orange-600 hover:underline" target="_blank">
                          سياسة الخصوصية
                        </Link>
                      </Label>
                      {errors.agreeToPrivacy && <p className="text-red-500 text-sm mt-1">{errors.agreeToPrivacy}</p>}
                    </div>
                  </div>
                </div>

                {/* أزرار الإجراءات */}
                <div className="flex justify-between pt-6">
                  <Button variant="outline" asChild>
                    <Link href="/auth/login">لديك حساب؟ تسجيل الدخول</Link>
                  </Button>
                  <Button type="submit" disabled={isLoading} className="min-w-[120px]">
                    {isLoading ? (
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>جاري الإنشاء...</span>
                      </div>
                    ) : (
                      `إنشاء حساب ${userType === "customer" ? "عميل" : "تاجر"}`
                    )}
                  </Button>
                </div>
              </form>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
