import ScraperAPIClient from './ScraperAPIClient';

export default function initSDK(apiKey: string): ScraperAPIClient {
  return new ScraperAPIClient(apiKey);
}
