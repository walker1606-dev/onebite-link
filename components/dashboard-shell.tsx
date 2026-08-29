"use client";

import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { FoldersProvider } from "@/contexts/folders-context";
import { LinksProvider } from "@/contexts/links-context";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FoldersProvider>
      <LinksProvider>
        <div className="flex h-full flex-col bg-[var(--background)]">
          <Header />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-8">{children}</main>
          </div>
        </div>
      </LinksProvider>
    </FoldersProvider>
  );
}
