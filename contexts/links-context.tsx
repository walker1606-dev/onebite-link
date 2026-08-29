"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { links as initialLinks, type LinkItem } from "@/lib/mock-data";

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
  addLink: (input: NewLinkInput) => void;
  deleteLink: (linkId: string) => void;
  updateLink: (linkId: string, input: LinkUpdateInput) => void;
}

const LinksContext = createContext<LinksContextValue | null>(null);

export function LinksProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>(initialLinks);

  function addLink(input: NewLinkInput) {
    const newLink: LinkItem = {
      id: `link-${Date.now()}`,
      title: input.title,
      url: input.url,
      description: input.description,
      thumbnailGradient: pickGradient(input.url),
      thumbnailUrl: input.imageUrl,
      folderId: input.folderId,
    };
    setLinks((prev) => [newLink, ...prev]);
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
      value={{ links, addLink, deleteLink, updateLink }}
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
