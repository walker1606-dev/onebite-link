"use client";

import { useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { useFolders } from "@/contexts/folders-context";
import type { LinkUpdateInput } from "@/contexts/links-context";
import type { LinkItem } from "@/lib/mock-data";

interface EditLinkModalProps {
  link: LinkItem;
  onClose: () => void;
  onSave: (linkId: string, input: LinkUpdateInput) => void;
}

export default function EditLinkModal({
  link,
  onClose,
  onSave,
}: EditLinkModalProps) {
  const { folders } = useFolders();
  const [folderId, setFolderId] = useState(link.folderId);
  const [title, setTitle] = useState(link.title);
  const [description, setDescription] = useState(link.description);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (trimmedTitle.length === 0) return;

    onSave(link.id, {
      folderId,
      title: trimmedTitle,
      description: description.trim(),
    });
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
          링크 정보 수정
        </h2>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="edit-link-folder"
            className="text-sm font-medium text-[var(--text)]"
          >
            폴더
          </label>
          <select
            id="edit-link-folder"
            value={folderId}
            onChange={(event) => setFolderId(event.target.value)}
            className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--accent)]"
          >
            <option value="">폴더 선택 안 함</option>
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="edit-link-title"
            className="text-sm font-medium text-[var(--text)]"
          >
            제목
          </label>
          <input
            id="edit-link-title"
            type="text"
            autoFocus
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="edit-link-description"
            className="text-sm font-medium text-[var(--text)]"
          >
            설명
          </label>
          <textarea
            id="edit-link-description"
            rows={3}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="resize-none rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
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
            disabled={title.trim().length === 0}
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
