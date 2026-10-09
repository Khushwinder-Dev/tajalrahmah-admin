// store/minimizedModulesThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "./index";
import {
  minimizeModule as minimizeModuleAction,
  restoreModule as restoreModuleAction,
  closeMinimized as closeMinimizedAction,
  clearAllMinimized as clearAllMinimizedAction,
  resetModuleFormData as resetModuleFormDataAction,
} from "./minimizedModulesSlice";
import type { MinimizedModule } from "@/types/modules";

// Helper function to get userId from state
const getUserId = (state: RootState): string | null => {
  return state.auth.user?.userId || null;
};

// Thunk action creators that automatically get userId from auth state
export const minimizeModuleWithAuth = createAsyncThunk(
  "minimizedModules/minimizeModuleWithAuth",
  async (
    moduleData: Omit<MinimizedModule, "minimizedAt">,
    { dispatch, getState }
  ) => {
    const state = getState() as RootState;
    const userId = getUserId(state);

    if (!userId) {
      throw new Error("User not authenticated");
    }

    dispatch(minimizeModuleAction({ ...moduleData, userId }));
  }
);

export const restoreModuleWithAuth = createAsyncThunk(
  "minimizedModules/restoreModuleWithAuth",
  async (id: string, { dispatch, getState }) => {
    const state = getState() as RootState;
    const userId = getUserId(state);

    if (!userId) {
      throw new Error("User not authenticated");
    }

    dispatch(restoreModuleAction({ id, userId }));
  }
);

export const closeMinimizedWithAuth = createAsyncThunk(
  "minimizedModules/closeMinimizedWithAuth",
  async (id: string, { dispatch, getState }) => {
    const state = getState() as RootState;
    const userId = getUserId(state);

    if (!userId) {
      throw new Error("User not authenticated");
    }

    dispatch(closeMinimizedAction({ id, userId }));
  }
);

export const clearAllMinimizedWithAuth = createAsyncThunk(
  "minimizedModules/clearAllMinimizedWithAuth",
  async (_, { dispatch, getState }) => {
    const state = getState() as RootState;
    const userId = getUserId(state);

    if (!userId) {
      throw new Error("User not authenticated");
    }

    dispatch(clearAllMinimizedAction({ userId }));
  }
);

export const resetModuleFormDataWithAuth = createAsyncThunk(
  "minimizedModules/resetModuleFormDataWithAuth",
  async (id: string, { dispatch, getState }) => {
    const state = getState() as RootState;
    const userId = getUserId(state);

    if (!userId) {
      throw new Error("User not authenticated");
    }

    dispatch(resetModuleFormDataAction({ id, userId }));
  }
);
