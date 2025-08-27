"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "@/app/store/hooks";
import { usersSelector } from "@/app/slices/usersSlice";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userName } = useAppSelector(usersSelector);
  const router = useRouter();

  useEffect(() => {
    if (!userName) {
      router.replace("/login");
    }
  }, [userName, router]);

  if (!userName) return null;
  return children;
}
