import {
  Apple,
  BarChart3,
  BookOpen,
  Brush,
  CreditCard,
  Dumbbell,
  Facebook,
  Globe,
  House,
  Instagram,
  Laptop,
  LayoutDashboard,
  Linkedin,
  Package,
  Search,
  Shirt,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Truck,
  Twitter,
  UserPlus,
  Wallet,
} from "lucide-react";
import type { Feature, Step, Category, Testimonial, PricingPlan } from "../types";

export const platformName = "VendorVault";

export const navLinks = ["Home", "Features", "Vendors", "Pricing", "About"];

export const stats = [
  { value: "50K+", label: "Products" },
  { value: "12K+", label: "Vendors" },
  { value: "200K+", label: "Happy Buyers" },
  { value: "99.9%", label: "Uptime" },
];

export const features: Feature[] = [
  {
    title: "Easy Store Setup",
    description: "Launch your store in minutes with zero coding.",
    icon: Store,
  },
  {
    title: "Secure Payments",
    description: "Integrated payment gateway with escrow protection.",
    icon: CreditCard,
  },
  {
    title: "Order Management",
    description: "Real-time order tracking and fulfillment tools.",
    icon: Package,
  },
  {
    title: "Vendor Analytics",
    description: "Deep insights into your store's performance.",
    icon: BarChart3,
  },
  {
    title: "Multi-Currency",
    description: "Sell globally, get paid locally.",
    icon: Globe,
  },
  {
    title: "Buyer Protection",
    description: "Money-back guarantee on every purchase.",
    icon: ShieldCheck,
  },
];

export const vendorSteps: Step[] = [
  {
    step: "01",
    title: "Create Your Account",
    description: "Sign up in under two minutes and verify your business profile.",
    icon: UserPlus,
  },
  {
    step: "02",
    title: "Set Up Your Store",
    description: "Customize your storefront, upload products, and set shipping rules.",
    icon: LayoutDashboard,
  },
  {
    step: "03",
    title: "Start Earning",
    description: "Go live and receive secure payouts as orders start coming in.",
    icon: Wallet,
  },
];

export const shopperSteps: Step[] = [
  {
    step: "01",
    title: "Discover Trusted Stores",
    description: "Browse curated vendors and products tailored to your needs.",
    icon: Search,
  },
  {
    step: "02",
    title: "Shop With Confidence",
    description: "Use secure checkout and buyer protection on every transaction.",
    icon: ShoppingBag,
  },
  {
    step: "03",
    title: "Track Every Delivery",
    description: "Get live updates from checkout to doorstep with reliable support.",
    icon: Truck,
  },
];

export const categories: Category[] = [
  {
    name: "Electronics",
    count: "8,200+ products",
    emoji: "📱",
    gradientClass: "from-primary/30 via-primary/10 to-background",
  },
  {
    name: "Fashion",
    count: "11,000+ products",
    emoji: "👗",
    gradientClass: "from-secondary/70 via-muted to-background",
  },
  {
    name: "Home & Living",
    count: "6,400+ products",
    emoji: "🏡",
    gradientClass: "from-muted via-accent/40 to-background",
  },
  {
    name: "Beauty",
    count: "4,900+ products",
    emoji: "💄",
    gradientClass: "from-accent/60 via-primary/10 to-background",
  },
  {
    name: "Sports",
    count: "3,700+ products",
    emoji: "🏅",
    gradientClass: "from-primary/25 via-muted to-background",
  },
  {
    name: "Books",
    count: "2,600+ products",
    emoji: "📚",
    gradientClass: "from-secondary/80 via-muted to-background",
  },
  {
    name: "Groceries",
    count: "5,300+ products",
    emoji: "🥑",
    gradientClass: "from-accent/50 via-primary/10 to-background",
  },
  {
    name: "Handmade",
    count: "1,900+ products",
    emoji: "🧵",
    gradientClass: "from-primary/20 via-secondary/40 to-background",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Amina Njeri",
    role: "Vendor - Nairobi, Kenya",
    quote:
      "VendorVault helped me turn my craft business into a global store. My monthly orders tripled in 90 days.",
    badge: "Verified Vendor",
    initials: "AN",
  },
  {
    name: "Lucas Pereira",
    role: "Buyer - Sao Paulo, Brazil",
    quote:
      "I love discovering unique products from independent sellers. Delivery updates are spot-on and checkout is seamless.",
    badge: "Verified Buyer",
    initials: "LP",
  },
  {
    name: "Mei Tan",
    role: "Vendor - Singapore",
    quote:
      "The analytics and payout reliability are excellent. I spend less time on operations and more time growing my catalog.",
    badge: "Verified Vendor",
    initials: "MT",
  },
];

