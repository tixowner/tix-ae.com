"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ShoppingBag, Heart, MapPin, CreditCard, User, Eye, Star, Truck, Package } from "lucide-react"
import Link from "next/link"
import SearchBar from "@/components/search-bar"

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState("orders")

  const recentOrders = [
    {
      id: "ORD-001",
      items: "هاتف Samsung Galaxy S24 + غطاء حماية",
      total: "15,000 جنيه",
      status: "تم التوصيل",
      date: "2024-01-15",
      merchant: "متجر الإلكترونيات",
      tracking: "TRK123456789",
    },
    {
      id: "ORD-002",
      items: "سماعات AirPods Pro",
      total: "4,500 جنيه",
      status: "قيد التوصيل",
      date: "2024-01-14",
      merchant: "متجر الصوتيات",
      tracking: "TRK987654321",
    },
    {
      id: "ORD-003",
      items: "كتاب البرمجة + دفتر ملاحظات",
      total: "750 جنيه",
      status: "قيد التحضير",
      date: "2024-01-13",
      merchant: "مكتبة المعرفة",
      tracking: "TRK456789123",
    },
  ]

  const wishlistItems = [
    {
      id: 1,
      name: "لابتوب Dell XPS 13",
      price: "25,000 جنيه",
      originalPrice: "30,000 جنيه",
      image: "/placeholder.svg?height=100&width=100",
      merchant: "متجر الكمبيوتر",
      rating: 4.8,
      inStock: true,
    },
    {
      id: 2,
      name: "ساعة Apple Watch Series 9",
      price: "8,000 جنيه",
      originalPrice: "9,500 جنيه",
      image: "/placeholder.svg?height=100&width=100",
      merchant: "متجر الإكسسوارات",
      rating: 4.7,
      inStock: true,
    },
    {
      id: 3,
      name: "كاميرا Canon EOS R6",
      price: "45,000 جنيه",
      originalPrice: "50,000 جنيه",
      image: "/placeholder.svg?height=100&width=100",
      merchant: "متجر التصوير",
      rating: 4.9,
      inStock: false,
    },
  ]

  const addresses = [
    {
      id: 1,
      type: "المنزل",
      name: "أحمد محمد",
      address: "شارع الملك فهد، حي النخيل، الرياض 12345",
      phone: "+20 10 123 4567",
      isDefault: true,
    },
    {
      id: 2,
      type: "العمل",
      name: "أحمد محمد",
      address: "طريق الملك عبدالعزيز، حي الأعمال، الرياض 54321",
      phone: "+20 10 123 4567",
      isDefault: false,
    },
  ]

  const paymentMethods = [
    {
      id: 1,
      type: "بطاقة ائتمان",
      details: "**** **** **** 1234",
      expiry: "12/26",
      isDefault: true,
    },
    {
      id: 2,
      type: "بطاقة مدى",
      details: "**** **** **** 5678",
      expiry: "08/25",
      isDefault: false,
    },
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      "تم التوصيل": "bg-green-100 text-green-800",
      "قيد التوصيل": "bg-blue-100 text-blue-800",
      "قيد التحضير": "bg-yellow-100 text-yellow-800",
      ملغي: "bg-red-100 text-red-800",
    }
    return statusConfig[status as keyof typeof statusConfig] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Link href="/" className="text-2xl font-bold text-orange-600">
                Tix
              </Link>
            </div>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Button variant="outline" asChild>
                <Link href="/">متابعة التسوق</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/auth/login">تسجيل الخروج</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">حسابي</h1>
          <p className="text-gray-600 mt-2">إدارة طلباتك ومعلوماتك الشخصية</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" />
                    <AvatarFallback>أم</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">أحمد محمد</h3>
                    <p className="text-gray-600">عضو منذ يناير 2023</p>
                  </div>
                </div>
                <nav className="space-y-2">
                  <Button
                    variant={activeTab === "orders" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("orders")}
                  >
                    <ShoppingBag className="h-4 w-4 ml-2" />
                    طلباتي
                  </Button>
                  <Button
                    variant={activeTab === "wishlist" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("wishlist")}
                  >
                    <Heart className="h-4 w-4 ml-2" />
                    قائمة الأمنيات
                  </Button>
                  <Button
                    variant={activeTab === "addresses" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("addresses")}
                  >
                    <MapPin className="h-4 w-4 ml-2" />
                    العناوين
                  </Button>
                  <Button
                    variant={activeTab === "payment" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("payment")}
                  >
                    <CreditCard className="h-4 w-4 ml-2" />
                    طرق الدفع
                  </Button>
                  <Button
                    variant={activeTab === "profile" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="h-4 w-4 ml-2" />
                    الملف الشخصي
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "orders" && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>طلباتي</CardTitle>
                      <CardDescription>عرض وتتبع جميع طلباتك</CardDescription>
                    </div>
                    <SearchBar
                      onSearch={(query) => console.log("البحث في الطلبات:", query)}
                      placeholder="البحث في الطلبات..."
                      className="w-64"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold">طلب رقم {order.id}</h3>
                            <p className="text-sm text-gray-600">
                              {order.date} • {order.merchant}
                            </p>
                          </div>
                          <Badge className={getStatusBadge(order.status)}>{order.status}</Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">المنتجات</p>
                            <p className="font-medium">{order.items}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">الإجمالي</p>
                            <p className="font-medium text-orange-600">{order.total}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">رقم التتبع</p>
                            <p className="font-medium">{order.tracking}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            {order.status === "تم التوصيل" && <Truck className="h-4 w-4 text-green-600" />}
                            {order.status === "قيد التوصيل" && <Package className="h-4 w-4 text-blue-600" />}
                            <span className="text-sm text-gray-600">
                              {order.status === "تم التوصيل"
                                ? "تم التوصيل بنجاح"
                                : order.status === "قيد التوصيل"
                                  ? "في الطريق إليك"
                                  : "قيد المعالجة"}
                            </span>
                          </div>
                          <div className="flex space-x-2 rtl:space-x-reverse">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 ml-2" />
                              عرض التفاصيل
                            </Button>
                            {order.status === "تم التوصيل" && (
                              <Button size="sm" variant="outline">
                                إعادة الطلب
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "wishlist" && (
              <Card>
                <CardHeader>
                  <CardTitle>قائمة الأمنيات</CardTitle>
                  <CardDescription>المنتجات المحفوظة للشراء لاحقاً</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {wishlistItems.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4">
                        <div className="flex space-x-4 rtl:space-x-reverse">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-md"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-sm mb-1">{item.name}</h3>
                            <p className="text-xs text-gray-600 mb-2">{item.merchant}</p>
                            <div className="flex items-center mb-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                      i < Math.floor(item.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-gray-600 mr-1">({item.rating})</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="font-bold text-orange-600">{item.price}</span>
                                <span className="text-xs text-gray-500 line-through mr-2">{item.originalPrice}</span>
                              </div>
                              <Badge variant={item.inStock ? "default" : "destructive"}>
                                {item.inStock ? "متوفر" : "نفد المخزون"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2 rtl:space-x-reverse mt-4">
                          <Button size="sm" className="flex-1" disabled={!item.inStock}>
                            أضف للسلة
                          </Button>
                          <Button size="sm" variant="outline">
                            <Heart className="h-4 w-4 fill-current text-red-500" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "addresses" && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>عناويني</CardTitle>
                      <CardDescription>إدارة عناوين التوصيل</CardDescription>
                    </div>
                    <Button>
                      <MapPin className="h-4 w-4 ml-2" />
                      إضافة عنوان جديد
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <div key={address.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <Badge variant="outline">{address.type}</Badge>
                            {address.isDefault && <Badge>العنوان الافتراضي</Badge>}
                          </div>
                          <div className="flex space-x-2 rtl:space-x-reverse">
                            <Button size="sm" variant="outline">
                              تعديل
                            </Button>
                            <Button size="sm" variant="outline">
                              حذف
                            </Button>
                          </div>
                        </div>
                        <h3 className="font-semibold mb-1">{address.name}</h3>
                        <p className="text-gray-600 mb-1">{address.address}</p>
                        <p className="text-gray-600">{address.phone}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "payment" && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>طرق الدفع</CardTitle>
                      <CardDescription>إدارة بطاقاتك وطرق الدفع</CardDescription>
                    </div>
                    <Button>
                      <CreditCard className="h-4 w-4 ml-2" />
                      إضافة بطاقة جديدة
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
                              <CreditCard className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{method.type}</h3>
                              <p className="text-gray-600">{method.details}</p>
                              <p className="text-sm text-gray-500">ينتهي في {method.expiry}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            {method.isDefault && <Badge>الافتراضية</Badge>}
                            <Button size="sm" variant="outline">
                              تعديل
                            </Button>
                            <Button size="sm" variant="outline">
                              حذف
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "profile" && (
              <Card>
                <CardHeader>
                  <CardTitle>الملف الشخصي</CardTitle>
                  <CardDescription>تحديث معلوماتك الشخصية</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="first-name">الاسم الأول</Label>
                      <Input id="first-name" defaultValue="أحمد" />
                    </div>
                    <div>
                      <Label htmlFor="last-name">اسم العائلة</Label>
                      <Input id="last-name" defaultValue="محمد" />
                    </div>
                    <div>
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input id="email" type="email" defaultValue="ahmed@email.com" />
                    </div>
                    <div>
                      <Label htmlFor="phone">رقم الهاتف</Label>
                      <Input id="phone" defaultValue="+20 10 123 4567" />
                    </div>
                    <div>
                      <Label htmlFor="birth-date">تاريخ الميلاد</Label>
                      <Input id="birth-date" type="date" defaultValue="1990-01-01" />
                    </div>
                    <div>
                      <Label htmlFor="gender">الجنس</Label>
                      <select className="w-full p-2 border rounded-md" id="gender">
                        <option value="male">ذكر</option>
                        <option value="female">أنثى</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-4 rtl:space-x-reverse">
                    <Button variant="outline">إلغاء</Button>
                    <Button>حفظ التغييرات</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
