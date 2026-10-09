/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useIconFormData.ts
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export interface IconModuleData {
  formData: {
    id: string;
    name: string;
    description: string;
    svgContent: string | null;
    fileName: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };
  hasChanges: boolean;
  scrollPosition: number;
}

export const useIconFormData = () => {
  const dispatch = useAppDispatch();
  const moduleData = useAppSelector(
    (state: any) => state.minimizedModules?.["icon-form-module"]
  ) as IconModuleData | null;

  const hasMinimizedData = Boolean(moduleData);

  const resetModuleData = useCallback(
    async (moduleId: string) => {
      console.log(moduleId);
      // Implement your reset logic here
      // This would typically dispatch an action to clear the module data
    },
    [dispatch]
  );

  const getModuleScrollPosition = useCallback(
    (moduleId: string) => {
      console.log(moduleId);
      return moduleData?.scrollPosition || 0;
    },
    [moduleData]
  );

  return {
    moduleData,
    hasMinimizedData,
    resetModuleData,
    getModuleScrollPosition,
  };
};
