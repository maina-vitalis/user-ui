// ─── Order Types ────────────────────────────────────────────────────────────

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export interface OrderItem {
  id: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: OrderItem[];
  trackingNumber?: string;
}

// ─── Wishlist Types ──────────────────────────────────────────────────────────

export interface WishlistProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  inStock: boolean;
  category: string;
}

// ─── Address Types ───────────────────────────────────────────────────────────

export interface Address {
  id: string;
  label: string;
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

// ─── Review Types ────────────────────────────────────────────────────────────

export interface Review {
  id: string;
  productName: string;
  productImage: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  helpful: number;
}

// ─── Notification Types ──────────────────────────────────────────────────────

export type NotificationType =
  | "order"
  | "delivery"
  | "promo"
  | "refund"
  | "review"
  | "system";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

// ─── Stats Types ─────────────────────────────────────────────────────────────

export interface StatCard {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: string;
  color: "blue" | "green" | "purple" | "orange";
}

export interface SpendingDataPoint {
  month: string;
  spending: number;
  orders: number;
}

// ─── Mock Data ───────────────────────────────────────────────────────────────

export const MOCK_ORDERS: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-8821",
    date: "2024-12-18",
    total: 249.99,
    status: "delivered",
    trackingNumber: "TRK9921873AA",
    items: [
      {
        id: "i1",
        productName: "Sony WH-1000XM5 Headphones",
        productImage:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop",
        quantity: 1,
        price: 249.99,
      },
    ],
  },
  {
    id: "2",
    orderNumber: "ORD-2024-8754",
    date: "2024-12-10",
    total: 89.5,
    status: "shipped",
    trackingNumber: "TRK8810562BB",
    items: [
      {
        id: "i2",
        productName: "Nike Air Max 270",
        productImage:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop",
        quantity: 1,
        price: 89.5,
      },
    ],
  },
  {
    id: "3",
    orderNumber: "ORD-2024-8631",
    date: "2024-11-28",
    total: 34.99,
    status: "delivered",
    items: [
      {
        id: "i3",
        productName: "Mechanical Keyboard Switch Pack",
        productImage:
          "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=80&h=80&fit=crop",
        quantity: 2,
        price: 17.5,
      },
    ],
  },
  {
    id: "4",
    orderNumber: "ORD-2024-8502",
    date: "2024-11-15",
    total: 599.0,
    status: "delivered",
    items: [
      {
        id: "i4",
        productName: "iPad Air 11-inch (M2)",
        productImage:
          "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=80&h=80&fit=crop",
        quantity: 1,
        price: 599.0,
      },
    ],
  },
  {
    id: "5",
    orderNumber: "ORD-2024-8390",
    date: "2024-11-02",
    total: 129.0,
    status: "cancelled",
    items: [
      {
        id: "i5",
        productName: "Instant Pot Duo 7-in-1",
        productImage:
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=80&h=80&fit=crop",
        quantity: 1,
        price: 129.0,
      },
    ],
  },
  {
    id: "6",
    orderNumber: "ORD-2024-9012",
    date: "2025-01-05",
    total: 45.8,
    status: "processing",
    items: [
      {
        id: "i6",
        productName: "Kindle Paperwhite Case",
        productImage:
          "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=80&h=80&fit=crop",
        quantity: 1,
        price: 45.8,
      },
    ],
  },
  {
    id: "7",
    orderNumber: "ORD-2025-9144",
    date: "2025-01-10",
    total: 22.0,
    status: "pending",
    items: [
      {
        id: "i7",
        productName: "USB-C Hub 7-Port",
        productImage:
          "https://images.unsplash.com/photo-1589739900266-43b2843f4c12?w=80&h=80&fit=crop",
        quantity: 1,
        price: 22.0,
      },
    ],
  },
];

export const MOCK_WISHLIST: WishlistProduct[] = [
  {
    id: "w1",
    name: 'Samsung 27" 4K Monitor',
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a573d5f5a7?w=300&h=200&fit=crop",
    price: 379.99,
    originalPrice: 499.99,
    rating: 4.7,
    reviews: 892,
    inStock: true,
    category: "Electronics",
  },
  {
    id: "w2",
    name: "Logitech MX Master 3S Mouse",
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop",
    price: 99.99,
    rating: 4.9,
    reviews: 2341,
    inStock: true,
    category: "Accessories",
  },
  {
    id: "w3",
    name: "Patagonia Better Sweater Jacket",
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=300&h=200&fit=crop",
    price: 148.0,
    originalPrice: 165.0,
    rating: 4.6,
    reviews: 541,
    inStock: false,
    category: "Clothing",
  },
  {
    id: "w4",
    name: "Anker 65W GaN Charger",
    image:
      "https://images.unsplash.com/photo-1583394293253-f451cce0e6c9?w=300&h=200&fit=crop",
    price: 35.99,
    rating: 4.8,
    reviews: 3101,
    inStock: true,
    category: "Accessories",
  },
  {
    id: "w5",
    name: "Dyson V15 Detect Vacuum",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
    price: 699.99,
    originalPrice: 749.99,
    rating: 4.7,
    reviews: 1203,
    inStock: true,
    category: "Home",
  },
  {
    id: "w6",
    name: "Thule Crossover 2 Backpack 30L",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop",
    price: 134.95,
    rating: 4.5,
    reviews: 789,
    inStock: true,
    category: "Bags",
  },
];

