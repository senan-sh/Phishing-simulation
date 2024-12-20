import { useContext } from "react";
import { UserContext } from ".";

export default function useUserContext() {
  return useContext(UserContext);
}
