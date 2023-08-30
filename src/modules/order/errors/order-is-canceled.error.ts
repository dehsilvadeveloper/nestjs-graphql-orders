export class OrderIsCanceledError extends Error {
  constructor(message: string) {
    super(message);
  }
}
