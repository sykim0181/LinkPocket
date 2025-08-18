import { Metadata } from "@/types/Metadata";
import { NextResponse } from "next/server";
import parse from "node-html-parser";

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

    const title = rootElement
      .querySelector("meta[property='og:title']")
      ?.getAttribute("content");
    const description = rootElement
      .querySelector("meta[property='og:description']")
      ?.getAttribute("content");
    const image = rootElement
      .querySelector("meta[property='og:image']")
      ?.getAttribute("content");

    let canonicalUrl = rootElement
      .querySelector("link[rel='canonical']")
      ?.getAttribute("href");
    if (!canonicalUrl) {
      const ogUrl = rootElement
        .querySelector("meta[property='og:url']")
        ?.getAttribute("content");
      canonicalUrl = ogUrl || res.url;
    }

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
