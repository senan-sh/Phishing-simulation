import useUserContext from "@/context/UserContext/useUserContext";
import { userService } from "@/services/user.service";
import { useEffect, useState } from "react";

export default function useUserLoader() {
  const [loading, setLoading] = useState(true);
  const { setUser, user } = useUserContext();

  useEffect(() => {
    // (async () => {
    //   try {
    //     setLoading(true);
    //     const userDetails = await userService.getUserDetails();
    //     setUser(userDetails);
    //   } catch {
    //     setUser(null);
    //   } finally {
    //     setLoading(false);
    //   }
    // })();
  }, [setUser]);

  return { loading, user };
}
