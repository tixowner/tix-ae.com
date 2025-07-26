export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  merchant: string
  rating: number
  reviews: number
  stock: number
  condition: "new" | "used"
  status: "active" | "pending" | "rejected"
  createdAt: string
  updatedAt: string
  specifications?: Record<string, string>
  tags: string[]
}

export interface Merchant {
  id: string
  name: string
  email: string
  phone: string
  address: string
  verified: boolean
  rating: number
  totalSales: number
  joinedAt: string
}

export interface Order {
  id: string
  customerId: string
  items: Array<{
    productId: string
    quantity: number
    price: number
  }>
  total: number
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  shippingAddress: {
    name: string
    phone: string
    address: string
    city: string
    governorate: string
  }
  paymentMethod: "cash" | "card"
  createdAt: string
  updatedAt: string
}

class DataManager {
  private products: Product[] = [
    {
      id: "1",
      name: "iPhone 15 Pro Max 256GB",
      description: "أحدث هاتف من آبل بكاميرا احترافية وشاشة Super Retina XDR",
      price: 45000,
      originalPrice: 50000,
      images: ["/placeholder.svg?height=400&width=400&text=iPhone+15+Pro"],
      category: "electronics",
      merchant: "متجر التكنولوجيا المتقدمة",
      rating: 4.8,
      reviews: 156,
      stock: 12,
      condition: "new",
      status: "active",
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z",
      specifications: {
        الشاشة: "6.7 بوصة Super Retina XDR",
        المعالج: "A17 Pro",
        الذاكرة: "256GB",
        الكاميرا: "48MP + 12MP + 12MP",
      },
      tags: ["آيفون", "آبل", "هاتف ذكي", "كاميرا احترافية"],
    },
    {
      id: "2",
      name: "سامسونج Galaxy S24 Ultra",
      description: "هاتف سامسونج الرائد بقلم S Pen وكاميرا 200 ميجابكسل",
      price: 38000,
      originalPrice: 42000,
      images: ["/placeholder.svg?height=400&width=400&text=Galaxy+S24"],
      category: "electronics",
      merchant: "عالم الهواتف الذكية",
      rating: 4.7,
      reviews: 203,
      stock: 8,
      condition: "new",
      status: "active",
      createdAt: "2024-01-14T09:30:00Z",
      updatedAt: "2024-01-14T09:30:00Z",
      specifications: {
        الشاشة: "6.8 بوصة Dynamic AMOLED",
        المعالج: "Snapdragon 8 Gen 3",
        الذاكرة: "256GB",
        الكاميرا: "200MP + 50MP + 12MP + 10MP",
      },
      tags: ["سامسونج", "جالاكسي", "S Pen", "كاميرا عالية الدقة"],
    },
    {
      id: "3",
      name: "فستان صيفي أنيق",
      description: "فستان صيفي مريح من القطن الطبيعي، مناسب للمناسبات اليومية",
      price: 350,
      originalPrice: 500,
      images: ["/placeholder.svg?height=400&width=400&text=Summer+Dress"],
      category: "fashion",
      merchant: "بوتيك الأناقة",
      rating: 4.5,
      reviews: 89,
      stock: 25,
      condition: "new",
      status: "active",
      createdAt: "2024-01-13T14:20:00Z",
      updatedAt: "2024-01-13T14:20:00Z",
      specifications: {
        المادة: "قطن طبيعي 100%",
        "المقاسات المتاحة": "S, M, L, XL",
        الألوان: "أزرق، وردي، أبيض",
      },
      tags: ["فستان", "صيفي", "قطن", "أنيق", "مريح"],
    },
    {
      id: "4",
      name: "حذاء رياضي نايكي Air Max",
      description: "حذاء رياضي مريح للجري والتمارين اليومية",
      price: 1200,
      originalPrice: 1500,
      images: ["/placeholder.svg?height=400&width=400&text=Nike+Air+Max"],
      category: "fashion",
      merchant: "متجر الرياضة الأول",
      rating: 4.6,
      reviews: 134,
      stock: 18,
      condition: "new",
      status: "active",
      createdAt: "2024-01-12T11:45:00Z",
      updatedAt: "2024-01-12T11:45:00Z",
      specifications: {
        المقاسات: "39-45",
        المادة: "جلد صناعي ومواد تقنية",
        النوع: "للجري والتمارين",
      },
      tags: ["نايكي", "حذاء رياضي", "جري", "مريح"],
    },
    {
      id: "5",
      name: "طقم أواني طبخ من الستانلس ستيل",
      description: "طقم أواني طبخ عالي الجودة من الستانلس ستيل، 12 قطعة",
      price: 2500,
      originalPrice: 3200,
      images: ["/placeholder.svg?height=400&width=400&text=Cookware+Set"],
      category: "home",
      merchant: "بيت الأدوات المنزلية",
      rating: 4.4,
      reviews: 67,
      stock: 15,
      condition: "new",
      status: "active",
      createdAt: "2024-01-11T16:30:00Z",
      updatedAt: "2024-01-11T16:30:00Z",
      specifications: {
        المادة: "ستانلس ستيل 304",
        "عدد القطع": "12 قطعة",
        "مناسب للغسالة": "نعم",
      },
      tags: ["أواني طبخ", "ستانلس ستيل", "مطبخ", "عالي الجودة"],
    },
    {
      id: "6",
      name: "كتاب 'فن إدارة الوقت'",
      description: "دليل شامل لتعلم إدارة الوقت وزيادة الإنتاجية",
      price: 120,
      originalPrice: 150,
      images: ["/placeholder.svg?height=400&width=400&text=Time+Management+Book"],
      category: "books",
      merchant: "مكتبة المعرفة",
      rating: 4.7,
      reviews: 245,
      stock: 50,
      condition: "new",
      status: "active",
      createdAt: "2024-01-10T13:15:00Z",
      updatedAt: "2024-01-10T13:15:00Z",
      specifications: {
        "عدد الصفحات": "320 صفحة",
        المؤلف: "د. أحمد محمد",
        "دار النشر": "دار الفكر العربي",
      },
      tags: ["كتاب", "إدارة الوقت", "تطوير الذات", "إنتاجية"],
    },
    {
      id: "7",
      name: "PlayStation 5 Console",
      description: "جهاز ألعاب سوني الجديد بتقنية 4K وسرعة تحميل فائقة",
      price: 18000,
      originalPrice: 20000,
      images: ["/placeholder.svg?height=400&width=400&text=PlayStation+5"],
      category: "games",
      merchant: "عالم الألعاب",
      rating: 4.9,
      reviews: 312,
      stock: 5,
      condition: "new",
      status: "active",
      createdAt: "2024-01-09T10:00:00Z",
      updatedAt: "2024-01-09T10:00:00Z",
      specifications: {
        المعالج: "AMD Zen 2",
        الذاكرة: "16GB GDDR6",
        التخزين: "825GB SSD",
        الدقة: "4K Ultra HD",
      },
      tags: ["بلايستيشن", "ألعاب", "سوني", "4K"],
    },
    {
      id: "8",
      name: "إطارات سيارة ميشلان",
      description: "إطارات عالية الجودة مقاس 205/55 R16 للسيارات الصغيرة",
      price: 1800,
      originalPrice: 2200,
      images: ["/placeholder.svg?height=400&width=400&text=Michelin+Tires"],
      category: "cars",
      merchant: "مركز الإطارات المتخصص",
      rating: 4.6,
      reviews: 78,
      stock: 20,
      condition: "new",
      status: "active",
      createdAt: "2024-01-08T15:45:00Z",
      updatedAt: "2024-01-08T15:45:00Z",
      specifications: {
        المقاس: "205/55 R16",
        الماركة: "ميشلان",
        النوع: "للطرق المختلطة",
      },
      tags: ["إطارات", "ميشلان", "سيارات", "جودة عالية"],
    },
    {
      id: "9",
      name: "كريم مرطب للوجه",
      description: "كريم مرطب طبيعي للوجه مناسب لجميع أنواع البشرة",
      price: 180,
      originalPrice: 250,
      images: ["/placeholder.svg?height=400&width=400&text=Face+Cream"],
      category: "beauty",
      merchant: "صيدلية الجمال",
      rating: 4.3,
      reviews: 156,
      stock: 35,
      condition: "new",
      status: "active",
      createdAt: "2024-01-07T12:30:00Z",
      updatedAt: "2024-01-07T12:30:00Z",
      specifications: {
        الحجم: "50ml",
        النوع: "طبيعي",
        "مناسب لـ": "جميع أنواع البشرة",
      },
      tags: ["كريم", "مرطب", "وجه", "طبيعي", "جمال"],
    },
    {
      id: "10",
      name: "لابتوب Dell XPS 13",
      description: "لابتوب خفيف الوزن بمعالج Intel Core i7 وشاشة عالية الدقة",
      price: 32000,
      originalPrice: 36000,
      images: ["/placeholder.svg?height=400&width=400&text=Dell+XPS+13"],
      category: "electronics",
      merchant: "متجر الكمبيوتر المحترف",
      rating: 4.8,
      reviews: 89,
      stock: 7,
      condition: "new",
      status: "active",
      createdAt: "2024-01-06T09:15:00Z",
      updatedAt: "2024-01-06T09:15:00Z",
      specifications: {
        المعالج: "Intel Core i7-1165G7",
        الذاكرة: "16GB RAM",
        التخزين: "512GB SSD",
        الشاشة: "13.3 بوصة 4K",
      },
      tags: ["لابتوب", "ديل", "خفيف", "عالي الأداء"],
    },
    {
      id: "11",
      name: "قميص قطني كلاسيكي",
      description: "قميص رجالي كلاسيكي من القطن الخالص، مناسب للعمل والمناسبات",
      price: 280,
      originalPrice: 350,
      images: ["/placeholder.svg?height=400&width=400&text=Classic+Shirt"],
      category: "fashion",
      merchant: "متجر الأناقة الرجالية",
      rating: 4.4,
      reviews: 112,
      stock: 30,
      condition: "new",
      status: "active",
      createdAt: "2024-01-05T14:20:00Z",
      updatedAt: "2024-01-05T14:20:00Z",
      specifications: {
        المادة: "قطن خالص",
        المقاسات: "S, M, L, XL, XXL",
        الألوان: "أبيض، أزرق، رمادي",
      },
      tags: ["قميص", "رجالي", "قطن", "كلاسيكي", "عمل"],
    },
    {
      id: "12",
      name: "مكنسة كهربائية ذكية",
      description: "مكنسة كهربائية روبوت ذكية للتنظيف التلقائي",
      price: 4500,
      originalPrice: 5500,
      images: ["/placeholder.svg?height=400&width=400&text=Robot+Vacuum"],
      category: "home",
      merchant: "بيت الأجهزة الذكية",
      rating: 4.5,
      reviews: 67,
      stock: 12,
      condition: "new",
      status: "active",
      createdAt: "2024-01-04T11:00:00Z",
      updatedAt: "2024-01-04T11:00:00Z",
      specifications: {
        النوع: "روبوت ذكي",
        البطارية: "تدوم 120 دقيقة",
        التحكم: "تطبيق الهاتف",
      },
      tags: ["مكنسة", "روبوت", "ذكية", "تنظيف تلقائي"],
    },
    {
      id: "13",
      name: "رواية 'مئة عام من العزلة'",
      description: "رواية كلاسيكية من الأدب العالمي للكاتب غابرييل غارسيا ماركيز",
      price: 95,
      originalPrice: 120,
      images: ["/placeholder.svg?height=400&width=400&text=Classic+Novel"],
      category: "books",
      merchant: "مكتبة الأدب العالمي",
      rating: 4.8,
      reviews: 189,
      stock: 40,
      condition: "new",
      status: "active",
      createdAt: "2024-01-03T16:45:00Z",
      updatedAt: "2024-01-03T16:45:00Z",
      specifications: {
        "عدد الصفحات": "448 صفحة",
        المؤلف: "غابرييل غارسيا ماركيز",
        الترجمة: "صالح علماني",
      },
      tags: ["رواية", "أدب عالمي", "كلاسيكية", "ماركيز"],
    },
    {
      id: "14",
      name: "لعبة FIFA 24",
      description: "أحدث إصدار من لعبة كرة القدم الشهيرة لجهاز PlayStation",
      price: 850,
      originalPrice: 1000,
      images: ["/placeholder.svg?height=400&width=400&text=FIFA+24"],
      category: "games",
      merchant: "متجر الألعاب الرقمية",
      rating: 4.6,
      reviews: 234,
      stock: 25,
      condition: "new",
      status: "active",
      createdAt: "2024-01-02T13:30:00Z",
      updatedAt: "2024-01-02T13:30:00Z",
      specifications: {
        المنصة: "PlayStation 5",
        النوع: "رياضية",
        التقييم: "للجميع",
      },
      tags: ["فيفا", "كرة قدم", "رياضة", "بلايستيشن"],
    },
    {
      id: "15",
      name: "زيت محرك موبيل 1",
      description: "زيت محرك صناعي عالي الجودة 5W-30 للسيارات الحديثة",
      price: 320,
      originalPrice: 400,
      images: ["/placeholder.svg?height=400&width=400&text=Mobil+1+Oil"],
      category: "cars",
      merchant: "مركز خدمة السيارات",
      rating: 4.7,
      reviews: 145,
      stock: 50,
      condition: "new",
      status: "active",
      createdAt: "2024-01-01T10:15:00Z",
      updatedAt: "2024-01-01T10:15:00Z",
      specifications: {
        النوع: "صناعي كامل",
        اللزوجة: "5W-30",
        الحجم: "4 لتر",
      },
      tags: ["زيت محرك", "موبيل", "صناعي", "سيارات"],
    },
    {
      id: "16",
      name: "مجموعة مكياج كاملة",
      description: "مجموعة مكياج شاملة تحتوي على جميع المستلزمات الأساسية",
      price: 650,
      originalPrice: 850,
      images: ["/placeholder.svg?height=400&width=400&text=Makeup+Set"],
      category: "beauty",
      merchant: "عالم التجميل",
      rating: 4.4,
      reviews: 198,
      stock: 22,
      condition: "new",
      status: "active",
      createdAt: "2023-12-31T15:00:00Z",
      updatedAt: "2023-12-31T15:00:00Z",
      specifications: {
        المحتويات: "أحمر شفاه، ظلال عيون، كريم أساس",
        النوع: "للاستخدام اليومي",
        "مناسب لـ": "جميع أنواع البشرة",
      },
      tags: ["مكياج", "تجميل", "مجموعة كاملة", "جمال"],
    },
  ]

