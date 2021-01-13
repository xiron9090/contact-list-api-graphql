import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { DeleteOneCommand } from '../impl/delete-one.command';
import { BaseEntity } from '../../entity/base.entity';

@CommandHandler(DeleteOneCommand)
export class DeleteOneHandler<T extends BaseEntity> implements ICommandHandler<DeleteOneCommand> {

  async execute(command: DeleteOneCommand): Promise<T> {
    return command?.repository  ? await command.repository.deleteOne(command.filter): undefined;
  }
}
