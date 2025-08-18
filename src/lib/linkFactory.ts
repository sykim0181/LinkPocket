import { LinkRecord } from "@/types/link";
import { Metadata } from "@/types/Metadata";

function generateId(): string {
  return crypto.randomUUID();
}

export function createLinkRecord(
  url: string,
  metadata: Metadata,
  memo?: string,
  id = generateId(),
  createdAt = Date.now()
): LinkRecord {
  return {
    id,
    url,
    title: metadata.title,
    description: metadata.description,
    image: metadata.image,
    canonicalUrl: metadata.canonicalUrl,
    memo,
    createdAt: new Date(createdAt),
  };
}
