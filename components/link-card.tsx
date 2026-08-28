import { EllipsisIcon, LinkIcon } from "@/components/icons";
import type { LinkItem } from "@/lib/mock-data";

interface LinkCardProps {
  link: LinkItem;
}

export default function LinkCard({ link }: LinkCardProps) {
  const hostname = new URL(link.url).hostname;

  return (
    <article className="card-hover group flex flex-col overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
      <div
        className={`flex h-32 items-center justify-center bg-gradient-to-br ${link.thumbnailGradient}`}
      >
        <LinkIcon className="h-8 w-8 text-white/80" />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 text-sm font-semibold text-[var(--text)]">
            {link.title}
          </h3>
          <button
            type="button"
            aria-label="더보기"
            className="icon-button-hover shrink-0 rounded p-1 text-[var(--text-sub)] opacity-0 group-hover:opacity-100"
          >
            <EllipsisIcon className="h-4 w-4" />
          </button>
        </div>
        <p className="line-clamp-2 text-xs text-[var(--text-sub)]">
          {link.description}
        </p>
        <span className="mt-2 truncate text-xs text-[var(--placeholder)]">
          {hostname}
        </span>
      </div>
    </article>
  );
}
