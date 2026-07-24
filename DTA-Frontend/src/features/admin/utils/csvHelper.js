import dayjs from "dayjs";
import toast from "react-hot-toast";

export const exportReportToCSV = (reportData, reportDate) => {
  if (!reportData?.length) {
    toast.error("No data available to export");
    return;
  }

  const headers = [
    "Employee Name",
    "Email",
    "Date",
    "Punch In",
    "Punch Out",
    "Working Hours",
    "Status",
    "OT Status",
    "OT Hours",
  ];
  const rows = reportData.map((row) => [
    row.employeeName,
    row.employeeEmail,
    row.date,
    dayjs(row.punchIn).format("hh:mm A"),
    row.punchOut ? dayjs(row.punchOut).format("hh:mm A") : "Active",
    row.workingHours,
    row.status,
    row.overtimeStatus,
    row.overtimeHours,
  ]);

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers.join(","), ...rows.map((e) => e.map((val) => `"${val}"`).join(","))].join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `attendance_report_${reportDate}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  toast.success("CSV Report downloaded successfully!");
};
