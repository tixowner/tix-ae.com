"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  Truck,
  Shield,
  RotateCcw,
  Smartphone,
  Shirt,
  Home,
  Book,
  Gamepad2,
  Car,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { TodaysDeals } from "@/components/todays-deals"
import { CartButton } from "@/components/cart-button"

export default function HomePage() {
  const categories = [
    { name: "إلكترونيات", icon: Smartphone, color: "bg-tix-blue-primary", href: "/products?category=electronics" },
    { name: "أزياء", icon: Shirt, color: "bg-tix-red-primary", href: "/products?category=fashion" },
    { name: "منزل ومطبخ", icon: Home, color: "bg-tix-blue-primary", href: "/products?category=home" },
    { name: "كتب", icon: Book, color: "bg-tix-red-primary", href: "/products?category=books" },
    { name: "ألعاب", icon: Gamepad2, color: "bg-tix-blue-primary", href: "/products?category=games" },
    { name: "سيارات", icon: Car, color: "bg-tix-red-primary", href: "/products?category=cars" },
  ]

  const features = [
    {
      icon: Truck,
      title: "توصيل سريع",
      description: "توصيل مجاني للطلبات أكثر من 500 جنيه",
      color: "text-tix-blue-primary",
    },
    {
      icon: Shield,
      title: "ضمان الجودة",
      description: "جميع المنتجات أصلية ومضمونة",
      color: "text-tix-red-primary",
    },
    {
      icon: RotateCcw,
      title: "إرجاع سهل",
      description: "إمكانية الإرجاع خلال 30 يوم",
      color: "text-tix-blue-primary",
    },
  ]

  return (
    <div className="min-h-screen bg-tix-white">
      {/* Header */}
      <header className="tix-header sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Navigation */}
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

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Input
                  placeholder="ابحث في Tix..."
                  className="w-full pl-10 rtl:pr-10 rtl:pl-4 bg-tix-white border-tix-gray-light focus:border-tix-blue-primary"
                />
                <Search className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 h-4 w-4 text-tix-gray-dark" />
              </div>
            </div>

            {/* User Actions */}
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

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-tix-blue-primary to-tix-orange-primary text-tix-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            مرحباً بك في <span className="text-gradient">Tix</span>
          </h1>
          <p className="text-xl mb-8 text-tix-white/90">
            منصة التجارة الإلكترونية الحقيقية - اكتشف منتجات أصلية من تجار محليين
          </p>
          <div className="flex justify-center space-x-4 rtl:space-x-reverse">
            <Button size="lg" className="tix-btn-primary shadow-tix" asChild>
              <Link href="/products">
                <ShoppingCart className="h-5 w-5 ml-2" />
                تسوق الآن
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-tix-white text-tix-white hover:bg-tix-white hover:text-tix-blue-primary bg-transparent"
              asChild
            >
              <Link href="/merchant/register">انضم كتاجر</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 tix-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-tix-black mb-4">تسوق حسب الفئة</h2>
            <p className="text-lg tix-text-secondary">اكتشف مجموعة واسعة من المنتجات في جميع الفئات</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Link href={category.href} key={index}>
                <Card className="tix-card card-hover cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <category.icon className="h-8 w-8 text-tix-white" />
                    </div>
                    <h3 className="font-semibold text-tix-black group-hover:text-tix-blue-primary transition-colors">
                      {category.name}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Today's Deals */}
      <TodaysDeals />

      {/* Features */}
      <section className="py-16 bg-tix-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-tix-black mb-4">لماذا تختار Tix؟</h2>
            <p className="text-lg tix-text-secondary">نقدم لك أفضل تجربة تسوق إلكتروني</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="tix-card card-hover text-center">
                <CardContent className="p-8">
                  <div
                    className={`${feature.color} w-16 h-16 rounded-full bg-tix-gray-light flex items-center justify-center mx-auto mb-6`}
                  >
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-tix-black mb-4">{feature.title}</h3>
                  <p className="tix-text-secondary">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-tix-gray-light to-tix-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="tix-card p-12 rounded-2xl">
            <Sparkles className="h-16 w-16 text-tix-orange-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-tix-black mb-4">هل أنت تاجر؟ انضم إلى Tix اليوم!</h2>
            <p className="text-lg tix-text-secondary mb-8">ابدأ بيع منتجاتك لآلاف العملاء في جميع أنحاء مصر</p>
            <div className="flex justify-center space-x-4 rtl:space-x-reverse">
              <Button size="lg" className="tix-btn-primary shadow-tix" asChild>
                <Link href="/merchant/register">ابدأ البيع الآن</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-tix-blue-primary text-tix-blue-primary hover:bg-tix-blue-primary hover:text-tix-white bg-transparent"
                asChild
              >
                <Link href="/merchant/terms">اعرف المزيد</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-tix-black text-tix-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-tix-orange-primary mb-4">Tix</h3>
              <p className="tix-text-secondary text-tix-white/70">منصة التجارة الإلكترونية الحقيقية في مصر</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-tix-white">روابط سريعة</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/products" className="text-tix-white/70 hover:text-tix-blue-light transition-colors">
                    المنتجات
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="text-tix-white/70 hover:text-tix-blue-light transition-colors">
                    الفئات
                  </Link>
                </li>
                <li>
                  <Link href="/deals" className="text-tix-white/70 hover:text-tix-blue-light transition-colors">
                    العروض
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-tix-white">للتجار</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/merchant/register"
                    className="text-tix-white/70 hover:text-tix-blue-light transition-colors"
                  >
                    انضم كتاجر
                  </Link>
                </li>
                <li>
                  <Link
                    href="/merchant/terms"
                    className="text-tix-white/70 hover:text-tix-blue-light transition-colors"
                  >
                    شروط البيع
                  </Link>
                </li>
                <li>
                  <Link
                    href="/merchant/support"
                    className="text-tix-white/70 hover:text-tix-blue-light transition-colors"
                  >
                    دعم التجار
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-tix-white">الدعم</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/help" className="text-tix-white/70 hover:text-tix-blue-light transition-colors">
                    مركز المساعدة
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-tix-white/70 hover:text-tix-blue-light transition-colors">
                    اتصل بنا
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-tix-white/70 hover:text-tix-blue-light transition-colors">
                    سياسة الخصوصية
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-tix-gray-dark mt-8 pt-8 text-center">
            <p className="text-tix-white/70">© 2024 Tix. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
