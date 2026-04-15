import { VerifyToken } from "../lib/jwt.js";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  const prefix = "Bearer ";

  if (!authHeader || !authHeader.startsWith(prefix)) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const token = authHeader.split(" ")[1];

  const decoded = VerifyToken(token);

  if (!decoded) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }

  req.user = decoded;
  next();
}
