// store/dataSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface DataItem {
  id: string;
  name: string;
  value: number;
  timestamp: number;
}

export interface DataState {
  items: DataItem[];
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  items: [],
  loading: false,
  error: null,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    updateData: (state, action: PayloadAction<DataItem>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      } else {
        state.items.push(action.payload);
      }
    },
    updateMultipleData: (state, action: PayloadAction<DataItem[]>) => {
      action.payload.forEach((newItem) => {
        const index = state.items.findIndex((item) => item.id === newItem.id);
        if (index !== -1) {
          state.items[index] = newItem;
        } else {
          state.items.push(newItem);
        }
      });
    },
    removeData: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearData: (state) => {
      state.items = [];
    },
  },
});

export const { updateData, updateMultipleData, removeData, clearData } =
  dataSlice.actions;
export default dataSlice.reducer;
