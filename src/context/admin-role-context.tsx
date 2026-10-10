"use client";
import { createContext, useContext } from "react";
import { Role } from "../generated/prisma/enums";

export const AdminRoleContext = createContext<Role | null>(null);

export const AdminRoleProvider = ({
  role,
  children,
}: {
  role: Role;
  children: React.ReactNode;
}) => (
  <AdminRoleContext.Provider value={role}>{children}</AdminRoleContext.Provider>
);

export const useIsViewer = () => useContext(AdminRoleContext) === Role.VIEWER;
