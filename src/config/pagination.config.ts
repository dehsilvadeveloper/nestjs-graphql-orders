import { PaginationConfigProps } from './interfaces/config.interface';

export const paginationConfig = (): PaginationConfigProps => ({
  pageSize: process.env.PAGINATION_DEFAULT_PAGE_SIZE ? parseInt(process.env.PAGINATION_DEFAULT_PAGE_SIZE) : 25,
});
