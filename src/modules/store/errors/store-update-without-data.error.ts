export class StoreUpdateWithoutDataError extends Error {
  constructor(id: number) {
    super(`No data was provided to update the store #${id}`);
  }
}
