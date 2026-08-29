"use client";

import { createContext, useContext } from "react";
import { UserType } from "../lib/types/user.type";

type UserContextType = {
  user: Pick<
    UserType,
    "id" | "username" | "email" | "image" | "role" | "isBanned"
  > | null;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({
  user,
  children,
}: {
  user: UserContextType["user"];
  children: React.ReactNode;
}) {
  return <UserContext.Provider value={{user}}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("err context user");
  }
  return context;
}
