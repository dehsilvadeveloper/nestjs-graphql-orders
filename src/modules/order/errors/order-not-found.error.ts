export class OrderNotFoundError extends Error {
  constructor(id: number) {
    super(`The order #${id} was not found`);
  }
}
