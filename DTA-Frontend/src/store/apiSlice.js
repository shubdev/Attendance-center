import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
    credentials: "include"
  }),
  tagTypes: ["User", "Attendance", "OTRequest", "Report"],
  endpoints: () => ({}),
});
