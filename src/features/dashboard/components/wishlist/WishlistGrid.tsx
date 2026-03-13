"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, ShoppingCart, Star, Package } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MOCK_WISHLIST,
  WishlistProduct,
} from "@/features/dashboard/types/dashboard.types";

export function WishlistGrid() {
  const [items, setItems] = useState<WishlistProduct[]>(MOCK_WISHLIST);

  const removeItem = (id: string) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <Card className="border-border/60">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Heart className="h-5 w-5 text-rose-500" />
          My Wishlist
        </CardTitle>
        <CardDescription>{items.length} saved items</CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-6">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="h-16 w-16 rounded-2xl bg-rose-500/10 flex items-center justify-center mb-4">
              <Heart className="h-7 w-7 text-rose-400" />
            </div>
            <p className="font-semibold">Your wishlist is empty</p>
            <p className="text-sm text-muted-foreground mt-1">
              Save items you love for later.
            </p>
            <Button className="mt-4 rounded-xl" size="sm">
              Browse Products
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((product) => (
              <WishlistProductCard
                key={product.id}
                product={product}
                onRemove={() => removeItem(product.id)}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function WishlistProductCard({
  product,
  onRemove,
}: {
  product: WishlistProduct;
  onRemove: () => void;
}) {
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : null;

  return (
    <div className="group relative rounded-xl border border-border/60 overflow-hidden transition-all duration-300 hover:shadow-md hover:border-border hover:-translate-y-0.5">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Package className="h-10 w-10 text-muted-foreground" />
          </div>
        )}
        {/* Discount badge */}
        {discount && (
          <Badge className="absolute top-2 left-2 bg-rose-500/90 text-white border-transparent text-[10px] font-bold">
            -{discount}%
          </Badge>
        )}
        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px] flex items-center justify-center">
            <Badge variant="secondary" className="text-xs font-semibold">
              Out of Stock
            </Badge>
          </div>
        )}
        {/* Remove button */}
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm border border-border/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-rose-500 hover:border-rose-500 hover:text-white text-muted-foreground"
          aria-label="Remove from wishlist"
        >
          <Heart className="h-3.5 w-3.5 fill-current" />
        </button>
      </div>

      {/* Content */}
      <div className="p-3">
        <Badge
          variant="secondary"
          className="text-[10px] mb-1.5 h-4 px-1.5 font-normal"
        >
          {product.category}
        </Badge>
        <p className="text-sm font-semibold leading-snug line-clamp-2">
          {product.name}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-1.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating)
                    ? "fill-amber-400 text-amber-400"
                    : i < product.rating
                      ? "fill-amber-400/50 text-amber-400"
                      : "fill-muted text-muted-foreground/40"
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] text-muted-foreground">
            ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-base font-bold">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* CTA */}
        <Button
          size="sm"
          className="w-full mt-3 rounded-lg h-8 text-xs gap-1.5"
          disabled={!product.inStock}
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>
    </div>
  );
}
