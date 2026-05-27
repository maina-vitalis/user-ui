"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  vendorFormSchema,
  type VendorFormValues,
  BUSINESS_TYPES,
} from "@/features/landing/types/vendor-form.types";
import { useMutation } from "@tanstack/react-query";
import { upgradeToVendor } from "../api/upgradeToVendor";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface VendorFormProps {
  onSubmit?: (values: VendorFormValues) => void | Promise<void>;
  isLoading?: boolean;
}

export function VendorOnboardingForm({}: VendorFormProps) {
  const form = useForm<VendorFormValues>({
    resolver: zodResolver(vendorFormSchema),
    defaultValues: {
      storeName: "",
      description: "",
      businessType: undefined,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: upgradeToVendor,
    onSuccess() {
      toast.success("Registration successful");
      const SELLER_URL = process.env.NEXT_PUBLIC_SELLER_URL!;
      globalThis.location.assign(SELLER_URL);
    },
    onError(err) {
      toast.error(err.message);
    },
  });

  const handleSubmit = async (values: VendorFormValues) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="storeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="My Awesome Store"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="businessType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger disabled={isPending} className="w-full">
                    <SelectValue placeholder="Select a business type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {BUSINESS_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your store and what you sell..."
                  disabled={isPending}
                  className="resize-none"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Setting up your store..." : "Start Selling"}
        </Button>
      </form>
    </Form>
  );
}
