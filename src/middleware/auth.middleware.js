import { VerifyToken } from "../lib/jwt.js";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const token = authHeader.split(" ")[1];

  const decoded = VerifyToken(token);

  if (!decoded) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  req.user = decoded;
  next();
}
