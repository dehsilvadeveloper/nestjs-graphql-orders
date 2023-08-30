export class OrderCannotBeCanceledError extends Error {
    constructor(message: string) {
      super(message);
    }
  }
  