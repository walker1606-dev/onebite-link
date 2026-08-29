"use client";

import { useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import type { Folder } from "@/lib/mock-data";

interface EditFolderModalProps {
  folder: Folder;
  onClose: () => void;
  onRename: (folderId: string, name: string) => Promise<void>;
}

export default function EditFolderModal({
  folder,
  onClose,
  onRename,
}: EditFolderModalProps) {
  const [name, setName] = useState(folder.name);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length === 0) return;
    await onRename(folder.id, trimmed);
    onClose();
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(event) => event.stopPropagation()}
        className="flex w-full max-w-sm flex-col gap-4 rounded-lg bg-[var(--surface)] p-6 shadow-lg"
      >
        <h2 className="text-base font-semibold text-[var(--text)]">
          폴더 이름 수정
        </h2>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="edit-folder-name"
            className="text-sm font-medium text-[var(--text)]"
          >
            폴더 이름
          </label>
          <input
            id="edit-folder-name"
            type="text"
            autoFocus
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="폴더 이름을 입력하세요"
            className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="icon-button-hover rounded-md px-4 py-2 text-sm font-medium text-[var(--text-sub)]"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={name.trim().length === 0}
            className="button-primary-hover rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            저장
          </button>
        </div>
      </form>
    </div>,
    document.body
  );
}
