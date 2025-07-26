"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { dataManager } from "@/lib/data"

export default function LoginPage() {
  const router = useRouter()
  const [userType, setUserType] = useState("customer")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (error) setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      setError("يرجى ملء جميع الحقول")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // محاكاة تأخير الشبكة
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const user = dataManager.login(formData.email, formData.password, userType as any)

      if (user) {
        // تسجيل دخول ناجح
        localStorage.setItem("currentUser", JSON.stringify(user))

        // إعادة توجيه حسب نوع المستخدم
        switch (user.type) {
          case "admin":
            router.push("/admin/dashboard")
            break
          case "merchant":
            router.push("/merchant/dashboard")
            break
          case "customer":
            router.push("/customer/dashboard")
            break
        }
      } else {
        setError("البريد الإلكتروني أو كلمة المرور غير صحيحة")
      }
    } catch (error) {
      setError("حدث خطأ أثناء تسجيل الدخول")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="text-3xl font-bold text-orange-600">
            Tix
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">تسجيل الدخول</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>اختر نوع الحساب</CardTitle>
            <CardDescription>اختر نوع حسابك للوصول إلى الميزات المناسبة</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={userType} onValueChange={setUserType} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="customer">عميل</TabsTrigger>
                <TabsTrigger value="merchant">تاجر</TabsTrigger>
                <TabsTrigger value="admin">مدير</TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit} className="mt-6">
                {error && (
                  <Alert className="mb-6 border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">{error}</AlertDescription>
                  </Alert>
                )}

                <TabsContent value="customer" className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="customer-email">البريد الإلكتروني</Label>
                    <Input
                      id="customer-email"
                      type="email"
                      placeholder="customer@test.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customer-password">كلمة المرور</Label>
                    <div className="relative">
                      <Input
                        id="customer-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="أدخل كلمة المرور"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
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
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول كعميل"}
                  </Button>
                  <p className="text-center text-sm text-gray-600">
                    ليس لديك حساب؟{" "}
                    <Link href="/auth/register" className="text-orange-600 hover:underline">
                      إنشاء حساب جديد
                    </Link>
                  </p>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800 font-medium">حساب تجريبي:</p>
                    <p className="text-xs text-blue-600">customer@test.com / password123</p>
                  </div>
                </TabsContent>

                <TabsContent value="merchant" className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="merchant-email">البريد الإلكتروني</Label>
                    <Input
                      id="merchant-email"
                      type="email"
                      placeholder="merchant@test.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="merchant-password">كلمة المرور</Label>
                    <div className="relative">
                      <Input
                        id="merchant-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="أدخل كلمة المرور"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
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
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول كتاجر"}
                  </Button>
                  <p className="text-center text-sm text-gray-600">
                    ليس لديك حساب تاجر؟{" "}
                    <Link href="/merchant/register" className="text-orange-600 hover:underline">
                      انضم كتاجر
                    </Link>
                  </p>
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800 font-medium">حساب تجريبي:</p>
                    <p className="text-xs text-green-600">merchant@test.com / password123</p>
                  </div>
                </TabsContent>

                <TabsContent value="admin" className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">البريد الإلكتروني</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      placeholder="admin@tix.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">كلمة المرور</Label>
                    <div className="relative">
                      <Input
                        id="admin-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="أدخل كلمة المرور"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
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
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول كمدير"}
                  </Button>
                  <div className="mt-4 p-3 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-800 font-medium">حساب المدير:</p>
                    <p className="text-xs text-red-600">admin@tix.com / admin123</p>
                  </div>
                </TabsContent>
              </form>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
