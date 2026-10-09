/* eslint-disable @typescript-eslint/no-explicit-any */
// store/activityLogSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ActivityLogType {
  id: number;
  time: string;
  title: string;
  userName: string;
  image: string;
  date: string;
  timestamp?: number; // For real-time sorting
  userId?: string;
  action?: string;
  module?: string;
  details?: any;
}

export interface ActivityLogState {
  logs: ActivityLogType[];
  selectedLog: ActivityLogType | null;
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
  totalCount: number;
  hasMore: boolean;
}

const initialState: ActivityLogState = {
  logs: [],
  selectedLog: null,
  loading: false,
  error: null,
  lastUpdated: null,
  totalCount: 0,
  hasMore: true,
};

export const activityLogSlice = createSlice({
  name: "activityLogs",
  initialState,
  reducers: {
    setLogs: (state, action: PayloadAction<ActivityLogType[]>) => {
      state.logs = action.payload.sort(
        (a, b) => (b.timestamp || 0) - (a.timestamp || 0)
      );
      state.lastUpdated = Date.now();
      state.selectedLog = state.logs[0] || null;
    },
    addNewLog: (state, action: PayloadAction<ActivityLogType>) => {
      // Add new log to the beginning (most recent)
      state.logs.unshift(action.payload);
      // Keep only last 100 logs to prevent memory issues
      if (state.logs.length > 100) {
        state.logs = state.logs.slice(0, 100);
      }
      state.lastUpdated = Date.now();
      state.totalCount += 1;
    },
    updateLog: (
      state,
      action: PayloadAction<{ id: number; data: Partial<ActivityLogType> }>
    ) => {
      const index = state.logs.findIndex((log) => log.id === action.payload.id);
      if (index !== -1) {
        state.logs[index] = { ...state.logs[index], ...action.payload.data };
        state.lastUpdated = Date.now();
      }
    },
    removeLog: (state, action: PayloadAction<number>) => {
      state.logs = state.logs.filter((log) => log.id !== action.payload);
      if (state.selectedLog?.id === action.payload) {
        state.selectedLog = state.logs[0] || null;
      }
      state.lastUpdated = Date.now();
    },
    setSelectedLog: (state, action: PayloadAction<ActivityLogType>) => {
      state.selectedLog = action.payload;
    },
    appendLogs: (state, action: PayloadAction<ActivityLogType[]>) => {
      const newLogs = action.payload.filter(
        (newLog) =>
          !state.logs.some((existingLog) => existingLog.id === newLog.id)
      );
      state.logs = [...state.logs, ...newLogs].sort(
        (a, b) => (b.timestamp || 0) - (a.timestamp || 0)
      );
      state.lastUpdated = Date.now();
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
  },
});

export const {
  setLogs,
  addNewLog,
  updateLog,
  removeLog,
  setSelectedLog,
  appendLogs,
  setLoading,
  setError,
  clearError,
  setTotalCount,
  setHasMore,
} = activityLogSlice.actions;

export default activityLogSlice.reducer;
