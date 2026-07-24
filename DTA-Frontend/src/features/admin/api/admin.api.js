import { apiSlice } from "../../../store/apiSlice.js";

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDailyReport: builder.query({
      query: (params) => ({
        url: "/reports",
        params,
      }),
      providesTags: ["Report"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetDailyReportQuery,
} = adminApi;
