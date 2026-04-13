import jwt from "jsonwebtoken";
import { redisClient } from "../lib/redis.js";

const SECRET = process.env.APP_SECRET || "appsecret";

export const saveToken = async (token, userId) => {
  const key = `token:${token}`;

  await redisClient.set(key, userId, {
    EX: 60 * 15, // ⏱ 15 menit (samain JWT expire)
  });

  return true;
};

export async function GenerateToken(payload) {
  const token = jwt.sign(payload, SECRET, {
    expiresIn: "15m",
  });

  await saveToken(token, payload.id);

  return token;
}

export function VerifyToken(token) {
  try {
    const payload = jwt.verify(token, SECRET);
    return payload;
  } catch (error) {
    console.log(error);
  }
}
