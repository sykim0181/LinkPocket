import { DBSchema, openDB } from "idb";

export interface LinkRecord {
  id: string;
  url: string;
  title?: string;
  description?: string;
  image?: string;
  canonicalUrl?: string;
  memo?: string;
  createdAt: Date;
}

interface LinkPocketDB extends DBSchema {
  links: {
    key: string;
    value: LinkRecord;
    indexes: { createdAt: Date };
  };
}

export const dbp = openDB<LinkPocketDB>("link-pocket", undefined, {
  upgrade(db) {
    const linkStore = db.createObjectStore("links", { keyPath: "id" });
    linkStore.createIndex("createdAt", "createdAt");
  },
});
