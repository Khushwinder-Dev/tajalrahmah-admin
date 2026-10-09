// hooks/useCountryFormData.ts
import { useMinimizedModuleData } from "./useMinimizedModuleData";
import type { LanguageModuleData } from "@/types/modules";

export function useLanguageFormData() {
  return useMinimizedModuleData<LanguageModuleData>("language-form-module");
}
