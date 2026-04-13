import jwt from "jsonwebtoken";

const SECRET = process.env.APP_SECRET || "appsecret";

export function GenerateToken(payload) {
  return jwt.sign(payload, SECRET, {
    expiresIn: "15m",
  });
}

export function VerifyToken(token) {
  try {
    const payload = jwt.verify(token, SECRET);
    return payload;
  } catch (error) {
    console.log(error);
  }
}
