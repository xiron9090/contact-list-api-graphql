import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FilterQuery } from '../impl/filter.query';
import { BaseEntity } from '../../entity/base.entity';

@QueryHandler(FilterQuery)
export class CountHandler<T extends BaseEntity>
  implements IQueryHandler<FilterQuery> {
  async execute(query: FilterQuery): Promise<number> {
    return query?.repository
      ? await query.repository.count(query.filter)
      : undefined;
  }
}
