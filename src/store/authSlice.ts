/* eslint-disable @typescript-eslint/no-explicit-any */
// authSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Define the User interface
interface User {
  userId: string; // or whatever properties your user object has
  email?: string;
  name?: string;
  userRole?: string;
  permissions?: any;
  // Add other user properties as needed
}

// Define the AuthState interface
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      console.log("🚪 Logging out user...");
      state.isAuthenticated = false;
      state.user = null;
      // Clear remembered credentials on logout
      localStorage.removeItem("rememberedCredentials");
      console.log("✅ Logout completed - cleared remembered credentials");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