  private merchants: Merchant[] = [
    {
      id: "1",
      name: "متجر التكنولوجيا المتقدمة",
      email: "tech@example.com",
      phone: "01234567890",
      address: "شارع التحرير، القاهرة",
      verified: true,
      rating: 4.8,
      totalSales: 1250000,
      joinedAt: "2023-01-15T10:00:00Z",
    },
    {
      id: "2",
      name: "عالم الهواتف الذكية",
      email: "phones@example.com",
      phone: "01234567891",
      address: "شارع الجمهورية، الإسكندرية",
      verified: true,
      rating: 4.7,
      totalSales: 980000,
      joinedAt: "2023-02-20T09:30:00Z",
    },
  ]

  private orders: Order[] = []

  // Products methods
  getProducts(): Product[] {
    return [...this.products]
  }

  getProductById(id: string): Product | undefined {
    return this.products.find((product) => product.id === id)
  }

  getProductsByCategory(category: string): Product[] {
    return this.products.filter((product) => product.category === category && product.status === "active")
  }

  getProductsByMerchant(merchantName: string): Product[] {
    return this.products.filter((product) => product.merchant === merchantName && product.status === "active")
  }

  getTodaysDeals(limit = 8): Product[] {
    // إرجاع المنتجات التي لها خصم (originalPrice موجود)
    const dealsProducts = this.products.filter(
      (product) => product.originalPrice && product.originalPrice > product.price && product.status === "active",
    )

    // ترتيب حسب نسبة الخصم (الأعلى أولاً)
    dealsProducts.sort((a, b) => {
      const discountA = a.originalPrice ? ((a.originalPrice - a.price) / a.originalPrice) * 100 : 0
      const discountB = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) * 100 : 0
      return discountB - discountA
    })

