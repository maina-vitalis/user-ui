import * as z from "zod";

export enum BusinessType {
  Individual = "Individual",
  LLC = "LLC",
  Corp = "Corp",
}

export const vendorFormSchema = z.object({
  storeName: z
    .string()
    .min(2, "Store name must be at least 2 characters")
    .max(50, "Store name must not exceed 50 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters"),
  businessType: z.enum(BusinessType, {
    error: () => ({ message: "Please select a business type" }),
  }),
});

export type VendorFormValues = z.infer<typeof vendorFormSchema>;

export const BUSINESS_TYPES = [
  { value: BusinessType.Individual, label: "Individual" },
  { value: BusinessType.LLC, label: "LLC" },
  { value: BusinessType.Corp, label: "Corporation" },
];
