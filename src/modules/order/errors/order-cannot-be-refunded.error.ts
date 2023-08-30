export class OrderCannotBeRefundedError extends Error {
  constructor(message: string) {
    super(message);
  }
}
