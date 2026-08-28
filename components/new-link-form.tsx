"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import type { Folder } from "@/lib/mock-data";

interface NewLinkFormProps {
  folders: Folder[];
}

export default function NewLinkForm({ folders }: NewLinkFormProps) {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex max-w-lg flex-col gap-6">
      <h2 className="text-lg font-semibold text-[var(--text)]">
        새 링크 추가
      </h2>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="url"
          className="text-sm font-medium text-[var(--text)]"
        >
          링크 주소
        </label>
        <input
          id="url"
          type="url"
          required
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://example.com"
          className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="folder"
          className="text-sm font-medium text-[var(--text)]"
        >
          폴더
        </label>
        <select
          id="folder"
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

      <button
        type="submit"
        disabled={url.trim().length === 0}
        className="button-primary-hover rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        저장하기
      </button>
    </form>
  );
}
