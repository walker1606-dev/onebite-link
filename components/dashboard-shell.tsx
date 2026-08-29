"use client";

import { useState } from "react";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import type { Folder } from "@/lib/mock-data";

interface DashboardShellProps {
  initialFolders: Folder[];
  children: React.ReactNode;
}

export default function DashboardShell({
  initialFolders,
  children,
}: DashboardShellProps) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);

  function handleCreateFolder(name: string) {
    const newFolder: Folder = {
      id: `folder-${Date.now()}`,
      name,
    };
    setFolders((prev) => [...prev, newFolder]);
  }

  function handleDeleteFolder(folderId: string) {
    setFolders((prev) => prev.filter((folder) => folder.id !== folderId));
  }

  return (
    <div className="flex h-full flex-col bg-[var(--background)]">
      <Header onCreateFolder={handleCreateFolder} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar folders={folders} onDeleteFolder={handleDeleteFolder} />
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
