"use server";

import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebaseAdmin";
import dbConnect from "@/lib/db";
import User from "@/models/user.model";

export async function setAuthCookie(token: string) {
  try {
    // Verify the token to make sure it's valid before setting the cookie
    await adminAuth.verifyIdToken(token);
    
    const cookieStore = await cookies();
    cookieStore.set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return { success: true };
  } catch (error) {
    console.error("Error setting auth cookie:", error);
    return { success: false, error: "Invalid token" };
  }
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("auth-token");
  return { success: true };
}

export async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;
  if (!token) return null;

  try {
    const decoded = await adminAuth.verifyIdToken(token);
    await dbConnect();
    const user = await User.findOne({ email: decoded.email }).lean();
    return user ? JSON.parse(JSON.stringify({ ...user, _id: (user as any)._id.toString() })) : null;
  } catch {
    return null;
  }
}

export async function authenticateAndCreateUser(
  token: string, 
  userData: { firstName?: string; lastName?: string; skills?: string[]; interests?: string[] }
) {
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    await dbConnect();

    const user = await User.findOneAndUpdate(
      { email: decoded.email },
      {
        email: decoded.email,
        ...(userData.firstName && { firstName: userData.firstName }),
        ...(userData.lastName && { lastName: userData.lastName }),
        ...(userData.skills && { skills: userData.skills }),
        ...(userData.interests && { interests: userData.interests }),
      },
      { upsert: true, new: true }
    ).lean();

    const cookieStore = await cookies();
    cookieStore.set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return JSON.parse(JSON.stringify({ success: true, user: { ...user, _id: (user as any)._id.toString() } }));
  } catch (error) {
    console.error("Authentication error:", error);
    return { success: false, error: "Invalid token" };
  }
}
