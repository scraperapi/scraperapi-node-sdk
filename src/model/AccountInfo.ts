export default interface AccountInfo {
  burst: number;
  concurrencyLimit: number;
  concurrentRequests: number;
  failedRequestCount: number;
  requestCount: number;
  requestLimit: number;
  subscriptionDate: Date;
}
