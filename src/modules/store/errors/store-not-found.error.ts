export class StoreNotFoundError extends Error {
  constructor(id: number) {
    super(`The store #${id} was not found`);
  }
}
