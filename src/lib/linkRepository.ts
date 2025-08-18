"use client";

import { LinkRecord } from "@/types/Link";
import { getDB } from "./idb";

const TABLE_NAME = "links";

export async function addLink(record: LinkRecord) {
  const db = await getDB();
  await db.add(TABLE_NAME, record);
}

export async function updateLink(id: string, record: Partial<LinkRecord>) {
  const db = await getDB();
  const cur = await db.get(TABLE_NAME, id);
  if (!cur) {
    throw new Error(`Link with id ${id} not found`);
  }
  await db.put(TABLE_NAME, { ...cur, ...record }, id);
}

export async function deleteLink(id: string) {
  const db = await getDB();
  await db.delete(TABLE_NAME, id);
}

export async function getLink(id: string): Promise<LinkRecord | undefined> {
  const db = await getDB();
  const record = await db.get(TABLE_NAME, id);
  return record;
}

export async function getAllLinks(): Promise<LinkRecord[]> {
  const db = await getDB();
  const records = await db.getAll(TABLE_NAME);
  return records;
}
