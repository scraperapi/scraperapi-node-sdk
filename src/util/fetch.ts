import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import https from 'https';

import getContentCharset from './getContentCharset';
import getHeaderValue from './getHeaderValue';
import APIOptions from '../model/APIOptions';

export default function fetch(
  apiPath: string,
  apiOptions: APIOptions,
  method: 'GET' | 'POST' | 'PUT',
  headers?: OutgoingHttpHeaders,
  body?: string
): Promise<{
  body: string;
  headers: IncomingHttpHeaders;
  statusCode: number;
}> {
  /**
   * To ensure a safe URL encoding, we always need to place the url parameter at the very end (if exists).
   *
   * Body and headers are also a special options, that are here for backward compatibility, and we need to extract them and use them
   * as post/put body and request headers, if provided.
   */
  const { body: optionsBody, headers: optionsHeaders, url, ...options } = apiOptions;
  const bodyToUse = optionsBody ?? body;
  const headersToUse = typeof optionsHeaders === 'object' ? optionsHeaders : headers;

  /**
   * Set some default or calculated options.
   */
  options.scaper_sdk = 'node2';

  if (headersToUse !== undefined) {
    options.keep_headers = true;
  }


  let paramString = Object.entries(options).map(([ key, value ]) => `${key}=${encodeURIComponent((value ?? ''))}`).join('&');

  if (url !== undefined) {
    paramString = `${paramString}&url=${encodeURIComponent(url.trim())}`;
  }

  const apiUrl = `https://api.scraperapi.com${apiPath.startsWith('/') ? '' : '/'}${apiPath}?${paramString}`;

  return new Promise((resolve, reject) => {
    const request = https.request(apiUrl, {
      headers: headersToUse,
      method: method ?? 'GET'
    }, response => {
      const { headers: responseHeaders, statusCode } = response;
      const responseLengthHeader = getHeaderValue(responseHeaders, 'content-length');
      const responseLength = parseInt(typeof responseLengthHeader === 'string' ? responseLengthHeader : '0', 10)
      const responseBody = Buffer.alloc(responseLength);
      const charset = getContentCharset(responseHeaders) as BufferEncoding;

      response.on('data', (data: Buffer | string) => {
        if (typeof data === 'string') {
          responseBody.write(data);
        } else {
          responseBody.write(data.toString(charset));
        }
      });

      response.on('end', () => {
        resolve({
          body: responseBody.toString(charset),
          headers: responseHeaders,
          statusCode: statusCode!
        });
      });
    });

    request.on('error', error => {
      reject(error);
    });


    if (['POST', 'PUT'].includes(method) && bodyToUse !== undefined) {
      request.write(bodyToUse);
    }

    request.end();
  });
}