import React, { useState } from "react";
import { notImplementedYet } from "../../errors/notImplementedYet";
import { Nullable } from "../../types/nullable";

interface TUserContext {
  user: unknown;
  setUser: (user: unknown) => void;
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
  const [user, setUser] = useState<Nullable<unknown>>(null);

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
