"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { folders as initialFolders, type Folder } from "@/lib/mock-data";

interface FoldersContextValue {
  folders: Folder[];
  addFolder: (name: string) => void;
  deleteFolder: (folderId: string) => void;
  renameFolder: (folderId: string, name: string) => void;
}

const FoldersContext = createContext<FoldersContextValue | null>(null);

export function FoldersProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);

  function addFolder(name: string) {
    const newFolder: Folder = {
      id: `folder-${Date.now()}`,
      name,
    };
    setFolders((prev) => [...prev, newFolder]);
  }

  function deleteFolder(folderId: string) {
    setFolders((prev) => prev.filter((folder) => folder.id !== folderId));
  }

  function renameFolder(folderId: string, name: string) {
    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === folderId ? { ...folder, name } : folder
      )
    );
  }

  return (
    <FoldersContext.Provider
      value={{ folders, addFolder, deleteFolder, renameFolder }}
    >
      {children}
    </FoldersContext.Provider>
  );
}

export function useFolders(): FoldersContextValue {
  const context = useContext(FoldersContext);
  if (!context) {
    throw new Error("useFolders must be used within FoldersProvider");
  }
  return context;
}
