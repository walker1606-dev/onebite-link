"use client";

import LinkGrid from "@/components/link-grid";
import { useLinks } from "@/contexts/links-context";

export default function Home() {
  const { links } = useLinks();
  return <LinkGrid links={links} />;
}
