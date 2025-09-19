"use client";

import { useSyncFirebaseInfo } from "@/hooks/useSyncFirebaseInfo";

export const UserSyncProvider = () => {
  useSyncFirebaseInfo();
  return null;
};
