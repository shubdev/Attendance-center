let ioInstance = null;

export const setIO = (io) => {
  ioInstance = io;
};

export const getIO = () => {
  return ioInstance;
};

/**
 * Helper to emit Socket.IO events to specific rooms safely
 * @param {string|string[]} rooms - Room name or array of room names
 * @param {string} event - Event name
 * @param {object} payload - Lightweight payload
 */
export const emitToRooms = (rooms, event, payload) => {
  if (!ioInstance) {
    return;
  }
  const roomList = Array.isArray(rooms) ? rooms : [rooms];
  const validRooms = roomList.filter(Boolean);

  if (validRooms.length > 0) {
    validRooms.forEach((room) => {
      ioInstance.to(room).emit(event, payload);
    });
  }
};
