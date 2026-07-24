import otRequestService from "../services/otrequest.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { emitToRooms } from "../socket/emitter.js";

class OTRequestController {
  submitRequest = asyncHandler(async (req, res) => {
    const userId = req.user.id || req.user._id;
    const request = await otRequestService.submitOTRequest(userId, req.body);

    // Socket Event: overtime:created
    const managerId = req.user.manager ? (req.user.manager._id || req.user.manager).toString() : null;
    const rooms = ["role:admin"];
    if (managerId) rooms.push(`manager:${managerId}`);

    emitToRooms(rooms, "overtime:created", {
      requestId: request._id,
      userId: userId.toString(),
      userName: req.user.name,
      hours: request.requestedHours,
      timestamp: new Date(),
    });

    res.success(201, "Overtime request submitted successfully.", request);
  });

  approve = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { remarks } = req.body;
    const request = await otRequestService.reviewOTRequest(id, "approved", remarks);

    // Socket Event: overtime:approved
    const empId = request.user ? (request.user._id || request.user).toString() : null;
    const mgrId = req.user.id || req.user._id;
    const rooms = ["role:admin", `manager:${mgrId.toString()}`];
    if (empId) rooms.push(`user:${empId}`);

    emitToRooms(rooms, "overtime:approved", {
      requestId: request._id,
      userId: empId,
      status: "approved",
      remarks: request.remarks,
      timestamp: new Date(),
    });

    res.success(200, "Overtime request approved.", request);
  });

  reject = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { remarks } = req.body;
    const request = await otRequestService.reviewOTRequest(id, "rejected", remarks);

    // Socket Event: overtime:rejected
    const empId = request.user ? (request.user._id || request.user).toString() : null;
    const mgrId = req.user.id || req.user._id;
    const rooms = ["role:admin", `manager:${mgrId.toString()}`];
    if (empId) rooms.push(`user:${empId}`);

    emitToRooms(rooms, "overtime:rejected", {
      requestId: request._id,
      userId: empId,
      status: "rejected",
      remarks: request.remarks,
      timestamp: new Date(),
    });

    res.success(200, "Overtime request rejected.", request);
  });

  getMe = asyncHandler(async (req, res) => {
    const userId = req.user.id || req.user._id;
    const requests = await otRequestService.getPersonalOTRequests(userId);
    res.success(200, "Personal overtime requests fetched.", requests);
  });

  getTeam = asyncHandler(async (req, res) => {
    const managerId = req.user.id || req.user._id;
    const requests = await otRequestService.getTeamOTRequests(managerId);
    res.success(200, "Team overtime requests fetched.", requests);
  });

  getAll = asyncHandler(async (req, res) => {
    const requests = await otRequestService.getAllOTRequests();
    res.success(200, "All overtime requests fetched.", requests);
  });
}

export default new OTRequestController();
