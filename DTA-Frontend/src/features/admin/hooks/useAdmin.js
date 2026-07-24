import { exportReportToCSV } from "../utils/csvHelper.js";

export default function useAdmin() {
  const handleExportCSV = (reportData, reportDate) => {
    exportReportToCSV(reportData, reportDate);
  };

  return {
    handleExportCSV,
  };
}
