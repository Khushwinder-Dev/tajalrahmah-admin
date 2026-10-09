// hooks/useCountryFormData.ts
import { useMinimizedModuleData } from "./useMinimizedModuleData";
import type { CountryModuleData } from "@/types/modules";

export function useCountryFormData() {
  return useMinimizedModuleData<CountryModuleData>("country-form-module");
}
