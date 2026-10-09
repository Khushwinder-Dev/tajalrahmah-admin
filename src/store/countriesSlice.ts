/* eslint-disable @typescript-eslint/no-explicit-any */
// store/countriesSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CountryType {
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
  timestamp?: number; // For real-time sorting
  userId?: string; // Who created/modified
  lastModifiedBy?: string;
}

export interface CountriesState {
  countries: CountryType[];
  selectedCountry: CountryType | null;
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
  totalCount: number;
  hasMore: boolean;
}

const initialState: CountriesState = {
  countries: [],
  selectedCountry: null,
  loading: false,
  error: null,
  lastUpdated: null,
  totalCount: 0,
  hasMore: true,
};

export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    setCountries: (state, action: PayloadAction<CountryType[]>) => {
      state.countries = action.payload.sort(
        (a, b) => (b.timestamp || 0) - (a.timestamp || 0)
      );
      state.lastUpdated = Date.now();
      state.selectedCountry = state.countries[0] || null;
    },
    addNewCountry: (state, action: PayloadAction<CountryType>) => {
      // Add new country to the beginning (most recent)
      state.countries.unshift(action.payload);
      // Keep only last 1000 countries to prevent memory issues
      if (state.countries.length > 1000) {
        state.countries = state.countries.slice(0, 1000);
      }
      state.lastUpdated = Date.now();
      state.totalCount += 1;
    },
    updateCountry: (
      state,
      action: PayloadAction<{ id: string; data: Partial<CountryType> }>
    ) => {
      const index = state.countries.findIndex(
        (country) => country.id === action.payload.id
      );
      if (index !== -1) {
        state.countries[index] = {
          ...state.countries[index],
          ...action.payload.data,
          timestamp: Date.now(), // Update timestamp for sorting
        };
        state.lastUpdated = Date.now();
      }
    },
    removeCountry: (state, action: PayloadAction<string>) => {
      state.countries = state.countries.filter(
        (country) => country.id !== action.payload
      );
      if (state.selectedCountry?.id === action.payload) {
        state.selectedCountry = state.countries[0] || null;
      }
      state.lastUpdated = Date.now();
      state.totalCount = Math.max(0, state.totalCount - 1);
    },
    setSelectedCountry: (state, action: PayloadAction<CountryType>) => {
      state.selectedCountry = action.payload;
    },
    appendCountries: (state, action: PayloadAction<CountryType[]>) => {
      const newCountries = action.payload.filter(
        (newCountry) =>
          !state.countries.some(
            (existingCountry) => existingCountry.id === newCountry.id
          )
      );
      state.countries = [...state.countries, ...newCountries].sort(
        (a, b) => (b.timestamp || 0) - (a.timestamp || 0)
      );
      state.lastUpdated = Date.now();
    },
    bulkUpdateCountries: (
      state,
      action: PayloadAction<{ ids: string[]; data: Partial<CountryType> }>
    ) => {
      const { ids, data } = action.payload;
      state.countries = state.countries.map((country) => {
        if (ids.includes(country.id)) {
          return {
            ...country,
            ...data,
            timestamp: Date.now(),
            lastUpdated: new Date().toISOString(),
          };
        }
        return country;
      });
      state.lastUpdated = Date.now();
    },
    bulkDeleteCountries: (state, action: PayloadAction<string[]>) => {
      const idsToDelete = action.payload;
      state.countries = state.countries.filter(
        (country) => !idsToDelete.includes(country.id)
      );
      if (
        state.selectedCountry &&
        idsToDelete.includes(state.selectedCountry.id)
      ) {
        state.selectedCountry = state.countries[0] || null;
      }
      state.lastUpdated = Date.now();
      state.totalCount = Math.max(0, state.totalCount - idsToDelete.length);
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
    clearCountries: (state) => {
      state.countries = [];
      state.selectedCountry = null;
      state.totalCount = 0;
      state.hasMore = false;
      state.lastUpdated = Date.now();
    },
  },
});

export const {
  setCountries,
  addNewCountry,
  updateCountry,
  removeCountry,
  setSelectedCountry,
  appendCountries,
  bulkUpdateCountries,
  bulkDeleteCountries,
  setLoading,
  setError,
  clearError,
  setTotalCount,
  setHasMore,
  clearCountries,
} = countriesSlice.actions;

export default countriesSlice.reducer;
