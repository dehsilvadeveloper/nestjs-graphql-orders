export class OrderUpdateWithoutDataError extends Error {
    constructor(id: number) {
      super(`No data was provided to update the order #${id}`);
    }
  }
  