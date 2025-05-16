import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getUserFromCookie() {
  const cookie = await cookies().get("ourhaikuapp")?.value;
  if (cookie) {
    try {
      const decoded = jwt.verify(cookie, process.env.JWT_SECRET);
      return decoded;
    } catch (error) {
      return null;
    }
  }
}
