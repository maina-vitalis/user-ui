import api from "@/lib/api";
import { VendorFormValues } from "../types/vendor-form.types";

export const upgradeToVendor = async (vendorValues: VendorFormValues) => {
  const data = await api.post("/api/users/upgrade-to-vendor", vendorValues);
  return data;
};
