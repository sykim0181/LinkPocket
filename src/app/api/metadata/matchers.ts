export type Matcher = (url: string) => boolean;

export const naverBlogMatcher: Matcher = (url: string) =>
  /(^|\.)blog\.naver\.com$/i.test(new URL(url).hostname);

export const youtubeMatcher: Matcher = (url: string) => {
  const hostname = new URL(url).hostname;
  return (
    /(^|\.)youtube\.com$/i.test(hostname) || /(^|\.)youtu\.be$/i.test(hostname)
  );
};
