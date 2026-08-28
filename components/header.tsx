import Link from "next/link";
import { PlusIcon } from "@/components/icons";

export default function Header() {
  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--background)]/80 px-4 backdrop-blur-sm">
      <span className="text-base font-semibold tracking-tight text-[var(--text)]">
        한입 링크
      </span>
      <Link
        href="/new"
        className="button-primary-hover flex items-center gap-1.5 rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white"
      >
        <PlusIcon className="h-4 w-4" />
        새 링크
      </Link>
    </header>
  );
}
