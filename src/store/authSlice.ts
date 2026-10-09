import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { userPermission } from "@/mockData/user-permission";

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

export const defaultUser: User = {
  userId: "rapid@gmail.com",
  email: "rapid@gmail.com",
  name: "Admin",
  userRole: "admin",
  permissions: userPermission,
};

const initialState: AuthState = {
  isAuthenticated: true,
  user: defaultUser,
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
      console.log("🚪 Logout called, retaining default authentication");
      state.isAuthenticated = true;
      state.user = defaultUser;
      localStorage.removeItem("rememberedCredentials");
    },
  },
  extraReducers: (builder) => {
    builder.addCase("persist/REHYDRATE", (state, action: any) => {
      state.isAuthenticated = true;
      state.user = action?.payload?.auth?.user || defaultUser;
    });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
