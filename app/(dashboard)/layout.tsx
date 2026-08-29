import DashboardShell from "@/components/dashboard-shell";
import { folders } from "@/lib/mock-data";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell initialFolders={folders}>{children}</DashboardShell>;
}
