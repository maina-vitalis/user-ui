"use client";

import { MapPin, Star, Plus, MoreVertical, CheckCircle2 } from "lucide-react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Address,
  MOCK_ADDRESSES,
} from "@/features/dashboard/types/dashboard.types";

export function AddressList() {
  return (
    <Card className="border-border/60">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Saved Addresses
            </CardTitle>
            <CardDescription>{MOCK_ADDRESSES.length} addresses</CardDescription>
          </div>
          <Button size="sm" className="h-8 gap-1.5 rounded-xl text-xs">
            <Plus className="h-3.5 w-3.5" />
            Add New
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {MOCK_ADDRESSES.map((address) => (
            <AddressCard key={address.id} address={address} />
          ))}
          {/* Add New placeholder */}
          <button className="group flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border/60 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 min-h-40 p-6 text-muted-foreground hover:text-primary">
            <div className="h-10 w-10 rounded-xl bg-muted group-hover:bg-primary/10 flex items-center justify-center transition-all duration-200">
              <Plus className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium">Add New Address</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

function AddressCard({ address }: { address: Address }) {
  return (
    <div
      className={`relative rounded-xl border ${
        address.isDefault
          ? "border-primary/30 bg-primary/5 dark:bg-primary/10"
          : "border-border/60 bg-card"
      } p-4 transition-all duration-200 hover:shadow-sm`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className={`h-8 w-8 rounded-lg flex items-center justify-center ${
              address.isDefault
                ? "bg-primary/15 text-primary"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {address.isDefault ? (
              <Star className="h-4 w-4 fill-current" />
            ) : (
              <MapPin className="h-4 w-4" />
            )}
          </div>
          <div>
            <span className="text-sm font-semibold">{address.label}</span>
            {address.isDefault && (
              <div className="flex items-center gap-1 text-[11px] text-primary font-medium mt-0.5">
                <CheckCircle2 className="h-3 w-3" />
                Default
              </div>
            )}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-lg text-muted-foreground hover:text-foreground"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-xl w-40">
            <DropdownMenuItem className="rounded-lg cursor-pointer">
              Edit address
            </DropdownMenuItem>
            {!address.isDefault && (
              <DropdownMenuItem className="rounded-lg cursor-pointer">
                Set as default
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="rounded-lg cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Address Details */}
      <div className="space-y-0.5 text-sm">
        <p className="font-medium">{address.fullName}</p>
        <p className="text-muted-foreground">{address.line1}</p>
        {address.line2 && (
          <p className="text-muted-foreground">{address.line2}</p>
        )}
        <p className="text-muted-foreground">
          {address.city}, {address.state} {address.postalCode}
        </p>
        <p className="text-muted-foreground">{address.country}</p>
        <p className="text-muted-foreground mt-1">{address.phone}</p>
      </div>
    </div>
  );
}
