import NewLinkForm from "@/components/new-link-form";
import { folders } from "@/lib/mock-data";

export default function NewLinkPage() {
  return <NewLinkForm folders={folders} />;
}
