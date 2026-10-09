import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./authSlice";
import { apiSlice } from "./api/apiSlice";
import languageReducer from "./languageSlice";
import minimizedModulesReducer from "./minimizedModulesSlice";
import websocketReducer from "./websocketSlice";
import dataReducer from "./dataSlice";
import notificationReducer from "./notificationSlice";
import { websocketMiddleware } from "../../middleware/websocketMiddleware"; // Import WebSocket middleware
import activityLogReducer from "./activityLogSlice";
import countriesReducer from "./countriesSlice";
import countryReducer from "./countrySlice";

// Persist config for auth
const authPersistConfig = {
  key: "auth",
  storage,
};

// Persist config for minimized modules
const minimizedModulesPersistConfig = {
  key: "minimizedModules",
  storage,
};

// Create persisted reducers
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedMinimizedModulesReducer = persistReducer(
  minimizedModulesPersistConfig,
  minimizedModulesReducer
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    api: apiSlice.reducer,
    language: languageReducer,
    minimizedModules: persistedMinimizedModulesReducer,
    websocket: websocketReducer,
    notifications: notificationReducer, // Changed from 'notification' to 'notifications' to match your middleware
    data: dataReducer,
    activityLogs: activityLogReducer,
    countries: countriesReducer,
    country: countryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
          "persist/FLUSH",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PERSIST",
          "persist/PURGE",
          "persist/REGISTER",
          "websocket/messageReceived",
          "notifications/addNotification", // Add this for notification actions
        ],
      },
    })
      .concat(apiSlice.middleware) // Keep your existing API middleware
      .concat(websocketMiddleware), // Add WebSocket middleware
});

// Enable listener behavior for the store
setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Log the initial state
console.log("🟡 STORE: Initial state:", store.getState());

// Subscribe to state changes
store.subscribe(() => {
  const state = store.getState();
  console.log("🟡 STORE: State changed:", {
    minimizedModules: state.minimizedModules,
    auth: state.auth,
    websocket: state.websocket, // Add WebSocket state logging
    notifications: state.notifications, // Add notifications state logging
  });
});
