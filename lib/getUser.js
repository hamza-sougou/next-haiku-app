import { cookies } from "next/headers";

export async function getUserFromCookie() {
  const cookieStore = cookies().get("ourhaikuapp");
}
