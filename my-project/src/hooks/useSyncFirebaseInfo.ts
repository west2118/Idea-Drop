import { auth } from "@/lib/firebase";
import { useUserStore } from "@/stores/useUserStore";
import axios from "axios";
import { useEffect } from "react";

export const useSyncFirebaseInfo = () => {
  const setUserToken = useUserStore((state) => state.setUserToken);
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  useEffect(() => {
    const fetchUserInfo = async (token: string) => {
      try {
        const response = await axios.get("/api/user/getUser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response?.data?.user);
      } catch (error) {
        clearUser();
      }
    };

    const syncAuth = async () => {
      const user = auth.currentUser;
      if (!user) {
        clearUser();
        return;
      }

      const token = await user.getIdToken();
      setUserToken(token);
      await fetchUserInfo(token);
    };

    syncAuth();

    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      const newToken = await user?.getIdToken();
      setUserToken(newToken ?? null);

      if (newToken) {
        await fetchUserInfo(newToken);
      } else {
        clearUser();
      }
    });

    return () => unsubscribe();
  }, [setUserToken, setUser, clearUser]);
};
