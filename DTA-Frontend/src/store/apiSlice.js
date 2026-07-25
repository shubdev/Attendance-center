import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const backendUrl = import.meta.env.VITE_BASE_URI && import.meta.env.VITE_BASE_URI.includes('localhost') 
  ? 'http://localhost:3000' 
  : (import.meta.env.VITE_BASE_URI || "https://attendance-management-system-7evz.onrender.com");

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${backendUrl}/api/v1`,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ["User", "Attendance", "OTRequest", "Report"],
  endpoints: () => ({}),
});
