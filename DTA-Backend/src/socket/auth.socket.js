import { verifyAccessToken } from "../utils/token.utils.js";
import MongoUserRepository from "../repository/mongo.user.js";

const parseCookies = (cookieHeader) => {
  if (!cookieHeader) return {};
  const cookies = {};
  cookieHeader.split(";").forEach((cookie) => {
    const parts = cookie.split("=");
    const key = parts[0] ? parts[0].trim() : "";
    if (key) {
      cookies[key] = parts.slice(1).join("=").trim();
    }
  });
  return cookies;
};

export const socketAuthMiddleware = async (socket, next) => {
  try {
    const rawCookies = socket.request.headers.cookie;
    if (!rawCookies) {
      return next(new Error("Authentication error: No cookies found"));
    }

    const parsedCookies = parseCookies(rawCookies);
    const token = parsedCookies.token;

    if (!token) {
      return next(new Error("Authentication error: Token missing"));
    }

    const decoded = verifyAccessToken(token);
    if (!decoded || !decoded.id) {
      return next(new Error("Authentication error: Invalid token"));
    }

    const user = await MongoUserRepository.findUserById(decoded.id);
    if (!user) {
      return next(new Error("Authentication error: User not found"));
    }

    // Attach safe user details to socket instance
    socket.user = {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      manager: user.manager ? (user.manager._id || user.manager).toString() : null,
    };

    next();
  } catch (error) {
    return next(new Error("Authentication error: Unauthorized connection"));
  }
};
