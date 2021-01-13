import { Resolver } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { BaseEntity } from '../entity/base.entity';
import { BaseService } from '../service/base.service';
import { FilterQueryBuilder } from '../service/filter/filter-query.builder';
import { ApolloError } from 'apollo-server-express';
import { IResultError } from '../interfaces/IResultError';

@Resolver()
export default class BaseResolver<T extends BaseEntity> {
  public pubsub: any;
  readonly filterQueryBuilder: FilterQueryBuilder<T> = new FilterQueryBuilder<T>();
  constructor(private service: BaseService<T>) {
    this.pubsub = new PubSub();
  }

  protected handleErrors(resultError: IResultError): void {
    const error = new ApolloError(resultError.message, resultError.name);
    Object.defineProperty(error, 'name', { value: resultError.name });
    throw error;
  }
}
