"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createClient } from "@/utils/supabase/client";
import type { LinkItem } from "@/lib/mock-data";

const THUMBNAIL_GRADIENTS = [
  "from-zinc-800 to-zinc-600",
  "from-sky-500 to-cyan-400",
  "from-pink-500 to-rose-400",
  "from-purple-500 to-indigo-400",
  "from-orange-400 to-amber-300",
  "from-emerald-500 to-teal-400",
  "from-blue-500 to-indigo-400",
];

function pickGradient(seed: string): string {
  const sum = seed
    .split("")
    .reduce((total, char) => total + char.charCodeAt(0), 0);
  return THUMBNAIL_GRADIENTS[sum % THUMBNAIL_GRADIENTS.length];
}

export interface NewLinkInput {
  url: string;
  folderId: string;
  title: string;
  description: string;
  imageUrl: string | null;
}

export interface LinkUpdateInput {
  folderId: string;
  title: string;
  description: string;
}

interface LinksContextValue {
  links: LinkItem[];
  isAddingLink: boolean;
  addLink: (input: NewLinkInput) => Promise<void>;
  deleteLink: (linkId: string) => void;
  updateLink: (linkId: string, input: LinkUpdateInput) => void;
}

const LinksContext = createContext<LinksContextValue | null>(null);

interface LinkRow {
  id: number;
  title: string | null;
  url: string;
  description: string | null;
  thumbnail_url: string | null;
  folder_id: number | null;
}

function toLinkItem(row: LinkRow): LinkItem {
  return {
    id: String(row.id),
    title: row.title ?? row.url,
    url: row.url,
    description: row.description ?? "",
    thumbnailGradient: pickGradient(row.url),
    thumbnailUrl: row.thumbnail_url,
    folderId: row.folder_id !== null ? String(row.folder_id) : "",
  };
}

export function LinksProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [isAddingLink, setIsAddingLink] = useState(false);
  const isAddingRef = useRef(false);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("links")
      .select("id, title, url, description, thumbnail_url, folder_id")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (!data) return;
        setLinks(data.map(toLinkItem));
      });
  }, []);

  async function addLink(input: NewLinkInput) {
    if (isAddingRef.current) return;
    isAddingRef.current = true;
    setIsAddingLink(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("links")
        .insert({
          url: input.url,
          title: input.title,
          description: input.description,
          thumbnail_url: input.imageUrl,
          folder_id: input.folderId ? Number(input.folderId) : null,
        })
        .select("id, title, url, description, thumbnail_url, folder_id")
        .single();
      if (error || !data) return;
      setLinks((prev) => [toLinkItem(data), ...prev]);
    } finally {
      isAddingRef.current = false;
      setIsAddingLink(false);
    }
  }

  function deleteLink(linkId: string) {
    setLinks((prev) => prev.filter((link) => link.id !== linkId));
  }

  function updateLink(linkId: string, input: LinkUpdateInput) {
    setLinks((prev) =>
      prev.map((link) => (link.id === linkId ? { ...link, ...input } : link))
    );
  }

  return (
    <LinksContext.Provider
      value={{ links, isAddingLink, addLink, deleteLink, updateLink }}
    >
      {children}
    </LinksContext.Provider>
  );
}

export function useLinks(): LinksContextValue {
  const context = useContext(LinksContext);
  if (!context) {
    throw new Error("useLinks must be used within LinksProvider");
  }
  return context;
}
