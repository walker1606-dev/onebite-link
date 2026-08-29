"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createClient } from "@/utils/supabase/client";
import type { Folder } from "@/lib/mock-data";

interface FoldersContextValue {
  folders: Folder[];
  isAddingFolder: boolean;
  addFolder: (name: string) => Promise<void>;
  deleteFolder: (folderId: string) => void;
  renameFolder: (folderId: string, name: string) => Promise<void>;
}

const FoldersContext = createContext<FoldersContextValue | null>(null);

export function FoldersProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const isAddingRef = useRef(false);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("folders")
      .select("id, name")
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (!data) return;
        setFolders(data.map((row) => ({ id: String(row.id), name: row.name })));
      });
  }, []);

  async function addFolder(name: string) {
    if (isAddingRef.current) return;
    isAddingRef.current = true;
    setIsAddingFolder(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("folders")
        .insert({ name })
        .select("id, name")
        .single();
      if (error || !data) return;
      setFolders((prev) => [...prev, { id: String(data.id), name: data.name }]);
    } finally {
      isAddingRef.current = false;
      setIsAddingFolder(false);
    }
  }

  function deleteFolder(folderId: string) {
    setFolders((prev) => prev.filter((folder) => folder.id !== folderId));
  }

  async function renameFolder(folderId: string, name: string) {
    const supabase = createClient();
    const { error } = await supabase
      .from("folders")
      .update({ name })
      .eq("id", folderId);
    if (error) return;
    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === folderId ? { ...folder, name } : folder
      )
    );
  }

  return (
    <FoldersContext.Provider
      value={{ folders, isAddingFolder, addFolder, deleteFolder, renameFolder }}
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
