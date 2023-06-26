import { useGetUserInfoQuery } from "../api/goalApi";
import { createContext } from "react";

import { UserData } from "../api/goalApi";

export const IdentityContext = createContext<UserData | null | undefined>(null);

export const IdentityProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data, isError } = useGetUserInfoQuery();

  return (
    <IdentityContext.Provider value={isError ? null : data}>
      {children}
    </IdentityContext.Provider>
  );
};
