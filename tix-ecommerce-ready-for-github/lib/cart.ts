export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  merchant: string
  stock: number
}

class CartManager {
  private items: CartItem[] = []
  private listeners: Array<() => void> = []

  addItem(product: any, quantity = 1): void {
    const existingItemIndex = this.items.findIndex((item) => item.id === product.id)

    if (existingItemIndex >= 0) {
      // إذا كان المنتج موجود، زيادة الكمية
      const existingItem = this.items[existingItemIndex]
      const newQuantity = existingItem.quantity + quantity

      // التأكد من عدم تجاوز المخزون
      if (newQuantity <= product.stock) {
        this.items[existingItemIndex].quantity = newQuantity
      } else {
        this.items[existingItemIndex].quantity = product.stock
      }
    } else {
      // إضافة منتج جديد
      const cartItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: Math.min(quantity, product.stock),
        image: product.images[0] || "/placeholder.svg?height=100&width=100",
        merchant: product.merchant,
        stock: product.stock,
      }
      this.items.push(cartItem)
    }

    this.notifyListeners()
    this.saveToStorage()
  }

  removeItem(productId: string): void {
    this.items = this.items.filter((item) => item.id !== productId)
    this.notifyListeners()
    this.saveToStorage()
  }

  updateQuantity(productId: string, quantity: number): void {
    const itemIndex = this.items.findIndex((item) => item.id === productId)
    if (itemIndex >= 0) {
      if (quantity <= 0) {
        this.removeItem(productId)
      } else {
        // التأكد من عدم تجاوز المخزون
        this.items[itemIndex].quantity = Math.min(quantity, this.items[itemIndex].stock)
        this.notifyListeners()
        this.saveToStorage()
      }
    }
  }

  getItems(): CartItem[] {
    return [...this.items]
  }

  getItemCount(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0)
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  clearCart(): void {
    this.items = []
    this.notifyListeners()
    this.saveToStorage()
  }

  subscribe(listener: () => void): () => void {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener())
  }

  private saveToStorage(): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("tix-cart", JSON.stringify(this.items))
    }
  }

  loadFromStorage(): void {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("tix-cart")
      if (saved) {
        try {
          this.items = JSON.parse(saved)
          this.notifyListeners()
        } catch (error) {
          console.error("Error loading cart from storage:", error)
          this.items = []
        }
      }
    }
  }
}

// إنشاء instance واحد للاستخدام في جميع أنحاء التطبيق
export const cartManager = new CartManager()
