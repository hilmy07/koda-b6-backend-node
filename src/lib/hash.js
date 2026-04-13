import argon2 from "argon2";

export default async function hashedPassword(param1, param2) {
  const hashedPassword = await argon2.verify(param1, param2);
  return hashedPassword;
}
