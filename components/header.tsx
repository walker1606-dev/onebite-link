"use client";

import Link from "next/link";
import { useState } from "react";
import { PlusIcon, FolderPlusIcon } from "@/components/icons";
import NewFolderModal from "@/components/new-folder-modal";

interface HeaderProps {
  onCreateFolder: (name: string) => void;
}

export default function Header({ onCreateFolder }: HeaderProps) {
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);

  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--background)]/80 px-4 backdrop-blur-sm">
      <span className="text-base font-semibold tracking-tight text-[var(--text)]">
        한입 링크
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsFolderModalOpen(true)}
          className="icon-button-hover flex items-center gap-1.5 rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text)]"
        >
          <FolderPlusIcon className="h-4 w-4" />
          새 폴더
        </button>
        <Link
          href="/new"
          className="button-primary-hover flex items-center gap-1.5 rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white"
        >
          <PlusIcon className="h-4 w-4" />
          새 링크
        </Link>
      </div>

      {isFolderModalOpen && (
        <NewFolderModal
          onClose={() => setIsFolderModalOpen(false)}
          onCreate={onCreateFolder}
        />
      )}
    </header>
  );
}
