import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindQuery } from '../impl/find.query';
import { BaseEntity } from '../../entity/base.entity';

@QueryHandler(FindQuery)
export class FindHandler<T extends BaseEntity>
  implements IQueryHandler<FindQuery> {
  async execute(query: FindQuery): Promise<T[]> {
    return query?.repository ? query.repository.find(query.filter) : undefined;
  }
}