export const MOCK_ADDRESSES: Address[] = [
  {
    id: "a1",
    label: "Home",
    fullName: "Vitalis Maina",
    line1: "42 Riverside Drive",
    line2: "Apt 5B",
    city: "Nairobi",
    state: "Nairobi County",
    postalCode: "00100",
    country: "Kenya",
    phone: "+254 712 345 678",
    isDefault: true,
  },
  {
    id: "a2",
    label: "Work",
    fullName: "Vitalis Maina",
    line1: "Westlands Business Park",
    line2: "3rd Floor, Suite 301",
    city: "Nairobi",
    state: "Nairobi County",
    postalCode: "00800",
    country: "Kenya",
    phone: "+254 712 345 678",
    isDefault: false,
  },
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: "r1",
    productName: "Sony WH-1000XM5 Headphones",
    productImage:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop",
    rating: 5,
    title: "Best noise-cancelling headphones I've ever owned",
    body: "The sound quality is phenomenal. The ANC is class-leading and the comfort for long sessions is unbeatable. Battery life of 30 hours is more than adequate. Highly recommend!",
    date: "2024-12-20",
    helpful: 42,
  },
  {
    id: "r2",
    productName: "Nike Air Max 270",
    productImage:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop",
    rating: 4,
    title: "Great everyday sneakers, runs slightly large",
    body: "Very comfortable for all-day wear. The Air Max cushioning is genuinely impressive. I'd recommend sizing down half a size as they run a bit large.",
    date: "2024-12-14",
    helpful: 18,
  },
  {
    id: "r3",
    productName: "iPad Air 11-inch (M2)",
    productImage:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=80&h=80&fit=crop",
    rating: 5,
    title: "Incredible performance for creative work",
    body: "The M2 chip handles everything I throw at it — video editing, Procreate, coding. The display is gorgeous and the Apple Pencil Pro integration is seamless.",
    date: "2024-11-20",
    helpful: 67,
  },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    type: "delivery",
    title: "Your order has been delivered!",
    message:
      "Order #ORD-2024-8821 (Sony WH-1000XM5) was delivered successfully.",
    timestamp: "2024-12-18T14:32:00Z",
    read: false,
  },
  {
    id: "n2",
    type: "order",
    title: "Order shipped",
    message:
      "Order #ORD-2024-8754 has been shipped. Tracking: TRK8810562BB.",
    timestamp: "2024-12-11T09:15:00Z",
    read: false,
  },
  {
    id: "n3",
    type: "promo",
    title: "Flash Sale — 40% off Electronics!",
    message:
      "For the next 24 hours, enjoy 40% off on all electronics. Use code FLASH40.",
    timestamp: "2025-01-09T08:00:00Z",
    read: true,
  },
  {
    id: "n4",
    type: "review",
    title: "Leave a review and earn 50 points",
    message:
      "You have 1 recent purchase waiting for your review. Share your experience!",
    timestamp: "2024-12-22T12:00:00Z",
    read: true,
  },
  {
    id: "n5",
    type: "refund",
    title: "Refund processed",
    message:
      "Your refund of $129.00 for Order #ORD-2024-8390 has been credited to your card.",
    timestamp: "2024-11-08T16:45:00Z",
    read: true,
  },
  {
    id: "n6",
    type: "system",
    title: "Security alert",
    message:
      "A new sign-in from Nairobi, Kenya was detected. If this wasn't you, please secure your account.",
    timestamp: "2024-11-05T20:10:00Z",
    read: true,
  },
];

export const MOCK_SPENDING_DATA: SpendingDataPoint[] = [
  { month: "Jul", spending: 120, orders: 2 },
  { month: "Aug", spending: 345, orders: 4 },
  { month: "Sep", spending: 89, orders: 1 },
  { month: "Oct", spending: 210, orders: 3 },
  { month: "Nov", spending: 762, orders: 6 },
  { month: "Dec", spending: 374, orders: 4 },
  { month: "Jan", spending: 68, orders: 2 },
];

export const MOCK_STATS: StatCard[] = [
  {
    label: "Total Orders",
    value: "24",
    change: 12,
    changeLabel: "vs last month",
    icon: "ShoppingBag",
    color: "blue",
  },
  {
    label: "Amount Spent",
    value: "$1,968",
    change: -8,
    changeLabel: "vs last month",
    icon: "DollarSign",
    color: "green",
  },
  {
    label: "Loyalty Points",
    value: "3,420",
    change: 24,
    changeLabel: "this month",
    icon: "Zap",
    color: "purple",
  },
  {
    label: "Reviews Written",
    value: "12",
    change: 3,
    changeLabel: "this month",
    icon: "Star",
    color: "orange",
  },
];
