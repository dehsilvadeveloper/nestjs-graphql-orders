export class OrderCannotBeDeletedError extends Error {
  constructor(message: string) {
    super(message);
  }
}
