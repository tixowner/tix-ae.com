"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, ShoppingBag, DollarSign, TrendingUp, Eye, Edit, UserX, Package } from "lucide-react"
import Link from "next/link"
import SearchBar from "@/components/search-bar"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const stats = [
    {
      title: "إجمالي المستخدمين",
      value: "12,543",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "إجمالي الطلبات",
      value: "8,921",
      change: "+8%",
      icon: ShoppingBag,
      color: "text-green-600",
    },
    {
      title: "إجمالي المبيعات",
      value: "2,450,000 جنيه",
      change: "+15%",
      icon: DollarSign,
      color: "text-orange-600",
    },
    {
      title: "التجار النشطون",
      value: "1,234",
      change: "+5%",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ]

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "أحمد محمد",
      merchant: "متجر الإلكترونيات",
      amount: "1,299 جنيه",
      status: "مكتمل",
      date: "2024-01-15",
    },
    {
      id: "ORD-002",
      customer: "فاطمة علي",
      merchant: "متجر الأزياء",
      amount: "599 جنيه",
      status: "قيد التوصيل",
      date: "2024-01-15",
    },
    {
      id: "ORD-003",
      customer: "محمد سالم",
      merchant: "متجر الكتب",
      amount: "299 جنيه",
      status: "قيد المعالجة",
      date: "2024-01-14",
    },
    {
      id: "ORD-004",
      customer: "نورا أحمد",
      merchant: "متجر المنزل",
      amount: "899 جنيه",
      status: "ملغي",
      date: "2024-01-14",
    },
  ]

  const merchants = [
    {
      id: 1,
      name: "متجر الإلكترونيات",
      email: "electronics@store.com",
      products: 245,
      sales: "125,000 جنيه",
      status: "نشط",
      approvalStatus: "مقبول",
      joinDate: "2023-06-15",
    },
    {
      id: 2,
      name: "متجر الأزياء",
      email: "fashion@store.com",
      products: 189,
      sales: "89,500 جنيه",
      status: "نشط",
      approvalStatus: "مقبول",
      joinDate: "2023-08-22",
    },
    {
      id: 3,
      name: "متجر الكتب",
      email: "books@store.com",
      products: 567,
      sales: "45,200 جنيه",
      status: "معلق",
      approvalStatus: "قيد المراجعة",
      joinDate: "2023-09-10",
    },
    {
      id: 4,
      name: "متجر المنزل",
      email: "home@store.com",
      products: 123,
      sales: "67,800 جنيه",
      status: "نشط",
      approvalStatus: "مرفوض",
      joinDate: "2023-11-05",
    },
  ]

  const customers = [
    {
      id: 1,
      name: "أحمد محمد",
      email: "ahmed@email.com",
      orders: 15,
      spent: "5,670 جنيه",
      status: "نشط",
      joinDate: "2023-03-15",
    },
    {
      id: 2,
      name: "فاطمة علي",
      email: "fatima@email.com",
      orders: 8,
      spent: "2,340 جنيه",
      status: "نشط",
      joinDate: "2023-07-22",
    },
    {
      id: 3,
      name: "محمد سالم",
      email: "mohammed@email.com",
      orders: 23,
      spent: "8,920 جنيه",
      status: "نشط",
      joinDate: "2023-01-10",
    },
    {
      id: 4,
      name: "نورا أحمد",
      email: "nora@email.com",
      orders: 4,
      spent: "1,250 جنيه",
      status: "معلق",
      joinDate: "2023-12-05",
    },
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      مكتمل: "bg-green-100 text-green-800",
      "قيد التوصيل": "bg-blue-100 text-blue-800",
      "قيد المعالجة": "bg-yellow-100 text-yellow-800",
      ملغي: "bg-red-100 text-red-800",
      نشط: "bg-green-100 text-green-800",
      معلق: "bg-red-100 text-red-800",
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
                Tix Admin
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
          <h1 className="text-3xl font-bold text-gray-900">لوحة تحكم المدير</h1>
          <p className="text-gray-600 mt-2">إدارة شاملة لمنصة Tix</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="orders">الطلبات</TabsTrigger>
            <TabsTrigger value="merchants">التجار</TabsTrigger>
            <TabsTrigger value="customers">العملاء</TabsTrigger>
            <TabsTrigger value="products">المنتجات</TabsTrigger>
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
                <CardDescription>آخر الطلبات المسجلة في النظام</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>رقم الطلب</TableHead>
                      <TableHead>العميل</TableHead>
                      <TableHead>التاجر</TableHead>
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
                        <TableCell>{order.merchant}</TableCell>
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

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>إدارة الطلبات</CardTitle>
                    <CardDescription>عرض وإدارة جميع الطلبات</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <SearchBar
                      onSearch={(query) => console.log("البحث في الطلبات:", query)}
                      placeholder="البحث في الطلبات..."
                      className="w-64"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>رقم الطلب</TableHead>
                      <TableHead>العميل</TableHead>
                      <TableHead>التاجر</TableHead>
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
                        <TableCell>{order.merchant}</TableCell>
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

          <TabsContent value="merchants" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>إدارة التجار</CardTitle>
                    <CardDescription>عرض وإدارة حسابات التجار</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <SearchBar
                      onSearch={(query) => console.log("البحث في التجار:", query)}
                      placeholder="البحث في التجار..."
                      className="w-64"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>اسم المتجر</TableHead>
                      <TableHead>البريد الإلكتروني</TableHead>
                      <TableHead>المنتجات</TableHead>
                      <TableHead>المبيعات</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>حالة الموافقة</TableHead>
                      <TableHead>تاريخ الانضمام</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {merchants.map((merchant) => (
                      <TableRow key={merchant.id}>
                        <TableCell className="font-medium">{merchant.name}</TableCell>
                        <TableCell>{merchant.email}</TableCell>
                        <TableCell>{merchant.products}</TableCell>
                        <TableCell>{merchant.sales}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(merchant.status)}>{merchant.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(merchant.approvalStatus)}>{merchant.approvalStatus}</Badge>
                        </TableCell>
                        <TableCell>{merchant.joinDate}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            {merchant.approvalStatus === "قيد المراجعة" && (
                              <>
                                <Button size="sm" variant="default" className="bg-green-600 hover:bg-green-700">
                                  موافقة
                                </Button>
                                <Button size="sm" variant="destructive">
                                  رفض
                                </Button>
                              </>
                            )}
                            <Button size="sm" variant="ghost">
                              <Eye className="h-4 w-4" />
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

          <TabsContent value="customers" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>إدارة العملاء</CardTitle>
                    <CardDescription>عرض وإدارة حسابات العملاء</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <SearchBar
                      onSearch={(query) => console.log("البحث في العملاء:", query)}
                      placeholder="البحث في العملاء..."
                      className="w-64"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الاسم</TableHead>
                      <TableHead>البريد الإلكتروني</TableHead>
                      <TableHead>الطلبات</TableHead>
                      <TableHead>إجمالي الإنفاق</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>تاريخ التسجيل</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">{customer.name}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>{customer.orders}</TableCell>
                        <TableCell>{customer.spent}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(customer.status)}>{customer.status}</Badge>
                        </TableCell>
                        <TableCell>{customer.joinDate}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <Button size="sm" variant="ghost">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <UserX className="h-4 w-4" />
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

          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>إدارة المنتجات</CardTitle>
                    <CardDescription>عرض ومراجعة جميع المنتجات</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <SearchBar
                      onSearch={(query) => console.log("البحث في المنتجات:", query)}
                      placeholder="البحث في المنتجات..."
                      className="w-64"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">إدارة المنتجات</h3>
                  <p className="text-gray-600">هنا يمكنك مراجعة وإدارة جميع المنتجات المضافة من التجار</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
