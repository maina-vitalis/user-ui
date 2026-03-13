"use client";

import Image from "next/image";
import { Star, ThumbsUp, CalendarDays, Package } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  MOCK_REVIEWS,
  Review,
} from "@/features/dashboard/types/dashboard.types";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted-foreground/40"
          }`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="group rounded-xl border border-border/60 p-5 transition-all duration-200 hover:shadow-sm hover:border-border">
      <div className="flex items-start gap-4">
        {/* Product Image */}
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-muted ring-1 ring-border/40">
          {review.productImage ? (
            <Image
              src={review.productImage}
              alt={review.productName}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Package className="h-5 w-5 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1 truncate">
                {review.productName}
              </p>
              <div className="flex items-center gap-2 mb-2">
                <StarRating rating={review.rating} />
                <span className="text-xs font-bold text-amber-500">
                  {review.rating}.0
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
              <CalendarDays className="h-3.5 w-3.5" />
              {new Date(review.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>

          <p className="text-sm font-semibold mb-1.5">{review.title}</p>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {review.body}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between mt-3">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1.5 text-xs rounded-lg text-muted-foreground hover:text-foreground -ml-2"
            >
              <ThumbsUp className="h-3.5 w-3.5" />
              Helpful ({review.helpful})
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs rounded-lg text-primary hover:text-primary"
            >
              Edit Review
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ReviewsList() {
  return (
    <Card className="border-border/60">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
              My Reviews
            </CardTitle>
            <CardDescription>
              {MOCK_REVIEWS.length} reviews written
            </CardDescription>
          </div>
          <Button size="sm" className="h-8 gap-1.5 rounded-xl text-xs">
            Write a Review
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-6">
        <div className="space-y-4">
          {MOCK_REVIEWS.map((review, index) => (
            <div key={review.id}>
              <ReviewCard review={review} />
              {index < MOCK_REVIEWS.length - 1 && (
                <Separator className="mt-4" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
