import { Metadata } from "@/types/Metadata";
import parse, { HTMLElement } from "node-html-parser";

export type Fetcher = (url: string) => Promise<Metadata>;

async function fetchHtml(url: string): Promise<HTMLElement> {
  const res = await fetch(url);

  if (!res.ok) {
    console.log(await res.json());
    throw new Error(`Failed to fetch "${url}"`);
  }

  const html = await res.text();
  return parse(html);
}

function findMetaDataFromElement(element: HTMLElement): Metadata {
  const title =
    element
      .querySelector("meta[property='og:title']")
      ?.getAttribute("content") || element.querySelector("title")?.text.trim();

  const description =
    element
      .querySelector("meta[property='og:description']")
      ?.getAttribute("content") ||
    element
      .querySelector("meta[name='description']")
      ?.getAttribute("content") ||
    element
      .querySelector("meta[name='twitter:description']")
      ?.getAttribute("content");

  const image =
    element
      .querySelector("meta[property='og:image']")
      ?.getAttribute("content") ||
    element
      .querySelector("meta[name='twitter:image']")
      ?.getAttribute("content");

  const canonicalUrl =
    element.querySelector("link[rel='canonical']")?.getAttribute("href") ||
    element.querySelector("meta[property='og:url']")?.getAttribute("content");

  const metadata: Metadata = {
    title,
    description,
    image,
    canonicalUrl,
  };

  return metadata;
}

export const defaultFetcher: Fetcher = async (url: string) => {
  const rootElement = await fetchHtml(url);
  return findMetaDataFromElement(rootElement);
};

export const naverBlogFetcher: Fetcher = async (url: string) => {
  const rootElement = await fetchHtml(url);
  const frameElement = rootElement.querySelector("iframe#mainFrame");
  const frameSrc = frameElement?.getAttribute("src");

  if (!frameSrc) {
    return findMetaDataFromElement(rootElement);
  }

  const finalUrl = new URL(frameSrc, url);
  const targetElement = await fetchHtml(finalUrl.toString());
  return findMetaDataFromElement(targetElement);
};

export const youtubeFetcher: Fetcher = async (url: string) => {
  const requestUrl = `https://youtube.com/oembed?url=${url}&format=json`;
  const res = await fetch(requestUrl);

  if (!res.ok) {
    console.log(await res.json());
    throw new Error(`Failed to fetch youtube oEmbed`);
  }

  const json = await res.json();

  return {
    title: json.title,
    image: json.thumbnail_url,
  };
};