    return dealsProducts.slice(0, limit)
  }

  getSimilarProducts(productId: string, limit = 4): Product[] {
    const product = this.getProductById(productId)
    if (!product) return []

    // البحث عن منتجات مشابهة بناءً على الفئة والتاجر والسعر
    const similarProducts = this.products.filter((p) => {
      if (p.id === productId || p.status !== "active") return false

      // نقاط التشابه
      let similarity = 0

      // نفس الفئة (أولوية عالية)
      if (p.category === product.category) similarity += 3

      // نفس التاجر (أولوية متوسطة)
      if (p.merchant === product.merchant) similarity += 2

      // نطاق سعري مشابه (أولوية منخفضة)
      const priceDiff = Math.abs(p.price - product.price) / product.price
      if (priceDiff < 0.5) similarity += 1 // فرق أقل من 50%

      return similarity > 0
    })

    // ترتيب حسب التشابه ثم التقييم
    similarProducts.sort((a, b) => {
      let similarityA = 0
      let similarityB = 0

      if (a.category === product.category) similarityA += 3
      if (a.merchant === product.merchant) similarityA += 2
      if (Math.abs(a.price - product.price) / product.price < 0.5) similarityA += 1

      if (b.category === product.category) similarityB += 3
      if (b.merchant === product.merchant) similarityB += 2
      if (Math.abs(b.price - product.price) / product.price < 0.5) similarityB += 1

      if (similarityA !== similarityB) return similarityB - similarityA
      return b.rating - a.rating
    })

    return similarProducts.slice(0, limit)
  }

  searchProducts(query: string): Product[] {
    const lowercaseQuery = query.toLowerCase()
    return this.products.filter(
      (product) =>
        product.status === "active" &&
        (product.name.toLowerCase().includes(lowercaseQuery) ||
          product.description.toLowerCase().includes(lowercaseQuery) ||
          product.merchant.toLowerCase().includes(lowercaseQuery) ||
          product.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))),
    )
  }

  addProduct(product: Omit<Product, "id" | "createdAt" | "updatedAt">): Product {
    const newProduct: Product = {
      ...product,
      id: (this.products.length + 1).toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    this.products.push(newProduct)
    return newProduct
  }

  updateProduct(id: string, updates: Partial<Product>): Product | null {
    const index = this.products.findIndex((product) => product.id === id)
    if (index === -1) return null

    this.products[index] = {
      ...this.products[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    return this.products[index]
  }

  deleteProduct(id: string): boolean {
    const index = this.products.findIndex((product) => product.id === id)
    if (index === -1) return false

    this.products.splice(index, 1)
    return true
  }

  // Merchants methods
  getMerchants(): Merchant[] {
    return [...this.merchants]
  }

  getMerchantById(id: string): Merchant | undefined {
    return this.merchants.find((merchant) => merchant.id === id)
  }

  addMerchant(merchant: Omit<Merchant, "id" | "joinedAt">): Merchant {
    const newMerchant: Merchant = {
      ...merchant,
      id: (this.merchants.length + 1).toString(),
      joinedAt: new Date().toISOString(),
    }
    this.merchants.push(newMerchant)
    return newMerchant
  }

  // Orders methods
  getOrders(): Order[] {
    return [...this.orders]
  }

  getOrderById(id: string): Order | undefined {
    return this.orders.find((order) => order.id === id)
  }

  addOrder(order: Omit<Order, "id" | "createdAt" | "updatedAt">): Order {
    const newOrder: Order = {
      ...order,
      id: (this.orders.length + 1).toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    this.orders.push(newOrder)
    return newOrder
  }

  updateOrderStatus(id: string, status: Order["status"]): Order | null {
    const index = this.orders.findIndex((order) => order.id === id)
    if (index === -1) return null

    this.orders[index] = {
      ...this.orders[index],
      status,
      updatedAt: new Date().toISOString(),
    }
    return this.orders[index]
  }

  // Statistics methods
  getStats() {
    const totalProducts = this.products.length
    const activeProducts = this.products.filter((p) => p.status === "active").length
    const totalMerchants = this.merchants.length
    const verifiedMerchants = this.merchants.filter((m) => m.verified).length
    const totalOrders = this.orders.length
    const totalRevenue = this.orders.reduce((sum, order) => sum + order.total, 0)

    return {
      products: {
        total: totalProducts,
        active: activeProducts,
        pending: this.products.filter((p) => p.status === "pending").length,
        rejected: this.products.filter((p) => p.status === "rejected").length,
      },
      merchants: {
        total: totalMerchants,
        verified: verifiedMerchants,
        unverified: totalMerchants - verifiedMerchants,
      },
      orders: {
        total: totalOrders,
        pending: this.orders.filter((o) => o.status === "pending").length,
        confirmed: this.orders.filter((o) => o.status === "confirmed").length,
        shipped: this.orders.filter((o) => o.status === "shipped").length,
        delivered: this.orders.filter((o) => o.status === "delivered").length,
        cancelled: this.orders.filter((o) => o.status === "cancelled").length,
      },
      revenue: {
        total: totalRevenue,
        thisMonth: this.orders
          .filter((order) => {
            const orderDate = new Date(order.createdAt)
            const now = new Date()
            return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear()
          })
          .reduce((sum, order) => sum + order.total, 0),
      },
    }
  }
}

// إنشاء instance واحد للاستخدام في جميع أنحاء التطبيق
export const dataManager = new DataManager()
