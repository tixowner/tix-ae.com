"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertTriangle, FileText, Shield, Store } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function MerchantTerms() {
  const [accepted, setAccepted] = useState(false)

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
                <Link href="/">العودة للرئيسية</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">شروط وأحكام البيع للتجار</h1>
          <p className="text-gray-600">يرجى قراءة هذه الشروط بعناية قبل البدء في البيع على منصة Tix</p>
        </div>

        <div className="space-y-6">
          {/* Warning Card */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <CardTitle className="text-red-800">تنبيه مهم</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-red-700">
                عدم الالتزام بهذه الشروط قد يؤدي إلى فرض غرامات مالية أو اتخاذ إجراءات قانونية ضدك.
              </p>
            </CardContent>
          </Card>

          {/* Terms Cards */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Shield className="h-5 w-5 text-blue-600" />
                <CardTitle>جودة المنتج والتغليف</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">متطلبات الجودة:</h3>
                <ul className="space-y-2 text-blue-700">
                  <li>• يجب أن تكون الخلفية بيضاء في جميع صور المنتجات</li>
                  <li>• جودة المنتج يجب أن تكون ممتازة ومطابقة للوصف</li>
                  <li>• التغليف على مسؤوليتك الكاملة ويجب أن يكون آمناً ومناسباً</li>
                  <li>• يجب ضمان وصول المنتج بحالة ممتازة للعميل</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <FileText className="h-5 w-5 text-green-600" />
                <CardTitle>مصداقية المنتج</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">شروط المصداقية:</h3>
                <ul className="space-y-2 text-green-700">
                  <li>• مصداقية المنتج على مسؤوليتك الكاملة</li>
                  <li>• عدم عرض منتجات بها غش تجاري أو تضليل</li>
                  <li>• يجب أن تكون جميع المعلومات والمواصفات صحيحة ودقيقة</li>
                  <li>• عدم استخدام صور مضللة أو غير حقيقية للمنتج</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Store className="h-5 w-5 text-purple-600" />
                <CardTitle>إدارة المخزون</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">متطلبات المخزون:</h3>
                <ul className="space-y-2 text-purple-700">
                  <li>• الرجاء توفير البضاعة في المتجر أو المحل قبل عرضها</li>
                  <li>• إذا نفدت البضاعة من متجرك أو محلك يجب مسحها فوراً من الموقع</li>
                  <li>• يجب تحديث حالة المخزون بشكل مستمر ودقيق</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200">
            <CardHeader>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <CardTitle className="text-red-800">العقوبات والغرامات</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h3 className="font-semibold text-red-800 mb-2">في حالة المخالفة:</h3>
                <div className="space-y-3 text-red-700">
                  <p className="font-medium">إذا لم يتم مسح منتج غير متوفر في محلك أو متجرك وقام العميل بشرائه:</p>
                  <ul className="space-y-2 mr-4">
                    <li>• سوف تدفع غرامة مالية تحددها إدارة الموقع</li>
                    <li>• قد يتم اللجوء إلى القضاء في حالات التكرار</li>
                    <li>• قد يتم إيقاف حسابك مؤقتاً أو نهائياً</li>
                    <li>• ستتحمل تكاليف الشحن والإرجاع</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>التزامات إضافية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="space-y-2 text-gray-700">
                  <li>• الرد على استفسارات العملاء خلال 24 ساعة</li>
                  <li>• شحن الطلبات خلال 48 ساعة من تأكيد الطلب</li>
                  <li>• قبول الإرجاع والاستبدال حسب سياسة الموقع</li>
                  <li>• الحفاظ على تقييم عالي من العملاء</li>
                  <li>• عدم التلاعب في الأسعار أو المواصفات بعد البيع</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Acceptance */}
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <Checkbox
                  id="accept-terms"
                  checked={accepted}
                  onCheckedChange={(checked) => setAccepted(checked as boolean)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <label htmlFor="accept-terms" className="text-sm font-medium text-gray-900 cursor-pointer">
                    أوافق على جميع الشروط والأحكام المذكورة أعلاه وأتعهد بالالتزام بها بشكل كامل. أدرك أن عدم الالتزام
                    قد يؤدي إلى عقوبات مالية أو قانونية.
                  </label>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-4 rtl:space-x-reverse">
                <Button variant="outline" asChild>
                  <Link href="/merchant/register">العودة</Link>
                </Button>
                <Button disabled={!accepted} asChild>
                  <Link href="/merchant/register">{accepted ? "متابعة التسجيل" : "يجب الموافقة أولاً"}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
