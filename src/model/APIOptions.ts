export default interface APIOptions {
  api_timeout?: number;
  autoparse?: boolean;
  autoscroll?: boolean;
  binary_target?: boolean;
  country_code?: string;
  device_type?: 'desktop' | 'mobile';
  follow_redirect?: boolean;
  force_headers?: boolean;
  keep_headers?: boolean;
  premium?: boolean;
  render?: boolean;
  retry_404?: boolean;
  session_number?: number;
  tld?: string;
  ultra_premium?: boolean;
  url?: string;
  wait_for_selector?: string;
  zip?: string;
  [ restparam: string ]: string | number | boolean | undefined;
}