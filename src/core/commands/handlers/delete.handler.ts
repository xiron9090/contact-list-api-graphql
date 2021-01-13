import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { DeleteCommand } from '../impl/delete.command';
import { BaseEntity } from '../../entity/base.entity';

@CommandHandler(DeleteCommand)
export class DeleteHandler<T extends BaseEntity> implements ICommandHandler<DeleteCommand> {

  async execute(command: DeleteCommand): Promise<any> {
    return command?.repository ? await command.repository.delete(command.filter) : undefined;
  }
}
