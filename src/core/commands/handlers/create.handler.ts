import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { CreateCommand } from '../impl/create.command';
import { BaseEntity } from '../../entity/base.entity';

@CommandHandler(CreateCommand)
export class CreateHandler<T extends BaseEntity> implements ICommandHandler<CreateCommand> {

  async execute(command: CreateCommand): Promise<T> {
    return  command?.repository ? await command.repository.create(command.input)  : undefined;
  }
}
