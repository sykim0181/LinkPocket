import { NextResponse } from "next/server";
import { Matcher, naverBlogMatcher, youtubeMatcher } from "./matchers";
import {
  defaultFetcher,
  Fetcher,
  naverBlogFetcher,
  youtubeFetcher,
} from "./fetchers";

type MetadataFetcher = {
  matcher: Matcher;
  fetcher: Fetcher;
};

const fetchers: MetadataFetcher[] = [
  { matcher: naverBlogMatcher, fetcher: naverBlogFetcher },
  { matcher: youtubeMatcher, fetcher: youtubeFetcher },
  { matcher: () => true, fetcher: defaultFetcher },
];

export async function POST(req: Request) {
  const { url } = await req.json();

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    // 페이지의 메타데이터 가져오기
    const metadata = await getMetadata(url);
    if (!metadata.canonicalUrl) {
      metadata.canonicalUrl = url;
    }

    return NextResponse.json({ metadata }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

async function getMetadata(url: string) {
  for (const { matcher, fetcher } of fetchers) {
    if (!matcher(url)) {
      continue;
    }
    return await fetcher(url);
  }
  return await defaultFetcher(url);
}
