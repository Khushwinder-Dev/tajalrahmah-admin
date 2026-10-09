/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useMinimizedModuleData.ts
import { useCallback } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectMinimizedModulesForUser } from "@/store/minimizedModulesSlice";
import {
  minimizeModuleWithAuth,
  restoreModuleWithAuth,
  closeMinimizedWithAuth,
  resetModuleFormDataWithAuth,
} from "@/store/minimizedModulesThunks";
import type { MinimizedModule, ModuleData } from "@/types/modules";

interface UseMinimizedModuleDataReturn<T extends ModuleData = ModuleData> {
  // Data retrieval
  moduleData: T | null;
  hasMinimizedData: boolean;
  minimizedModule: MinimizedModule | null;
  allMinimizedModules: MinimizedModule[];

  // Actions
  minimizeModule: (
    moduleData: Omit<MinimizedModule, "minimizedAt">
  ) => Promise<void>;
  restoreModule: (moduleId: string) => Promise<void>;
  closeModule: (moduleId: string) => Promise<void>;
  resetModuleData: (moduleId: string) => Promise<void>;

  // Utilities
  isModuleMinimized: (moduleId: string) => boolean;
  getModuleScrollPosition: (moduleId: string) => number;
}

export function useMinimizedModuleData<T extends ModuleData = ModuleData>(
  moduleId: string
): UseMinimizedModuleDataReturn<T> {
  const dispatch = useAppDispatch();

  // Get current user ID
  const userId = useAppSelector((state) => state.auth.user?.userId);

  // Get all minimized modules for the current user
  const allMinimizedModules = useAppSelector((state) =>
    selectMinimizedModulesForUser(state, userId || "")
  );

  // Get specific module data
  const minimizedModule =
    allMinimizedModules.find((module) => module.id === moduleId) || null;

  // Cast the data to the expected type T
  const moduleData: T | null = (minimizedModule?.data as T) || null;
  const hasMinimizedData = Boolean(minimizedModule && minimizedModule.data);

  // Action creators
  const minimizeModule = useCallback(
    async (moduleData: Omit<MinimizedModule, "minimizedAt">): Promise<void> => {
      try {
        await dispatch(minimizeModuleWithAuth(moduleData)).unwrap();
      } catch (error) {
        console.error("Error minimizing module:", error);
        throw error;
      }
    },
    [dispatch]
  );

  const restoreModule = useCallback(
    async (moduleId: string): Promise<void> => {
      try {
        await dispatch(restoreModuleWithAuth(moduleId)).unwrap();
      } catch (error) {
        console.error("Error restoring module:", error);
        throw error;
      }
    },
    [dispatch]
  );

  const closeModule = useCallback(
    async (moduleId: string): Promise<void> => {
      try {
        await dispatch(closeMinimizedWithAuth(moduleId)).unwrap();
      } catch (error) {
        console.error("Error closing module:", error);
        throw error;
      }
    },
    [dispatch]
  );

  const resetModuleData = useCallback(
    async (moduleId: string): Promise<void> => {
      try {
        await dispatch(resetModuleFormDataWithAuth(moduleId)).unwrap();
      } catch (error) {
        console.error("Error resetting module data:", error);
        throw error;
      }
    },
    [dispatch]
  );

  // Utility functions
  const isModuleMinimized = useCallback(
    (moduleId: string): boolean => {
      return allMinimizedModules.some((module) => module.id === moduleId);
    },
    [allMinimizedModules]
  );

  const getModuleScrollPosition = useCallback(
    (moduleId: string): number => {
      const module = allMinimizedModules.find((m) => m.id === moduleId);
      return (module?.data as any)?.scrollPosition || 0;
    },
    [allMinimizedModules]
  );

  return {
    // Data
    moduleData,
    hasMinimizedData,
    minimizedModule,
    allMinimizedModules,

    // Actions
    minimizeModule,
    restoreModule,
    closeModule,
    resetModuleData,

    // Utilities
    isModuleMinimized,
    getModuleScrollPosition,
  };
}
