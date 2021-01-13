import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindOneQuery } from '../impl/findone.query';
import { BaseEntity } from '../../entity/base.entity';

@QueryHandler(FindOneQuery)
export class FindOneHandler<T extends BaseEntity>
  implements IQueryHandler<FindOneQuery> {
  async execute(query: FindOneQuery): Promise<T> {
    return query?.repository
      ? await query?.repository?.findOne(
          query.filter,
          query.populate,
          query.select,
        )
      : undefined;
  }
}
