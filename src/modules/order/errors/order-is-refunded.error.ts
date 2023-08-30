export class OrderIsRefundedError extends Error {
  constructor(message: string) {
    super(message);
  }
}
