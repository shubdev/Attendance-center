import { apiSlice } from "../../../store/apiSlice.js";

export const attendanceApi = apiSlice.injectEndpoints({

  endpoints: (builder) => ({

    punchIn: builder.mutation({
      query: (punchData) => ({
        url: "/attendance/punch-in",
        method: "POST",
        body: punchData,
      }),
      invalidatesTags: ["Attendance", "Report"],
    }),


    punchOut: builder.mutation({
      query: (punchData) => ({
        url: "/attendance/punch-out",
        method: "PATCH",
        body: punchData,
      }),
      invalidatesTags: ["Attendance", "Report"],
    }),


    getAttendanceMe: builder.query({
      query: (params) => ({
        url: "/attendance/me",
        params,
      }),
      providesTags: ["Attendance"],
    }),


    getAttendanceTeam: builder.query({
      query: (params) => ({
        url: "/attendance/team",
        params,
      }),
      providesTags: ["Attendance"],
    }),


    getAttendanceAll: builder.query({
      query: (params) => ({
        url: "/attendance/all",
        params,
      }),
      providesTags: ["Attendance"],
    }),


    verifyAttendance: builder.mutation({
      query: ({ id, status, remarks }) => ({
        url: `/attendance/${id}/verify`,
        method: "PATCH",
        body: { status, remarks },
      }),
      invalidatesTags: ["Attendance", "Report"],
    }),

  }),

  overrideExisting: false

});

export const { usePunchInMutation, usePunchOutMutation, useGetAttendanceMeQuery, useGetAttendanceTeamQuery, useGetAttendanceAllQuery, useVerifyAttendanceMutation } = attendanceApi;