import toast from "react-hot-toast";
import {
  useSubmitOTRequestMutation,
  useApproveOTRequestMutation,
  useRejectOTRequestMutation,
} from "../api/overtimeApi.js";

export default function useOvertime() {
  const [submitOTRequest, { isLoading: isSubmitting }] = useSubmitOTRequestMutation();
  const [approveOTRequest, { isLoading: isApproving }] = useApproveOTRequestMutation();
  const [rejectOTRequest, { isLoading: isRejecting }] = useRejectOTRequestMutation();

  const handleOTSubmit = async (attendanceId, otHours, otReason, onClose) => {
    try {
      await submitOTRequest({
        attendanceId,
        requestedHours: Number(otHours),
        reason: otReason,
      }).unwrap();
      toast.success("Overtime request submitted!");
      if (onClose) onClose();
    } catch (err) {
      toast.error(err?.data?.message || "Submission failed");
    }
  };

  const handleOTDecision = async (id, approve, remarks, onSuccess) => {
    try {
      if (approve) {
        await approveOTRequest({ id, remarks }).unwrap();
        toast.success("Overtime request approved.");
      } else {
        await rejectOTRequest({ id, remarks }).unwrap();
        toast.success("Overtime request rejected.");
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error(err?.data?.message || "Action failed");
    }
  };

  return {
    handleOTSubmit,
    handleOTDecision,
    isSubmitting,
    isApproving,
    isRejecting,
  };
}
