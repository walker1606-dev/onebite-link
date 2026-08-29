"use client";

import { notFound, useParams } from "next/navigation";
import LinkGrid from "@/components/link-grid";
import { useLinks } from "@/contexts/links-context";
import { folders } from "@/lib/mock-data";

export default function FolderPage() {
  const { folderId } = useParams<{ folderId: string }>();
  const { links } = useLinks();
  const folder = folders.find((item) => item.id === folderId);

  if (!folder) {
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
