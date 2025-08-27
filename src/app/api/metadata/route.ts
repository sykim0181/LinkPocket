import { Metadata } from "@/types/Metadata";
import { NextResponse } from "next/server";
import parse, { HTMLElement } from "node-html-parser";

export async function POST(req: Request) {
  const { url } = await req.json();

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    // 페이지의 메타데이터 가져오기
    const res = await fetch(url);
    const html = await res.text();
    const rootElement = parse(html);

    let targetElement = rootElement;
    targetElement = await preProcess(url, rootElement);

    const title =
      targetElement
        .querySelector("meta[property='og:title']")
        ?.getAttribute("content") ||
      targetElement.querySelector("title")?.text.trim();

    const description =
      targetElement
        .querySelector("meta[property='og:description']")
        ?.getAttribute("content") ||
      targetElement
        .querySelector("meta[name='description']")
        ?.getAttribute("content") ||
      targetElement
        .querySelector("meta[name='twitter:description']")
        ?.getAttribute("content");

    const image =
      targetElement
        .querySelector("meta[property='og:image']")
        ?.getAttribute("content") ||
      targetElement
        .querySelector("meta[name='twitter:image']")
        ?.getAttribute("content");

    const canonicalUrl =
      targetElement
        .querySelector("link[rel='canonical']")
        ?.getAttribute("href") ||
      targetElement
        .querySelector("meta[property='og:url']")
        ?.getAttribute("content") ||
      res.url;

    const metadata: Metadata = {
      title,
      description,
      image,
      canonicalUrl,
    };
    return NextResponse.json({ metadata }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

async function preProcess(url: string, rootElement: HTMLElement) {
  const nurl = new URL(url);

  const isNaverBlog = /(^|\.)blog\.naver\.com$/i.test(nurl.hostname);

  if (isNaverBlog) {
    const src = rootElement
      .querySelector("iframe#mainFrame")
      ?.getAttribute("src");
    if (!src) {
      return rootElement;
    }
    const finalUrl = new URL(src, url);
    const res = await fetch(finalUrl);
    const html = await res.text();
    return parse(html);
  }

  return rootElement;
}