export const monthlyPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: "$0/mo",
    commission: "8% commission",
    description: "For new sellers validating their first products.",
    features: [
      "0% setup fee",
      "Up to 50 products",
      "Standard support",
      "Secure checkout",
    ],
    cta: "Start Free",
  },
  {
    name: "Growth",
    price: "$29/mo",
    commission: "5% commission",
    description: "Built for scaling brands that need better margins.",
    features: [
      "0% setup fee",
      "Unlimited products",
      "Advanced analytics",
      "Abandoned cart recovery",
    ],
    cta: "Choose Growth",
    popular: true,
  },
  {
    name: "Pro",
    price: "$79/mo",
    commission: "2% commission",
    description: "For high-volume vendors needing premium support.",
    features: [
      "0% setup fee",
      "Custom storefront",
      "Priority support",
      "Dedicated success manager",
    ],
    cta: "Go Pro",
  },
];

export const annualPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: "$0/yr",
    commission: "8% commission",
    description: "For new sellers validating their first products.",
    features: [
      "0% setup fee",
      "Up to 50 products",
      "Standard support",
      "Secure checkout",
    ],
    cta: "Start Free",
  },
  {
    name: "Growth",
    price: "$290/yr",
    commission: "5% commission",
    description: "Two months free with annual billing.",
    features: [
      "0% setup fee",
      "Unlimited products",
      "Advanced analytics",
      "Abandoned cart recovery",
    ],
    cta: "Choose Growth",
    popular: true,
  },
  {
    name: "Pro",
    price: "$790/yr",
    commission: "2% commission",
    description: "Two months free with annual billing.",
    features: [
      "0% setup fee",
      "Custom storefront",
      "Priority support",
      "Dedicated success manager",
    ],
    cta: "Go Pro",
  },
];

export const faqs = [
  {
    question: "How much does it cost to start selling?",
    answer:
      "You can start on our Starter plan at no monthly cost. We only charge commission when you make a sale.",
  },
  {
    question: "How fast can I launch my store?",
    answer:
      "Most vendors publish their first product and go live within the same day. Setup usually takes less than 30 minutes.",
  },
  {
    question: "Which payment methods do you support?",
    answer:
      "We support cards, mobile wallets, and local payment rails in supported regions, with secure escrow for high-value orders.",
  },
  {
    question: "When can I withdraw my earnings?",
    answer:
      "Withdrawals are available on a rolling schedule. Most vendors receive payouts within 2-3 business days after order completion.",
  },
  {
    question: "What product categories can I sell in?",
    answer:
      "You can sell across fashion, electronics, home, beauty, groceries, books, handmade goods, and more approved categories.",
  },
  {
    question: "Do buyers get purchase protection?",
    answer:
      "Yes. Every order includes buyer protection with dispute handling and a money-back guarantee for eligible issues.",
  },
  {
    question: "Do you offer support for vendors?",
    answer:
      "All plans include support. Growth and Pro plans include faster response times and dedicated onboarding resources.",
  },
  {
    question: "Can I migrate from another platform?",
    answer:
      "Yes. Our onboarding team can help import products, customers, and order history for qualifying vendor accounts.",
  },
];

export const socialLinks = [
  { label: "X", icon: Twitter },
  { label: "Instagram", icon: Instagram },
  { label: "LinkedIn", icon: Linkedin },
  { label: "Facebook", icon: Facebook },
];

export const categoryIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Electronics: Laptop,
  Fashion: Shirt,
  "Home & Living": House,
  Beauty: Sparkles,
  Sports: Dumbbell,
  Books: BookOpen,
  Groceries: Apple,
  Handmade: Brush,
};