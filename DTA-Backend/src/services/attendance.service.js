import MongoAttendanceRepository from "../repository/mongo.attendance.js";
import MongoUserRepository from "../repository/mongo.user.js";
import { AppError } from "../utils/error.utils.js";
import { saveBase64Image, getHaversineDistance } from "../utils/file.utils.js";
import { GEOFENCING_LAT, GEOFENCING_LON, GEOFENCING_RADIUS } from "../config/env.config.js";

class AttendanceService {

  getLocalDateString(dateObj = new Date()) {
    // Force Asia/Kolkata timezone for date consistency between server and client
    const formatter = new Intl.DateTimeFormat('en-CA', { 
      timeZone: 'Asia/Kolkata', 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    });
    return formatter.format(dateObj);
  }


  async punchIn(userId, { selfie, location }) {
    const todayStr = this.getLocalDateString();


    const existing = await MongoAttendanceRepository.findAttendanceByEmployeeAndDate(userId, todayStr);
    if (existing) {
      throw new AppError(400, "You have already punched in today.");
    }

    // Geofencing check (Optional based on environment config)
    const gfLat = GEOFENCING_LAT;
    const gfLon = GEOFENCING_LON;
    const gfRadius = GEOFENCING_RADIUS ? parseFloat(GEOFENCING_RADIUS) : 300;

    if (gfLat && gfLon) {
      const distance = getHaversineDistance(
        parseFloat(gfLat),
        parseFloat(gfLon),
        location.latitude,
        location.longitude
      );
      if (distance > gfRadius) {
        throw new AppError(400, `Geofence verification failed. You are ${Math.round(distance)}m away from the office.`);
      }
    }

    // Save selfie
    let selfieUrl;
    try {
      selfieUrl = saveBase64Image(selfie, "attendance");
    } catch (error) {
      throw new AppError(400, "Failed to process webcam image.");
    }

    // Create attendance record
    const attendance = await MongoAttendanceRepository.createAttendance({
      employee: userId,
      date: todayStr,
      punchIn: new Date(),
      selfieUrl,
      location,
      status: "pending",
    });

    return attendance;
  }


  async punchOut(userId, { selfie, location }) {
    const todayStr = this.getLocalDateString();

    // Find the attendance record for today
    const attendance = await MongoAttendanceRepository.findAttendanceByEmployeeAndDate(userId, todayStr);
    if (!attendance) {
      throw new AppError(404, "No punch-in record found for today.");
    }
    if (attendance.punchOut) {
      throw new AppError(400, "You have already punched out today.");
    }
    if (!selfie) {
      throw new AppError(400, "Punch-out selfie is required.");
    }
    if (!location || location.latitude == null || location.longitude == null) {
      throw new AppError(400, "Punch-out location is required.");
    }

    // Geofencing check (Optional based on environment config)
    const gfLat = GEOFENCING_LAT;
    const gfLon = GEOFENCING_LON;
    const gfRadius = GEOFENCING_RADIUS ? parseFloat(GEOFENCING_RADIUS) : 300;

    if (gfLat && gfLon) {
      const distance = getHaversineDistance(
        parseFloat(gfLat),
        parseFloat(gfLon),
        location.latitude,
        location.longitude
      );
      if (distance > gfRadius) {
        throw new AppError(400, `Geofence verification failed on punch-out. You are ${Math.round(distance)}m away from the office.`);
      }
    }

    let punchOutSelfieUrl;
    try {
      punchOutSelfieUrl = saveBase64Image(selfie, "attendance");
    } catch (error) {
      throw new AppError(400, "Failed to process punch-out image.");
    }

    const punchOutTime = new Date();
    const punchInTime = new Date(attendance.punchIn);
    const diffMs = punchOutTime - punchInTime;
    const workingHours = parseFloat((diffMs / (1000 * 60 * 60)).toFixed(2)); // working hours in hours

    const updated = await MongoAttendanceRepository.updateAttendance(attendance._id, {
      punchOut: punchOutTime,
      punchOutSelfieUrl,
      punchOutLocation: location,
      workingHours,
    });

    return updated;
  }


  async verifyAttendance(attendanceId, { status, remarks }) {
    const attendance = await MongoAttendanceRepository.findAttendanceById(attendanceId);
    if (!attendance) {
      throw new AppError(404, "Attendance record not found.");
    }

    return await MongoAttendanceRepository.updateAttendance(attendanceId, {
      status,
      remarks,
    });
  }


  async getPersonalLogs(userId, filters = {}) {
    const query = { employee: userId };
    this.applyDateFilters(query, filters);
    return await MongoAttendanceRepository.findAttendance(query);
  }


  async getTeamLogs(managerId, filters = {}) {

    const users = await MongoUserRepository.findAllUsers();
    const teamUserIds = users.filter((u) => u.manager && u.manager._id.toString() === managerId.toString()).map((u) => u._id);

    const query = { employee: { $in: teamUserIds } };
    this.applyDateFilters(query, filters);
    return await MongoAttendanceRepository.findAttendance(query);
  }


  async getAllLogs(filters = {}) {
    const query = {};
    if (filters.employeeId) {
      query.employee = filters.employeeId;
    }
    this.applyDateFilters(query, filters);
    return await MongoAttendanceRepository.findAttendance(query);
  }


  applyDateFilters(query, filters) {
    if (filters.startDate || filters.endDate) {
      query.punchIn = {};
      if (filters.startDate) {
        query.punchIn.$gte = new Date(filters.startDate);
      }
      if (filters.endDate) {
        // Set to end of the day
        const end = new Date(filters.endDate);
        end.setHours(23, 59, 59, 999);
        query.punchIn.$lte = end;
      }
    }
    if (filters.status) {
      query.status = filters.status;
    }
  }
}

export default new AttendanceService();
