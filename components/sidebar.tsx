"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderIcon } from "@/components/icons";
import type { Folder } from "@/lib/mock-data";

interface SidebarProps {
  folders: Folder[];
}

export default function Sidebar({ folders }: SidebarProps) {
  const pathname = usePathname();

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
          <Link
            key={folder.id}
            href={href}
            className={navItemClass(pathname === href)}
          >
            <FolderIcon className="h-4 w-4 shrink-0" />
            <span className="truncate">{folder.name}</span>
          </Link>
        );
      })}
    </aside>
  );
}

function navItemClass(active: boolean) {
  return [
    "nav-item-hover flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium",
    active ? "bg-[var(--hover-bg)] text-[var(--text)]" : "text-[var(--text-sub)]",
  ].join(" ");
}
