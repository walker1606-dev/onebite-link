"use client";

import { notFound, useParams } from "next/navigation";
import LinkGrid from "@/components/link-grid";
import { useFolders } from "@/contexts/folders-context";
import { useLinks } from "@/contexts/links-context";

export default function FolderPage() {
  const { folderId } = useParams<{ folderId: string }>();
  const { folders, isLoadingFolders } = useFolders();
  const { links } = useLinks();
  const folder = folders.find((item) => item.id === folderId);

  if (!folder) {
    if (isLoadingFolders) return null;
    notFound();
  }

  const folderLinks = links.filter((link) => link.folderId === folderId);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-lg font-semibold text-[var(--text)]">
        {folder.name}
      </h2>
      <LinkGrid links={folderLinks} />
    </div>
  );
}
