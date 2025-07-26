"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Eye, Lock, Database, UserCheck } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">سياسة الخصوصية</h1>
          <p className="text-gray-600">آخر تحديث: يناير 2024</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Shield className="h-5 w-5 text-blue-600" />
                <CardTitle>التزامنا بخصوصيتك</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                في Tix، نحن ملتزمون بحماية خصوصيتك وأمان بياناتك الشخصية. هذه السياسة توضح كيفية جمعنا واستخدامنا
                وحمايتنا لمعلوماتك الشخصية عند استخدام منصتنا.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Database className="h-5 w-5 text-green-600" />
                <CardTitle>المعلومات التي نجمعها</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">المعلومات الشخصية:</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• الاسم الكامل</li>
                  <li>• عنوان البريد الإلكتروني</li>
                  <li>• رقم الهاتف</li>
                  <li>• العنوان البريدي</li>
                  <li>• تاريخ الميلاد (اختياري)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">معلومات الاستخدام:</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• سجل التصفح والنقرات</li>
                  <li>• المنتجات المفضلة والمشتراة</li>
                  <li>• معلومات الجهاز والمتصفح</li>
                  <li>• عنوان IP والموقع الجغرافي</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Eye className="h-5 w-5 text-purple-600" />
                <CardTitle>كيف نستخدم معلوماتك</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-700">
                <p>نستخدم معلوماتك الشخصية للأغراض التالية:</p>
                <ul className="space-y-1">
                  <li>• معالجة وتنفيذ طلباتك</li>
                  <li>• تقديم خدمة العملاء والدعم الفني</li>
                  <li>• إرسال تحديثات حول طلباتك</li>
                  <li>• تحسين تجربة التسوق وتخصيص المحتوى</li>
                  <li>• إرسال عروض وإشعارات تسويقية (بموافقتك)</li>
                  <li>• منع الاحتيال وضمان أمان المنصة</li>
                  <li>• الامتثال للمتطلبات القانونية</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Lock className="h-5 w-5 text-red-600" />
                <CardTitle>حماية بياناتك</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-700">
                <p>نتخذ إجراءات أمنية صارمة لحماية معلوماتك:</p>
                <ul className="space-y-1">
                  <li>• تشفير SSL لجميع البيانات المنقولة</li>
                  <li>• تشفير قواعد البيانات والملفات المخزنة</li>
                  <li>• مراقبة أمنية على مدار الساعة</li>
                  <li>• وصول محدود للموظفين المخولين فقط</li>
                  <li>• نسخ احتياطية منتظمة ومؤمنة</li>
                  <li>• اختبارات أمنية دورية</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <UserCheck className="h-5 w-5 text-orange-600" />
                <CardTitle>حقوقك في البيانات</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-700">
                <p>لديك الحقوق التالية بخصوص بياناتك الشخصية:</p>
                <ul className="space-y-1">
                  <li>
                    • <strong>الوصول:</strong> طلب نسخة من بياناتك المخزنة لدينا
                  </li>
                  <li>
                    • <strong>التصحيح:</strong> تحديث أو تصحيح معلوماتك
                  </li>
                  <li>
                    • <strong>الحذف:</strong> طلب حذف بياناتك الشخصية
                  </li>
                  <li>
                    • <strong>التقييد:</strong> تقييد معالجة بياناتك
                  </li>
                  <li>
                    • <strong>النقل:</strong> الحصول على بياناتك بصيغة قابلة للقراءة
                  </li>
                  <li>
                    • <strong>الاعتراض:</strong> الاعتراض على معالجة بياناتك لأغراض تسويقية
                  </li>
                </ul>
                <p className="mt-3">
                  لممارسة أي من هذه الحقوق، يرجى التواصل معنا عبر البريد الإلكتروني: privacy@tix.com
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>مشاركة المعلومات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-700">
                <p>لا نبيع أو نؤجر معلوماتك الشخصية لأطراف ثالثة. قد نشارك معلوماتك في الحالات التالية:</p>
                <ul className="space-y-1">
                  <li>
                    • <strong>التجار:</strong> معلومات الطلب والتوصيل للتجار المعنيين
                  </li>
                  <li>
                    • <strong>مقدمو الخدمات:</strong> شركات الشحن والدفع والدعم الفني
                  </li>
                  <li>
                    • <strong>المتطلبات القانونية:</strong> عند الطلب من السلطات المختصة
                  </li>
                  <li>
                    • <strong>حماية الحقوق:</strong> لحماية حقوقنا أو حقوق المستخدمين الآخرين
                  </li>
                </ul>
                <p className="mt-3">جميع الأطراف الثالثة ملزمة بحماية معلوماتك وفقاً لمعايير الخصوصية الصارمة.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ملفات تعريف الارتباط (Cookies)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-700">
                <p>نستخدم ملفات تعريف الارتباط لتحسين تجربتك:</p>
                <ul className="space-y-1">
                  <li>
                    • <strong>ضرورية:</strong> لتشغيل الموقع بشكل صحيح
                  </li>
                  <li>
                    • <strong>وظيفية:</strong> لحفظ تفضيلاتك وإعداداتك
                  </li>
                  <li>
                    • <strong>تحليلية:</strong> لفهم كيفية استخدام الموقع
                  </li>
                  <li>
                    • <strong>تسويقية:</strong> لعرض إعلانات مخصصة (بموافقتك)
                  </li>
                </ul>
                <p className="mt-3">يمكنك إدارة إعدادات ملفات تعريف الارتباط من خلال متصفحك.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>الاحتفاظ بالبيانات</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                نحتفظ بمعلوماتك الشخصية طالما كان حسابك نشطاً أو حسب الحاجة لتقديم خدماتنا. بعد حذف حسابك، قد نحتفظ ببعض
                المعلومات لفترة محدودة للأغراض القانونية والمحاسبية.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>التحديثات على السياسة</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                قد نقوم بتحديث سياسة الخصوصية من وقت لآخر. سنقوم بإشعارك بأي تغييرات جوهرية عبر البريد الإلكتروني أو من
                خلال إشعار بارز على موقعنا.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>التواصل معنا</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-700">
                <p>إذا كان لديك أي استفسارات حول سياسة الخصوصية أو معالجة بياناتك:</p>
                <ul className="mt-3 space-y-1">
                  <li>• البريد الإلكتروني: privacy@tix.com</li>
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
