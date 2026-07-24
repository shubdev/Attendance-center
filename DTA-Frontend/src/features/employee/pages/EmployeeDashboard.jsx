import { useState } from "react";
import dayjs from "dayjs";
import { useGetAttendanceMeQuery } from "../api/attendance.api.js";
import { useGetOTRequestsMeQuery } from "../../managers/api/overtimeApi.js";
import PunchTerminal from "../components/PunchTerminal.jsx";
import AttendanceLogsTable from "../components/AttendanceLogsTable.jsx";
import OvertimeRequestModal from "../components/OvertimeRequestModal.jsx";


function EmployeeDashboard() {


  const [isOTModalOpen, setIsOTModalOpen] = useState(false);
  const [otAttendanceId, setOtAttendanceId] = useState("");

  const { data: logsRes, refetch: refetchLogs } = useGetAttendanceMeQuery();
  const { refetch: refetchOT } = useGetOTRequestsMeQuery();

  const handleOpenOTModal = (attendanceId) => {
    setOtAttendanceId(attendanceId);
    setIsOTModalOpen(true);
  };

  const handleCloseOTModal = () => {
    setIsOTModalOpen(false);
    setOtAttendanceId("");
    refetchOT();
    refetchLogs();
  };


  const todayStr = dayjs().format("YYYY-MM-DD");
  const todayLog = logsRes?.data?.find((log) => log.date === todayStr);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <PunchTerminal
        todayLog={todayLog}
        refetchLogs={refetchLogs}
        onOpenOTModal={handleOpenOTModal}
      />
      <AttendanceLogsTable logs={logsRes?.data} />

      {isOTModalOpen && (
        <OvertimeRequestModal
          attendanceId={otAttendanceId}
          onClose={handleCloseOTModal}
        />
      )}
    </div>
  );
}

export default EmployeeDashboard;
