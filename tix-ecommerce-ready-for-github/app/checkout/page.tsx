"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Truck, MapPin, User, CheckCircle } from "lucide-react"
import Link from "next/link"
import { cartManager, type CartItem } from "@/lib/cart"
import { useCart } from "@/components/cart-provider"

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([])
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const { refreshCart } = useCart()

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    governorate: "",
    notes: "",
  })

  useEffect(() => {
    setItems(cartManager.getItems())
  }, [])

  const total = cartManager.getTotal()
  const itemCount = cartManager.getItemCount()

  const governorates = [
    "القاهرة",
    "الجيزة",
    "الإسكندرية",
    "الدقهلية",
    "البحر الأحمر",
    "البحيرة",
    "الفيوم",
    "الغربية",
    "الإسماعيلية",
    "المنوفية",
    "المنيا",
    "القليوبية",
    "الوادي الجديد",
    "السويس",
    "أسوان",
    "أسيوط",
    "بني سويف",
    "بورسعيد",
    "دمياط",
    "الشرقية",
    "جنوب سيناء",
    "كفر الشيخ",
    "مطروح",
    "الأقصر",
    "قنا",
    "شمال سيناء",
    "سوهاج",
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // محاكاة معالجة الطلب
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // مسح السلة
    cartManager.clearCart()
    refreshCart()

    setOrderComplete(true)
    setIsSubmitting(false)
  }

  if (items.length === 0 && !orderComplete) {
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

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-tix-black mb-4">لا توجد منتجات للدفع</h1>
            <p className="text-lg tix-text-secondary mb-8">يرجى إضافة منتجات إلى سلة التسوق أولاً</p>
            <Button className="tix-btn-primary" asChild>
              <Link href="/products">تسوق الآن</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (orderComplete) {
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

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-tix-black mb-4">تم تأكيد طلبك بنجاح!</h1>
            <p className="text-lg tix-text-secondary mb-8">شكراً لك على الثقة. سيتم التواصل معك قريباً لتأكيد التفاصيل</p>
            <div className="flex justify-center space-x-4 rtl:space-x-reverse">
              <Button className="tix-btn-primary" asChild>
                <Link href="/products">متابعة التسوق</Link>
              </Button>
              <Button
                variant="outline"
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
              <Link href="/cart" className="text-tix-white hover:text-tix-orange-primary">
                العودة للسلة
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-tix-black mb-8">إتمام الطلب</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Customer Information & Delivery */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Information */}
              <Card className="tix-card">
                <CardHeader>
                  <CardTitle className="flex items-center text-tix-black">
                    <User className="h-5 w-5 ml-2" />
                    معلومات العميل
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-tix-black">
                        الاسم الكامل *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                        className="border-tix-gray-light focus:border-tix-blue-primary"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-tix-black">
                        رقم الهاتف *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                        className="border-tix-gray-light focus:border-tix-blue-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-tix-black">
                      البريد الإلكتروني
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="border-tix-gray-light focus:border-tix-blue-primary"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Address */}
              <Card className="tix-card">
                <CardHeader>
                  <CardTitle className="flex items-center text-tix-black">
                    <MapPin className="h-5 w-5 ml-2" />
                    عنوان التوصيل
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="governorate" className="text-tix-black">
                        المحافظة *
                      </Label>
                      <Select
                        value={formData.governorate}
                        onValueChange={(value) => handleInputChange("governorate", value)}
                      >
                        <SelectTrigger className="border-tix-gray-light focus:border-tix-blue-primary">
                          <SelectValue placeholder="اختر المحافظة" />
                        </SelectTrigger>
                        <SelectContent>
                          {governorates.map((gov) => (
                            <SelectItem key={gov} value={gov}>
                              {gov}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="city" className="text-tix-black">
                        المدينة *
                      </Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        required
                        className="border-tix-gray-light focus:border-tix-blue-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-tix-black">
                      العنوان التفصيلي *
                    </Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      required
                      placeholder="الشارع، رقم المبنى، الدور، الشقة"
                      className="border-tix-gray-light focus:border-tix-blue-primary"
                    />
                  </div>
                  <div>
                    <Label htmlFor="notes" className="text-tix-black">
                      ملاحظات إضافية
                    </Label>
                    <Input
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => handleInputChange("notes", e.target.value)}
                      placeholder="أي ملاحظات خاصة بالتوصيل"
                      className="border-tix-gray-light focus:border-tix-blue-primary"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="tix-card">
                <CardHeader>
                  <CardTitle className="flex items-center text-tix-black">
                    <CreditCard className="h-5 w-5 ml-2" />
                    طريقة الدفع
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse p-4 border border-tix-gray-light rounded-lg">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="flex-1 cursor-pointer text-tix-black">
                        <div className="flex items-center">
                          <Truck className="h-5 w-5 ml-2 text-tix-blue-primary" />
                          <div>
                            <p className="font-semibold">الدفع عند الاستلام</p>
                            <p className="text-sm tix-text-secondary">ادفع نقداً عند وصول الطلب</p>
                          </div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse p-4 border border-tix-gray-light rounded-lg">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer text-tix-black">
                        <div className="flex items-center">
                          <CreditCard className="h-5 w-5 ml-2 text-tix-orange-primary" />
                          <div>
                            <p className="font-semibold">الدفع بالبطاقة (OPay)</p>
                            <p className="text-sm tix-text-secondary">دفع آمن عبر OPay Visa</p>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
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
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-tix-black line-clamp-1">{item.name}</p>
                          <p className="text-xs tix-text-secondary">الكمية: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-semibold text-tix-orange-primary">
                          {(item.price * item.quantity).toLocaleString()} جنيه
                        </p>
                      </div>
                    ))}
                  </div>

                  <Separator className="bg-tix-gray-light" />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="tix-text-secondary">المجموع الفرعي:</span>
                      <span className="font-semibold text-tix-black">{total.toLocaleString()} جنيه</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="tix-text-secondary">الشحن:</span>
                      <span className="font-semibold text-green-600">مجاني</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-tix-black">المجموع الكلي:</span>
                      <span className="text-tix-orange-primary">{total.toLocaleString()} جنيه</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full tix-btn-primary"
                    size="lg"
                    disabled={
                      isSubmitting ||
                      !formData.name ||
                      !formData.phone ||
                      !formData.address ||
                      !formData.city ||
                      !formData.governorate
                    }
                  >
                    {isSubmitting ? "جاري المعالجة..." : "تأكيد الطلب"}
                  </Button>

                  <p className="text-xs tix-text-secondary text-center">
                    بالضغط على "تأكيد الطلب" فإنك توافق على شروط الخدمة
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
