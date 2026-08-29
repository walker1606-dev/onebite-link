"use client";

import { createPortal } from "react-dom";
import type { LinkItem } from "@/lib/mock-data";

interface DeleteLinkModalProps {
  link: LinkItem;
  onClose: () => void;
  onConfirm: (linkId: string) => Promise<void>;
}

export default function DeleteLinkModal({
  link,
  onClose,
  onConfirm,
}: DeleteLinkModalProps) {
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex w-full max-w-sm flex-col gap-4 rounded-lg bg-[var(--surface)] p-6 shadow-lg"
      >
        <h2 className="text-base font-semibold text-[var(--text)]">
          링크를 삭제할까요?
        </h2>

        <p className="text-sm text-[var(--text-sub)]">
          {`'${link.title}' 링크를 삭제하면 되돌릴 수 없습니다.`}
        </p>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="icon-button-hover rounded-md px-4 py-2 text-sm font-medium text-[var(--text-sub)]"
          >
            취소
          </button>
          <button
            type="button"
            onClick={async () => {
              await onConfirm(link.id);
              onClose();
            }}
            className="rounded-md bg-[var(--error)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            삭제
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
