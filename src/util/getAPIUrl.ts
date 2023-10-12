import APIOptions from "../model/APIOptions";

export default function getAPIUrl(path: string, parameters: APIOptions): string {
  /**
   * To ensure a safe URL encoding, we always need to place the url parameter at the very end (if exists).
   */
  const { url, ...rest } = parameters;
  let paramString = Object.entries({
    ...rest,
    scraper_sdk: 'node2'
  }).map(([ key, value ]) => `${key}=${encodeURIComponent((value ?? ''))}`).join('&');

  if (url !== undefined) {
    paramString = `${paramString}&url=${encodeURIComponent(url.trim())}`;
  }

  return `https://api.scraperapi.com${path.startsWith('/') ? '' : '/'}${path}?${paramString}`;
}