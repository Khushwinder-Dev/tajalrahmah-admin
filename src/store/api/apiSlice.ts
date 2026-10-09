/* eslint-disable no-empty-pattern */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define your base URL - adjust this to your server
// const BASE_URL = "http://localhost:3001/api"; // or your API URL
const BASE_URL = "https://rapidresturant.rapidsmarterp.com/api"; // or your API URL

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    // You can add headers here
    prepareHeaders: (headers, {}) => {
      // Add auth token if needed
      const token = localStorage.getItem("token"); // or get from state
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Country", "User", "Post", "Restaurant"],
  endpoints: () => ({
    // Base endpoints will be defined in separate files
  }),
});

export const {} = apiSlice;
