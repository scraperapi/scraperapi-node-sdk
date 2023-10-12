import { IncomingHttpHeaders } from 'http';

import getHeaderValue from "./getHeaderValue";

const DEFAULT_ENCODING = 'utf8';

/**
 * A function to determine the content charset from the response headers.
 */
export default function getContentCharset(headers: IncomingHttpHeaders): string {
  const contentType = getHeaderValue(headers, 'content-type');

  if (typeof contentType !== 'string') {
    return DEFAULT_ENCODING;
  }

  const contentTypeParts = contentType.split(';').map(part => part.trim());
  const charsetPart = contentTypeParts.find(part => part.toLowerCase().startsWith('charset='));
  return charsetPart?.split('=')[ 1 ]?.trim() ?? DEFAULT_ENCODING;
}
