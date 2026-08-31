import type { Metadata } from "next";
import DashboardShell from "@/components/dashboard-shell";

export const metadata: Metadata = {
  title: "전체 링크",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
