import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PROJECT_ID!,
    clientEmail: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_EMAIL!,
    privateKey: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY!.replace(
      /\\n/g,
      "\n"
    ),
  }),
};

if (!getApps().length) {
  initializeApp(firebaseAdminConfig);
}

export const adminAuth = getAuth();
