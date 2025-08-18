"use client";

import { LinkRecord } from "@/types/link";
import { DBSchema, openDB } from "idb";

interface LinkPocketDB extends DBSchema {
  links: {
    key: string;
    value: LinkRecord;
    indexes: { createdAt: Date };
  };
}

export async function getDB() {
  return openDB<LinkPocketDB>("link-pocket", undefined, {
    upgrade(db) {
      const linkStore = db.createObjectStore("links", { keyPath: "id" });
      linkStore.createIndex("createdAt", "createdAt");
    },
  });
}
