// store/countrySlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CountryDetailsType {
  id: string;
  title: string;
  code: string;
  callingCode: string;
  currency: string;
  states: number;
  cities: number;
  areas?: number;
  flag?: string;
  createdAt: string;
  updatedAt: string;
  draftedAt?: string;
  status: "active" | "inactive" | "draft";
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  isUpdated: boolean;
  actionMessage?: string;
  timestamp?: number;
  userId?: string;
  lastModifiedBy?: string;
  // Additional details that might be specific to single country view
  description?: string;
  population?: number;
  area?: number;
  capital?: string;
  languages?: string[];
  timezone?: string;
  region?: string;
  subregion?: string;
}

export interface CountryState {
  country: CountryDetailsType | null;
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
  isSubscribed: boolean; // Track if we're subscribed to this country's updates
}

const initialState: CountryState = {
  country: null,
  loading: false,
  error: null,
  lastUpdated: null,
  isSubscribed: false,
};

export const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    setCountry: (state, action: PayloadAction<CountryDetailsType>) => {
      state.country = action.payload;
      state.lastUpdated = Date.now();
      state.error = null;
    },
    updateCountryDetails: (
      state,
      action: PayloadAction<Partial<CountryDetailsType>>
    ) => {
      if (state.country) {
        state.country = {
          ...state.country,
          ...action.payload,
          timestamp: Date.now(),
          updatedAt: new Date().toISOString(),
        };
        state.lastUpdated = Date.now();
      }
    },
    clearCountry: (state) => {
      state.country = null;
      state.lastUpdated = null;
      state.error = null;
      state.isSubscribed = false;
    },
    setCountryLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCountryError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearCountryError: (state) => {
      state.error = null;
    },
    setSubscribed: (state, action: PayloadAction<boolean>) => {
      state.isSubscribed = action.payload;
    },
    // Handle real-time updates
    handleCountryUpdate: (
      state,
      action: PayloadAction<Partial<CountryDetailsType>>
    ) => {
      if (state.country && state.country.id === action.payload.id) {
        state.country = {
          ...state.country,
          ...action.payload,
          timestamp: Date.now(),
        };
        state.lastUpdated = Date.now();
      }
    },
    handleCountryDelete: (state, action: PayloadAction<string>) => {
      if (state.country && state.country.id === action.payload) {
        state.country = null;
        state.isSubscribed = false;
        state.lastUpdated = Date.now();
      }
    },
  },
});

export const {
  setCountry,
  updateCountryDetails,
  clearCountry,
  setCountryLoading,
  setCountryError,
  clearCountryError,
  setSubscribed,
  handleCountryUpdate,
  handleCountryDelete,
} = countrySlice.actions;

export default countrySlice.reducer;
