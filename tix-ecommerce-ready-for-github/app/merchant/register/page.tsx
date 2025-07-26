"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Store } from "lucide-react"
import Link from "next/link"

export default function MerchantRegister() {
  const [step, setStep] = useState(1)

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="text-3xl font-bold text-orange-600">
            Tix
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">انضم كتاجر</h2>
          <p className="mt-2 text-gray-600">ابدأ رحلتك في البيع على منصة Tix</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>تسجيل متجر جديد</CardTitle>
                <CardDescription>الخطوة {step} من 3</CardDescription>
              </div>
              <Store className="h-8 w-8 text-orange-600" />
            </div>
            <div className="flex space-x-2 rtl:space-x-reverse">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`flex-1 h-2 rounded-full ${i <= step ? "bg-orange-600" : "bg-gray-200"}`} />
              ))}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">معلومات المتجر الأساسية</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="store-name">اسم المتجر</Label>
                    <Input id="store-name" placeholder="أدخل اسم متجرك" />
                  </div>
                  <div>
                    <Label htmlFor="store-category">فئة المتجر</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر فئة المتجر" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronics">إلكترونيات</SelectItem>
                        <SelectItem value="fashion">أزياء</SelectItem>
                        <SelectItem value="home">منزل ومطبخ</SelectItem>
                        <SelectItem value="books">كتب</SelectItem>
                        <SelectItem value="sports">رياضة</SelectItem>
                        <SelectItem value="beauty">جمال</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="store-description">وصف المتجر</Label>
                  <Textarea
                    id="store-description"
                    placeholder="اكتب وصفاً مختصراً عن متجرك ومنتجاتك"
                    className="min-h-[100px]"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="owner-name">اسم صاحب المتجر</Label>
                    <Input id="owner-name" placeholder="الاسم الكامل" />
                  </div>
                  <div>
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <Input id="phone" placeholder="+20 10 123 4567" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input id="email" type="email" placeholder="store@example.com" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">معلومات العمل والعنوان</h3>
                <div>
                  <Label htmlFor="business-type">نوع النشاط التجاري</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع النشاط" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">فردي</SelectItem>
                      <SelectItem value="company">شركة</SelectItem>
                      <SelectItem value="establishment">مؤسسة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
                <div>
                  <Label htmlFor="address">عنوان المتجر</Label>
                  <Textarea id="address" placeholder="العنوان الكامل للمتجر أو المستودع" className="min-h-[80px]" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">المدينة</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المدينة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cairo">القاهرة</SelectItem>
                        <SelectItem value="giza">الجيزة</SelectItem>
                        <SelectItem value="alexandria">الإسكندرية</SelectItem>
                        <SelectItem value="qalyubia">القليوبية</SelectItem>
                        <SelectItem value="port-said">بورسعيد</SelectItem>
                        <SelectItem value="suez">السويس</SelectItem>
                        <SelectItem value="luxor">الأقصر</SelectItem>
                        <SelectItem value="aswan">أسوان</SelectItem>
                        <SelectItem value="asyut">أسيوط</SelectItem>
                        <SelectItem value="beheira">البحيرة</SelectItem>
                        <SelectItem value="beni-suef">بني سويف</SelectItem>
                        <SelectItem value="dakahlia">الدقهلية</SelectItem>
                        <SelectItem value="damietta">دمياط</SelectItem>
                        <SelectItem value="fayyum">الفيوم</SelectItem>
                        <SelectItem value="gharbia">الغربية</SelectItem>
                        <SelectItem value="ismailia">الإسماعيلية</SelectItem>
                        <SelectItem value="kafr-el-sheikh">كفر الشيخ</SelectItem>
                        <SelectItem value="matrouh">مطروح</SelectItem>
                        <SelectItem value="minya">المنيا</SelectItem>
                        <SelectItem value="monufia">المنوفية</SelectItem>
                        <SelectItem value="new-valley">الوادي الجديد</SelectItem>
                        <SelectItem value="north-sinai">شمال سيناء</SelectItem>
                        <SelectItem value="qena">قنا</SelectItem>
                        <SelectItem value="red-sea">البحر الأحمر</SelectItem>
                        <SelectItem value="sharqia">الشرقية</SelectItem>
                        <SelectItem value="sohag">سوهاج</SelectItem>
                        <SelectItem value="south-sinai">جنوب سيناء</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="postal-code">الرمز البريدي</Label>
                    <Input id="postal-code" placeholder="12345" />
                  </div>
                  <div>
                    <Label htmlFor="country">الدولة</Label>
                    <Select defaultValue="egypt">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="egypt">جمهورية مصر العربية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">الوثائق والمعلومات البنكية</h3>
                <div className="space-y-4">
                  <h4 className="font-semibold">طرق الدفع المتاحة</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="instapay">رقم InstaPay</Label>
                      <Input id="instapay" placeholder="01xxxxxxxxx" />
                    </div>
                    <div>
                      <Label htmlFor="vodafone-cash">رقم فودافون كاش</Label>
                      <Input id="vodafone-cash" placeholder="01xxxxxxxxx" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm">
                    أوافق على{" "}
                    <Link href="/merchant/terms" className="text-orange-600 hover:underline" target="_blank">
                      شروط وأحكام البيع
                    </Link>{" "}
                    و{" "}
                    <Link href="#" className="text-orange-600 hover:underline">
                      سياسة الخصوصية
                    </Link>
                  </Label>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6">
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  السابق
                </Button>
              )}
              <div className="mr-auto">
                {step < 3 ? (
                  <Button onClick={() => setStep(step + 1)}>التالي</Button>
                ) : (
                  <Button asChild>
                    <Link href="/merchant/dashboard">إرسال الطلب</Link>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-gray-600">
            لديك حساب تاجر بالفعل؟{" "}
            <Link href="/auth/login" className="text-orange-600 hover:underline">
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
