"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Shield, Users, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">الشروط والأحكام</h1>
          <p className="text-gray-600">آخر تحديث: يناير 2024</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <FileText className="h-5 w-5 text-blue-600" />
                <CardTitle>مقدمة</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                مرحباً بك في منصة Tix. هذه الشروط والأحكام تحكم استخدامك لموقعنا الإلكتروني وخدماتنا. باستخدام موقعنا،
                فإنك توافق على هذه الشروط بالكامل.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Users className="h-5 w-5 text-green-600" />
                <CardTitle>حقوق والتزامات المستخدمين</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">حقوقك:</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• الوصول إلى جميع المنتجات والخدمات المتاحة على المنصة</li>
                  <li>• الحصول على دعم فني وخدمة عملاء عالية الجودة</li>
                  <li>• حماية بياناتك الشخصية وفقاً لسياسة الخصوصية</li>
                  <li>• إرجاع أو استبدال المنتجات وفقاً لسياسة الإرجاع</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">التزاماتك:</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• تقديم معلومات صحيحة ودقيقة عند التسجيل</li>
                  <li>• عدم استخدام المنصة لأغراض غير قانونية</li>
                  <li>• احترام حقوق الملكية الفكرية</li>
                  <li>• عدم محاولة اختراق أو إلحاق الضرر بالمنصة</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Shield className="h-5 w-5 text-purple-600" />
                <CardTitle>سياسة الخصوصية والأمان</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-700">
                <p>نحن ملتزمون بحماية خصوصيتك وأمان بياناتك:</p>
                <ul className="space-y-1">
                  <li>• نجمع المعلومات الضرورية فقط لتقديم خدماتنا</li>
                  <li>• لا نشارك بياناتك مع أطراف ثالثة دون موافقتك</li>
                  <li>• نستخدم تقنيات التشفير المتقدمة لحماية بياناتك</li>
                  <li>• يمكنك طلب حذف أو تعديل بياناتك في أي وقت</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <CardTitle>المسؤولية والضمانات</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-700">
                <p>بخصوص المسؤولية والضمانات:</p>
                <ul className="space-y-1">
                  <li>• نضمن جودة المنتجات المباعة من خلال التجار المعتمدين</li>
                  <li>• لا نتحمل مسؤولية الأضرار الناتجة عن سوء الاستخدام</li>
                  <li>• نوفر ضمان استرداد المال خلال 30 يوم للمنتجات المعيبة</li>
                  <li>• التجار مسؤولون عن دقة أوصاف منتجاتهم</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>الدفع والشحن</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-700">
                <h3 className="font-semibold">طرق الدفع المقبولة:</h3>
                <ul className="space-y-1">
                  <li>• الدفع عند الاستلام</li>
                  <li>• InstaPay</li>
                  <li>• فودافون كاش</li>
                  <li>• البطاقات الائتمانية والمدى</li>
                </ul>

                <h3 className="font-semibold mt-4">سياسة الشحن:</h3>
                <ul className="space-y-1">
                  <li>• الشحن مجاني للطلبات أكثر من 500 جنيه</li>
                  <li>• مدة التوصيل من 2-5 أيام عمل</li>
                  <li>• يمكن تتبع الطلب من خلال رقم التتبع</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>سياسة الإرجاع والاستبدال</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-700">
                <p>يمكنك إرجاع أو استبدال المنتجات في الحالات التالية:</p>
                <ul className="space-y-1">
                  <li>• المنتج معيب أو تالف</li>
                  <li>• المنتج لا يطابق الوصف</li>
                  <li>• وصول منتج خاطئ</li>
                  <li>• عدم الرضا عن المنتج (خلال 14 يوم)</li>
                </ul>

                <p className="mt-3">
                  <strong>شروط الإرجاع:</strong> يجب أن يكون المنتج في حالته الأصلية مع العبوة والملحقات.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>تعديل الشروط</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت. سيتم إشعار المستخدمين بأي تغييرات جوهرية عبر البريد
                الإلكتروني أو من خلال إشعار على الموقع.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>التواصل معنا</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-700">
                <p>إذا كان لديك أي استفسارات حول هذه الشروط والأحكام، يمكنك التواصل معنا:</p>
                <ul className="mt-3 space-y-1">
                  <li>• البريد الإلكتروني: support@tix.com</li>
                  <li>• الهاتف: +20 10 123 4567</li>
                  <li>• العنوان: القاهرة، مصر</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Button asChild>
            <Link href="/auth/register">العودة للتسجيل</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
