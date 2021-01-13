import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { AggregateCommand } from '../impl/aggregate.command';
import { BaseEntity } from '../../entity/base.entity';

@CommandHandler(AggregateCommand)
export class CreateHandler<T extends BaseEntity> implements ICommandHandler<AggregateCommand> {


  async execute(command: AggregateCommand): Promise<T> {
    return command?.repository ? await command.repository.aggregate(command.pipe) : undefined;
  }
}
