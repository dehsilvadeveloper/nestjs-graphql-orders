export class StoreCannotBeDeletedError extends Error {
  constructor(message: string) {
    super(message);
  }
}
