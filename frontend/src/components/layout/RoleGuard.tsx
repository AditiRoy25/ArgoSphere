"use client";

import { useAuth } from "../../hooks/useAuth";

export default function RoleGuard({
  role,
  children,
}: {
  role: string;
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  if (
    !user ||
    user.role !== role
  ) {
    return null;
  }

  return <>{children}</>;
}