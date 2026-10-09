// hooks/useCountryFormData.ts
import { useMinimizedModuleData } from "./useMinimizedModuleData";
import type { CategoryFormData } from "@/types/modules";

export function useCategoryFormData() {
  return useMinimizedModuleData<CategoryFormData>("category-form-module");
}
