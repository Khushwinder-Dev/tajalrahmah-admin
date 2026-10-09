// store/minimizedModulesSlice.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MinimizedModule } from "@/types/modules";
import type { RootState } from "./index";

interface MinimizedModulesState {
  minimizedModulesByUser: Record<string, MinimizedModule[]>;
  activeModuleByUser: Record<string, string | null>;
}

const initialState: MinimizedModulesState = {
  minimizedModulesByUser: {},
  activeModuleByUser: {},
};

const minimizedModulesSlice = createSlice({
  name: "minimizedModules",
  initialState,
  reducers: {
    minimizeModule: (
      state,
      action: PayloadAction<
        Omit<MinimizedModule, "minimizedAt"> & { userId: string }
      >
    ) => {
      const { userId, ...moduleData } = action.payload;

      // Initialize user data if it doesn't exist
      if (!state.minimizedModulesByUser[userId]) {
        state.minimizedModulesByUser[userId] = [];
      }
      if (!state.activeModuleByUser[userId]) {
        state.activeModuleByUser[userId] = null;
      }

      const userModules = state.minimizedModulesByUser[userId];
      const existingIndex = userModules.findIndex(
        (module) => module.id === moduleData.id
      );

      const moduleWithTimestamp = {
        ...moduleData,
        minimizedAt: new Date().toISOString(),
      };

      if (existingIndex >= 0) {
        state.minimizedModulesByUser[userId][existingIndex] =
          moduleWithTimestamp;
      } else {
        state.minimizedModulesByUser[userId].push(moduleWithTimestamp);
      }
    },

    restoreModule: (
      state,
      action: PayloadAction<{ id: string; userId: string }>
    ) => {
      const { id, userId } = action.payload;

      if (state.minimizedModulesByUser[userId]) {
        state.minimizedModulesByUser[userId] = state.minimizedModulesByUser[
          userId
        ].filter((module) => module.id !== id);
        state.activeModuleByUser[userId] = id;
      }
    },

    closeMinimized: (
      state,
      action: PayloadAction<{ id: string; userId: string }>
    ) => {
      const { id, userId } = action.payload;

      if (state.minimizedModulesByUser[userId]) {
        state.minimizedModulesByUser[userId] = state.minimizedModulesByUser[
          userId
        ].filter((module) => module.id !== id);
      }
    },

    clearAllMinimized: (state, action: PayloadAction<{ userId: string }>) => {
      const { userId } = action.payload;
      state.minimizedModulesByUser[userId] = [];
      state.activeModuleByUser[userId] = null;
    },

    resetModuleFormData: (
      state,
      action: PayloadAction<{ id: string; userId: string }>
    ) => {
      const { id, userId } = action.payload;

      if (!state.minimizedModulesByUser[userId]) return;

      const moduleIndex = state.minimizedModulesByUser[userId].findIndex(
        (module) => module.id === id
      );

      if (moduleIndex >= 0) {
        const module = state.minimizedModulesByUser[userId][moduleIndex];

        state.minimizedModulesByUser[userId][moduleIndex] = {
          ...module,
          data: {
            ...module.data,
            formData: {},
            hasChanges: false,
            scrollPosition: 0,
            ...(module.data &&
              typeof module.data === "object" &&
              Object.keys(module.data).reduce((acc, key) => {
                if (
                  !["formData", "hasChanges", "scrollPosition"].includes(key)
                ) {
                  acc[key] = module.data[key];
                }
                return acc;
              }, {} as any)),
          },
          minimizedAt: new Date().toISOString(),
        };
      }
    },

    clearUserData: (state, action: PayloadAction<{ userId: string }>) => {
      const { userId } = action.payload;
      delete state.minimizedModulesByUser[userId];
      delete state.activeModuleByUser[userId];
    },
  },
});

// Selectors to get user-specific data
export const selectMinimizedModulesForUser = (
  state: RootState,
  userId: string
): MinimizedModule[] =>
  state.minimizedModules.minimizedModulesByUser[userId] || [];

export const selectActiveModuleForUser = (state: RootState, userId: string) =>
  state.minimizedModules.activeModuleByUser[userId] || null;

export const {
  minimizeModule,
  restoreModule,
  closeMinimized,
  clearAllMinimized,
  resetModuleFormData,
  clearUserData,
} = minimizedModulesSlice.actions;

export default minimizedModulesSlice.reducer;
