import { IncomingHttpHeaders } from "http";

/**
 * Returns the value of the requested header in a case insensitive way.
 *
 * @param {Object} headers The headers object.
 * @param {string} headerName The name of the header we need.
 * @returns string | undefined
 */
export default function getHeaderValue(headers: IncomingHttpHeaders, headerName: string): string | string[] | undefined {
  const actualHeaderName = Object.keys(headers).find(key => key.toLowerCase() === headerName.toLowerCase());

  if (actualHeaderName === undefined) {
    return undefined;
  }

  return headers[ actualHeaderName ];
}
