import React, { useState } from "react";
import { notImplementedYet } from "../../errors/notImplementedYet";
import { Nullable } from "../../types/nullable";
import { User } from "@/types/user";

interface TUserContext {
  user: Nullable<User>;
  setUser: (user: Nullable<User>) => void;
}

const initialUserContext: TUserContext = {
  setUser: notImplementedYet,
  user: null,
};

export const UserContext = React.createContext<TUserContext>(initialUserContext);

interface UserProviderProps {
  children: React.ReactElement;
}
export const UserProvider = (props: UserProviderProps) => {
  const [user, setUser] = useState<Nullable<User>>(null);

  return (
    <UserContext.Provider
      value={{
        setUser,
        user,
      }}
      children={props.children}
    />
  );
};
