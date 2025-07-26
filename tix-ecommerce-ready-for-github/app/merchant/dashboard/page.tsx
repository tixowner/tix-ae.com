"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, DollarSign, ShoppingCart, TrendingUp, Plus, Search, Edit, Trash2, Eye, Upload } from "lucide-react"
import Link from "next/link"
import SearchBar from "@/components/search-bar"

export default function MerchantDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [productCondition, setProductCondition] = useState("new")

  const stats = [
    {
      title: "إجمالي المنتجات",
      value: "245",
      change: "+12",
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "الطلبات الجديدة",
      value: "18",
      change: "+3",
      icon: ShoppingCart,
      color: "text-green-600",
    },
    {
      title: "إجمالي المبيعات",
      value: "125,000 جنيه",
      change: "+15%",
      icon: DollarSign,
      color: "text-orange-600",
    },
    {
      title: "معدل النمو",
      value: "23%",
      change: "+5%",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ]

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "أحمد محمد",
      product: "هاتف Samsung Galaxy",
      amount: "15,000 جنيه",
      status: "جديد",
      date: "2024-01-15",
    },
    {
      id: "ORD-002",
      customer: "فاطمة علي",
      product: "سماعات AirPods",
      amount: "4,500 جنيه",
      status: "قيد التحضير",
      date: "2024-01-15",
    },
    {
      id: "ORD-003",
      customer: "محمد سالم",
      product: "لابتوب Dell",
      amount: "25,000 جنيه",
      status: "تم الشحن",
      date: "2024-01-14",
    },
    {
      id: "ORD-004",
      customer: "نورا أحمد",
      product: "ساعة Apple Watch",
      amount: "8,000 جنيه",
      status: "مكتمل",
      date: "2024-01-14",
    },
  ]

  const products = [
    {
      id: 1,
      name: "هاتف Samsung Galaxy S24 Ultra 512GB",
      category: "إلكترونيات",
      price: "28,000 جنيه",
      stock: 15,
      status: "نشط",
      sales: 89,
      condition: "جديد",
    },
    {
      id: 2,
      name: "سماعات Apple AirPods Pro الجيل الثاني",
      category: "إلكترونيات",
      price: "6,500 جنيه",
      stock: 32,
      status: "نشط",
      sales: 156,
      condition: "جديد",
    },
    {
      id: 3,
      name: "لابتوب Dell XPS 13 - Intel Core i7",
      category: "كمبيوتر",
      price: "35,000 جنيه",
      stock: 8,
      status: "نشط",
      sales: 23,
      condition: "جديد",
    },
    {
      id: 4,
      name: "ساعة Apple Watch Series 9 GPS 45mm",
      category: "إكسسوارات",
      price: "12,000 جنيه",
      stock: 0,
      status: "نفد المخزون",
      sales: 67,
      condition: "جديد",
    },
    {
      id: 5,
      name: "تلفزيون Samsung 55 بوصة 4K QLED",
      category: "إلكترونيات",
      price: "18,000 جنيه",
      stock: 5,
      status: "نشط",
      sales: 34,
      condition: "جديد",
    },
    {
      id: 6,
      name: "PlayStation 5 Console",
      category: "ألعاب",
      price: "16,000 جنيه",
      stock: 12,
      status: "نشط",
      sales: 78,
      condition: "جديد",
    },
    {
      id: 7,
      name: "كاميرا Canon EOS R6 Mark II",
      category: "كاميرات",
      price: "45,000 جنيه",
      stock: 3,
      status: "نشط",
      sales: 12,
      condition: "جديد",
    },
    {
      id: 8,
      name: "ساعة Rolex Submariner (طبق الأصل)",
      category: "إكسسوارات",
      price: "2,500 جنيه",
      stock: 25,
      status: "نشط",
      sales: 45,
      condition: "استيراد",
    },
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      جديد: "bg-blue-100 text-blue-800",
      "قيد التحضير": "bg-yellow-100 text-yellow-800",
      "تم الشحن": "bg-green-100 text-green-800",
      مكتمل: "bg-green-100 text-green-800",
      نشط: "bg-green-100 text-green-800",
      "نفد المخزون": "bg-red-100 text-red-800",
    }
    return statusConfig[status as keyof typeof statusConfig] || "bg-gray-100 text-gray-800"
  }

  const getCategorySpecs = (category: string) => {
    switch (category) {
      case "electronics":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="brand">الماركة</Label>
              <Input id="brand" placeholder="Samsung, Apple, Huawei..." />
            </div>
            <div>
              <Label htmlFor="model">الموديل</Label>
              <Input id="model" placeholder="Galaxy S24, iPhone 15..." />
            </div>
            <div>
              <Label htmlFor="ram">الذاكرة العشوائية (RAM)</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر سعة الرام" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4gb">4 جيجابايت</SelectItem>
                  <SelectItem value="6gb">6 جيجابايت</SelectItem>
                  <SelectItem value="8gb">8 جيجابايت</SelectItem>
                  <SelectItem value="12gb">12 جيجابايت</SelectItem>
                  <SelectItem value="16gb">16 جيجابايت</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="storage">مساحة التخزين</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر مساحة التخزين" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="64gb">64 جيجابايت</SelectItem>
                  <SelectItem value="128gb">128 جيجابايت</SelectItem>
                  <SelectItem value="256gb">256 جيجابايت</SelectItem>
                  <SelectItem value="512gb">512 جيجابايت</SelectItem>
                  <SelectItem value="1tb">1 تيرابايت</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="screen-size">حجم الشاشة</Label>
              <Input id="screen-size" placeholder="6.1 بوصة" />
            </div>
            <div>
              <Label htmlFor="battery">سعة البطارية</Label>
              <Input id="battery" placeholder="4000 مللي أمبير" />
            </div>
            <div>
              <Label htmlFor="color">اللون</Label>
              <Input id="color" placeholder="أسود، أبيض، أزرق..." />
            </div>
            <div>
              <Label htmlFor="warranty">فترة الضمان</Label>
              <Select>
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
              <Input id="brand" placeholder="Nike, Adidas, Zara..." />
            </div>
            <div>
              <Label htmlFor="size">المقاس</Label>
              <Select>
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
              <Input id="color" placeholder="أحمر، أزرق، أسود..." />
            </div>
            <div>
              <Label htmlFor="material">الخامة</Label>
              <Input id="material" placeholder="قطن، بوليستر، حرير..." />
            </div>
            <div>
              <Label htmlFor="gender">الجنس</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الفئة المستهدفة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="men">رجالي</SelectItem>
                  <SelectItem value="women">نسائي</SelectItem>
                  <SelectItem value="kids">أطفال</SelectItem>
                  <SelectItem value="unisex">للجنسين</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="season">الموسم</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الموسم" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summer">صيفي</SelectItem>
                  <SelectItem value="winter">شتوي</SelectItem>
                  <SelectItem value="spring">ربيعي</SelectItem>
                  <SelectItem value="autumn">خريفي</SelectItem>
                  <SelectItem value="all-season">جميع المواسم</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      case "home":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="brand">الماركة</Label>
              <Input id="brand" placeholder="IKEA, Home Centre..." />
            </div>
            <div>
              <Label htmlFor="material">الخامة</Label>
              <Input id="material" placeholder="خشب، معدن، بلاستيك..." />
            </div>
            <div>
              <Label htmlFor="dimensions">الأبعاد</Label>
              <Input id="dimensions" placeholder="الطول × العرض × الارتفاع (سم)" />
            </div>
            <div>
              <Label htmlFor="weight">الوزن</Label>
              <Input id="weight" placeholder="الوزن بالكيلوجرام" />
            </div>
            <div>
              <Label htmlFor="color">اللون</Label>
              <Input id="color" placeholder="بني، أبيض، أسود..." />
            </div>
            <div>
              <Label htmlFor="room">الغرفة</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الغرفة المناسبة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="living-room">غرفة المعيشة</SelectItem>
                  <SelectItem value="bedroom">غرفة النوم</SelectItem>
                  <SelectItem value="kitchen">المطبخ</SelectItem>
                  <SelectItem value="bathroom">الحمام</SelectItem>
                  <SelectItem value="dining-room">غرفة الطعام</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      case "books":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="author">المؤلف</Label>
              <Input id="author" placeholder="اسم المؤلف" />
            </div>
            <div>
              <Label htmlFor="publisher">دار النشر</Label>
              <Input id="publisher" placeholder="اسم دار النشر" />
            </div>
            <div>
              <Label htmlFor="isbn">رقم ISBN</Label>
              <Input id="isbn" placeholder="978-xxx-xxx-xxx-x" />
            </div>
            <div>
              <Label htmlFor="pages">عدد الصفحات</Label>
              <Input id="pages" type="number" placeholder="عدد الصفحات" />
            </div>
            <div>
              <Label htmlFor="language">اللغة</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر اللغة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="arabic">العربية</SelectItem>
                  <SelectItem value="english">الإنجليزية</SelectItem>
                  <SelectItem value="french">الفرنسية</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="publication-year">سنة النشر</Label>
              <Input id="publication-year" type="number" placeholder="2024" />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Link href="/" className="text-2xl font-bold text-orange-600">
                Tix Merchant
              </Link>
            </div>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Button variant="outline" asChild>
                <Link href="/">عرض الموقع</Link>
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
          <h1 className="text-3xl font-bold text-gray-900">لوحة تحكم التاجر</h1>
          <p className="text-gray-600 mt-2">إدارة متجرك ومنتجاتك</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="products">المنتجات</TabsTrigger>
            <TabsTrigger value="orders">الطلبات</TabsTrigger>
            <TabsTrigger value="add-product">إضافة منتج</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-sm text-green-600">{stat.change} من الشهر الماضي</p>
                      </div>
                      <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                        <stat.icon className="h-6 w-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>الطلبات الأخيرة</CardTitle>
                <CardDescription>آخر الطلبات على منتجاتك</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>رقم الطلب</TableHead>
                      <TableHead>العميل</TableHead>
                      <TableHead>المنتج</TableHead>
                      <TableHead>المبلغ</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>التاريخ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.product}</TableCell>
                        <TableCell>{order.amount}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(order.status)}>{order.status}</Badge>
                        </TableCell>
                        <TableCell>{order.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>إدارة المنتجات</CardTitle>
                    <CardDescription>عرض وإدارة منتجاتك</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="relative">
                      <SearchBar
                        onSearch={(query) => {
                          // تطبيق البحث على المنتجات
                          console.log("البحث عن:", query)
                        }}
                        placeholder="البحث في المنتجات..."
                        className="w-64"
                      />
                    </div>
                    <Button asChild>
                      <Link href="/merchant/products/add">
                        <Plus className="h-4 w-4 ml-2" />
                        إضافة منتج
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>اسم المنتج</TableHead>
                      <TableHead>الفئة</TableHead>
                      <TableHead>السعر</TableHead>
                      <TableHead>المخزون</TableHead>
                      <TableHead>المبيعات</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>{product.sales}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(product.status)}>{product.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <Button size="sm" variant="ghost">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>إدارة الطلبات</CardTitle>
                    <CardDescription>عرض وإدارة جميع الطلبات</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="relative">
                      <Search className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input placeholder="البحث في الطلبات..." className="pl-10 rtl:pr-10 rtl:pl-4" />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>رقم الطلب</TableHead>
                      <TableHead>العميل</TableHead>
                      <TableHead>المنتج</TableHead>
                      <TableHead>المبلغ</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>التاريخ</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.product}</TableCell>
                        <TableCell>{order.amount}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(order.status)}>{order.status}</Badge>
                        </TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <Button size="sm" variant="ghost">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add-product" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إضافة منتج جديد</CardTitle>
                <CardDescription>استخدم الصفحة المخصصة لإضافة المنتجات بسهولة</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">إضافة منتج جديد</h3>
                <p className="text-gray-600 mb-6">
                  استخدم صفحة إضافة المنتجات المتقدمة مع إمكانية رفع الصور ومعاينة المنتج
                </p>
                <Button asChild size="lg">
                  <Link href="/merchant/products/add">
                    <Plus className="h-5 w-5 ml-2" />
                    إضافة منتج جديد
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
