import { Injectable } from '@nestjs/common';

import { IPaginatedData } from 'src/core/interfaces/IPaginatedData';


import { CommandBus, QueryBus, EventBus } from '@nestjs/cqrs';
import { FindOneQuery } from '../queries/impl/findone.query';
import { CreateCommand } from '../commands/impl/create.command';
import { FindQuery } from '../queries/impl/find.query';
import { UpdateCommand } from '../commands/impl/update.command';
import { UpdateOneCommand } from '../commands/impl/update-one.command';
import { BaseEvent } from '../events/impl/base.event';
import { FindPaginatedQuery } from '../queries/impl/find-paginated.query';
import { DeleteCommand } from '../commands/impl/delete.command';
import { DeleteOneCommand } from '../commands/impl/delete-one.command';
import { BaseEntity } from '../entity/base.entity';
import { BaseRepository } from '../repository/base.repository';
import { FilterQuery } from '../queries/impl/filter.query';

@Injectable()
export class BaseService<T extends BaseEntity> {
  public repository: BaseRepository<T>;

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) {
  }

  getCommandBus(): CommandBus {
    return this.commandBus;
  }

  getQueryBus(): QueryBus {
    return this.queryBus;
  }

  publish(event: BaseEvent) {
    this.eventBus.publish(event);
  }

  async findQuery(findQuery: FindQuery): Promise<T[]> {
    findQuery.repository = this.repository;
    return await this.queryBus.execute(findQuery);
  }

  async findPaginatedQuery(
    findPaginatedQuery: FindPaginatedQuery,
  ): Promise<IPaginatedData<T>> {
    findPaginatedQuery.repository = this.repository;
    return await this.queryBus.execute(findPaginatedQuery);
  }

  async findOneQuery(findOneQuery: FindOneQuery): Promise<T> {
    findOneQuery.repository = this.repository;
    return await this.queryBus.execute(findOneQuery);
  }

  async createCommand(createCommand: CreateCommand): Promise<T> {
    createCommand.repository = this.repository;
    return await this.commandBus.execute(createCommand);
  }

  async deleteCommand(deleteCommand: DeleteCommand): Promise<any> {
    deleteCommand.repository = this.repository;
    return await this.commandBus.execute(deleteCommand);
  }

  async deleteOneCommand(
    deleteOneCommand: DeleteOneCommand,
  ): Promise<T | null> {
    deleteOneCommand.repository = this.repository;
    return await this.commandBus.execute(deleteOneCommand);
  }

  async updateOneCommand(updateOneCommand: UpdateOneCommand): Promise<T> {
    updateOneCommand.repository = this.repository;
    return await this.commandBus.execute(updateOneCommand);
  }

  async updateCommand(updateCommand: UpdateCommand): Promise<any> {
    updateCommand.repository = this.repository;
    return await this.commandBus.execute(updateCommand);
  }

  async countQuery(filterQuery: FilterQuery): Promise<number> {
    filterQuery.repository = this.repository;
    return await this.queryBus.execute(filterQuery);
  }
}
