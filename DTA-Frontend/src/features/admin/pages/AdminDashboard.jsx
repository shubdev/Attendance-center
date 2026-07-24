import { useState } from "react";
import dayjs from "dayjs";
import { Outlet } from "react-router-dom";
import { useGetAllUsersQuery } from "../../auth/api/auth.api.js";
import { useGetDailyReportQuery } from "../api/admin.api.js";
import Navigations from "../components/Navigations.jsx";


function AdminDashboard() {

  const [reportDate, setReportDate] = useState(dayjs().format("YYYY-MM-DD"));

  const { data: usersRes } = useGetAllUsersQuery();
  const { data: reportRes } = useGetDailyReportQuery({ date: reportDate });

  return (
    <div className="space-y-6">
      <Navigations usersRes={usersRes} />
      <Outlet context={{ usersRes: usersRes?.data, reportRes, reportDate, setReportDate }} />

    </div>
  );
}

export default AdminDashboard;