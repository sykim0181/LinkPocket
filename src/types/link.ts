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
