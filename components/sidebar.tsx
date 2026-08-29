"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FolderIcon, PencilIcon, TrashIcon } from "@/components/icons";
import DeleteFolderModal from "@/components/delete-folder-modal";
import EditFolderModal from "@/components/edit-folder-modal";
import { useFolders } from "@/contexts/folders-context";
import type { Folder } from "@/lib/mock-data";

export default function Sidebar() {
  const { folders, deleteFolder, renameFolder } = useFolders();
  const pathname = usePathname();
  const [folderToDelete, setFolderToDelete] = useState<Folder | null>(null);
  const [folderToEdit, setFolderToEdit] = useState<Folder | null>(null);

  return (
    <aside className="flex w-56 shrink-0 flex-col gap-1 overflow-y-auto border-r border-[var(--border)] p-4">
      <Link href="/" className={navItemClass(pathname === "/")}>
        All
      </Link>

      <p className="mt-4 mb-1 px-3 text-xs font-medium text-[var(--text-sub)]">
        폴더
      </p>
      {folders.map((folder) => {
        const href = `/folder/${folder.id}`;
        return (
          <div key={folder.id} className="group relative">
            <Link href={href} className={navItemClass(pathname === href)}>
              <FolderIcon className="h-4 w-4 shrink-0" />
              <span className="min-w-0 flex-1 truncate">{folder.name}</span>
              <button
                type="button"
                aria-label={`${folder.name} 폴더 수정`}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setFolderToEdit(folder);
                }}
                className="icon-button-hover invisible ml-1 shrink-0 rounded p-1 text-[var(--text-sub)] group-hover:visible"
              >
                <PencilIcon className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                aria-label={`${folder.name} 폴더 삭제`}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setFolderToDelete(folder);
                }}
                className="icon-button-hover invisible shrink-0 rounded p-1 text-[var(--text-sub)] group-hover:visible"
              >
                <TrashIcon className="h-3.5 w-3.5" />
              </button>
            </Link>
          </div>
        );
      })}

      {folderToDelete && (
        <DeleteFolderModal
          folder={folderToDelete}
          onClose={() => setFolderToDelete(null)}
          onConfirm={deleteFolder}
        />
      )}

      {folderToEdit && (
        <EditFolderModal
          folder={folderToEdit}
          onClose={() => setFolderToEdit(null)}
          onRename={renameFolder}
        />
      )}
    </aside>
  );
}

function navItemClass(active: boolean) {
  return [
    "nav-item-hover flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium",
    active ? "bg-[var(--hover-bg)] text-[var(--text)]" : "text-[var(--text-sub)]",
  ].join(" ");
}
