import { apiSlice } from "../../../store/apiSlice.js";

export const overtimeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    submitOTRequest: builder.mutation({
      query: (otData) => ({
        url: "/ot/request",
        method: "POST",
        body: otData,
      }),
      invalidatesTags: ["OTRequest", "Attendance"],
    }),
    approveOTRequest: builder.mutation({
      query: ({ id, remarks }) => ({
        url: `/ot/${id}/approve`,
        method: "PATCH",
        body: { remarks },
      }),
      invalidatesTags: ["OTRequest", "Attendance", "Report"],
    }),
    rejectOTRequest: builder.mutation({
      query: ({ id, remarks }) => ({
        url: `/ot/${id}/reject`,
        method: "PATCH",
        body: { remarks },
      }),
      invalidatesTags: ["OTRequest", "Attendance", "Report"],
    }),
    getOTRequestsMe: builder.query({
      query: () => "/ot/me",
      providesTags: ["OTRequest"],
    }),
    getOTRequestsTeam: builder.query({
      query: () => "/ot/team",
      providesTags: ["OTRequest"],
    }),
    getOTRequestsAll: builder.query({
      query: () => "/ot/all",
      providesTags: ["OTRequest"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useSubmitOTRequestMutation,
  useApproveOTRequestMutation,
  useRejectOTRequestMutation,
  useGetOTRequestsMeQuery,
  useGetOTRequestsTeamQuery,
  useGetOTRequestsAllQuery,
} = overtimeApi;
