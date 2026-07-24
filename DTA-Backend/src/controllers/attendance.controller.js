import attendanceService from "../services/attendance.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { emitToRooms } from "../socket/emitter.js";

class AttendanceController {
  punchIn = asyncHandler(async (req, res) => {
    const userId = req.user.id || req.user._id;
    const record = await attendanceService.punchIn(userId, req.body);

    // Socket Event: attendance:punch-in
    const managerId = req.user.manager ? (req.user.manager._id || req.user.manager).toString() : null;
    const rooms = ["role:admin"];
    if (managerId) rooms.push(`manager:${managerId}`);

    emitToRooms(rooms, "attendance:punch-in", {
      recordId: record._id,
      userId: userId.toString(),
      userName: req.user.name,
      punchIn: record.punchIn,
      timestamp: new Date(),
    });

    res.success(201, "Punched in successfully.", record);
  });

  punchOut = asyncHandler(async (req, res) => {
    const userId = req.user.id || req.user._id;
    const record = await attendanceService.punchOut(userId, req.body);

    // Socket Event: attendance:punch-out
    const managerId = req.user.manager ? (req.user.manager._id || req.user.manager).toString() : null;
    const rooms = [`user:${userId.toString()}`, "role:admin"];
    if (managerId) rooms.push(`manager:${managerId}`);

    emitToRooms(rooms, "attendance:punch-out", {
      recordId: record._id,
      userId: userId.toString(),
      userName: req.user.name,
      punchOut: record.punchOut,
      workHours: record.workHours,
      timestamp: new Date(),
    });

    res.success(200, "Punched out successfully.", record);
  });

  getMe = asyncHandler(async (req, res) => {
    const userId = req.user.id || req.user._id;
    const logs = await attendanceService.getPersonalLogs(userId, req.query);
    res.success(200, "Personal attendance logs fetched.", logs);
  });

  getTeam = asyncHandler(async (req, res) => {
    const managerId = req.user.id || req.user._id;
    const logs = await attendanceService.getTeamLogs(managerId, req.query);
    res.success(200, "Team attendance logs fetched.", logs);
  });

  getAll = asyncHandler(async (req, res) => {
    const logs = await attendanceService.getAllLogs(req.query);
    res.success(200, "All attendance logs fetched.", logs);
  });

  verify = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const record = await attendanceService.verifyAttendance(id, req.body);

    // Socket Event: attendance:verified
    const empId = record.user ? (record.user._id || record.user).toString() : null;
    const mgrId = req.user.id || req.user._id;
    const rooms = ["role:admin", `manager:${mgrId.toString()}`];
    if (empId) rooms.push(`user:${empId}`);

    emitToRooms(rooms, "attendance:verified", {
      recordId: record._id,
      userId: empId,
      status: record.status,
      remarks: record.remarks,
      timestamp: new Date(),
    });

    res.success(200, "Attendance log verified successfully.", record);
  });
}

export default new AttendanceController();
