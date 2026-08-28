import LinkCard from "@/components/link-card";
import type { LinkItem } from "@/lib/mock-data";

interface LinkGridProps {
  links: LinkItem[];
}

export default function LinkGrid({ links }: LinkGridProps) {
  if (links.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-[var(--text-sub)]">
        저장된 링크가 없습니다.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {links.map((link) => (
        <LinkCard key={link.id} link={link} />
      ))}
    </div>
  );
}
