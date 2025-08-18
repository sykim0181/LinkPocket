import { dbp, LinkRecord } from "./idb";

const TABLE_NAME = "links";

export async function addLink(record: LinkRecord) {
  const db = await dbp;
  await db.add(TABLE_NAME, record);
}

export async function updateLink(id: string, record: Partial<LinkRecord>) {
  const db = await dbp;
  const cur = await db.get(TABLE_NAME, id);
  if (!cur) {
    throw new Error(`Link with id ${id} not found`);
  }
  await db.put(TABLE_NAME, { ...cur, ...record }, id);
}

export async function deleteLink(id: string) {
  const db = await dbp;
  await db.delete(TABLE_NAME, id);
}

export async function getLink(id: string): Promise<LinkRecord | undefined> {
  const db = await dbp;
  const record = await db.get(TABLE_NAME, id);
  return record;
}

export async function getAllLinks(): Promise<LinkRecord[]> {
  const db = await dbp;
  const records = await db.getAll(TABLE_NAME);
  return records;
}
