import { OutgoingHttpHeaders } from 'http';

import fetch from './util/fetch';
import getAPIUrl from './util/getAPIUrl';
import AccountInfo from './model/AccountInfo';
import APIOptions from './model/APIOptions';
import APIResponse from './model/APIResponse';

/**
 * A backward compatible ScraperAPI client that provides a few shorthand methods to scrape websites easily.
 */
export default class ScraperAPIClient {
  private readonly apiKey: string;

  public constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Function to retrieve account information.
   *
   * @returns {{
   *  "burst": number; // The number of burst (frequent) requests currently in flight
   *  "concurrencyLimit": number; // The maximum number of concurrent requests allowed
   *  "concurrentRequests": number; // The number of concurrent requests currently in flight
   *  "failedRequestCount": number; // The number of failed requests in the current billing cycle
   *  "requestCount": number; // The total number of requests in the current billing cycle
   *  "requestLimit": number; // The maximum number of requests allowed in the current billing cycle
   *  "subscriptionDate": Date; // The start date of the current billing cycle
   * }}
   */
  public async account(): Promise<AccountInfo> {
    const { body: accountResponse } = await fetch('account', { api_key: this.apiKey }, 'GET');
    const parsedAccountResponse = JSON.parse(accountResponse) as AccountInfo & { subscriptionDate: string };

    return {
      ...parsedAccountResponse,
      subscriptionDate: new Date(parsedAccountResponse.subscriptionDate)
    };
  }

  /**
   * Shorthand function to send a GET request to the API and fetch the provided URL.
   *
   * @param url The target URL to fetch though the API, e.g. https://example.com
   * @param options The API options to use for this request (e.g. render, country_code, etc.)
   * @param headers The headers to be passed to the API (optional)
   * @returns APIResponse
   */
  public async get(url: string, options?: APIOptions, headers?: OutgoingHttpHeaders): Promise<APIResponse> {
    return fetch('/', {
      ...options,
      api_key: this.apiKey,
      url
    }, 'GET', headers);
  }

  /**
   * Shorthand function to send a POST request to the API and fetch the provided URL.
   *
   * @param url The target URL to fetch though the API, e.g. https://example.com
   * @param options The API options to use for this request (e.g. render, country_code, etc.)
   * @param headers The headers to be passed to the API (optional)
   * @param body The body to be passed to the API (optional)
   * @returns APIResponse
   */
  public async post(url: string, options?: APIOptions, headers?: OutgoingHttpHeaders, body?: string): Promise<APIResponse> {
    return fetch('/', {
      ...options,
      api_key: this.apiKey,
      url
    }, 'POST', headers, body);
  }

  /**
   * Shorthand function to send a PUT request to the API and fetch the provided URL.
   *
   * @param url The target URL to fetch though the API, e.g. https://example.com
   * @param options The API options to use for this request (e.g. render, country_code, etc.)
   * @param headers The headers to be passed to the API (optional)
   * @param body The body to be passed to the API (optional)
   * @returns APIResponse
   */
  public async put(url: string, options?: APIOptions, headers?: OutgoingHttpHeaders, body?: string): Promise<APIResponse> {
    return fetch('/', {
      ...options,
      api_key: this.apiKey,
      url
    }, 'PUT', headers, body);
  }
}
