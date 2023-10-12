import { IncomingHttpHeaders } from "http";

export default interface APIResponse {
  body: string;
  headers: IncomingHttpHeaders;
  statusCode: number;
}
