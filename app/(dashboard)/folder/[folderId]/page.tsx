import { notFound } from "next/navigation";
import LinkGrid from "@/components/link-grid";
import { folders, links } from "@/lib/mock-data";

export default async function FolderPage({
  params,
}: {
  params: Promise<{ folderId: string }>;
}) {
  const { folderId } = await params;
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
