// src/shared/utils/pagination.util.ts

import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { PaginatedResponse } from '../interceptors/response/response.interceptor';

export interface PaginationOptions {
  page: number;
  limit: number;
}

export async function paginate<T extends ObjectLiteral>(
     queryBuilder:SelectQueryBuilder<T>,
      options: PaginationOptions,
    ): Promise<PaginatedResponse<T>> {
  const { page, limit } = options;

  queryBuilder.skip((page - 1) * limit).take(limit);

  const [items, totalItems] = await queryBuilder.getManyAndCount();

  const itemCount = items.length;
  const totalPages = Math.ceil(totalItems / limit);

  return {
    data: items,
    meta: {
      totalItems,
      itemCount,
      itemsPerPage: limit,
      totalPages,
      currentPage: page,
    },
  };
}