import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { IPaginatedData } from 'src/core/interfaces/IPaginatedData';
import { FindPaginatedQuery } from '../impl/find-paginated.query';
import { BaseEntity } from '../../entity/base.entity';

@QueryHandler(FindPaginatedQuery)
export class FindPaginatedHandler<T extends BaseEntity>
  implements IQueryHandler<FindPaginatedQuery> {
  async execute(query: FindPaginatedQuery): Promise<IPaginatedData<T>> {
    return query?.repository
      ? query.repository.findPaginated(
          query.filter,
          query.paginator,
          query.populate,
          query.select,
          query.sort,
        )
      : undefined;
  }
}
