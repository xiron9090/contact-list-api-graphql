import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { UpdateOneCommand } from '../impl/update-one.command';
import { BaseEntity } from '../../entity/base.entity';

@CommandHandler(UpdateOneCommand)
export class UpdateOneHandler<T extends BaseEntity> implements ICommandHandler<UpdateOneCommand> {

  async execute(command: UpdateOneCommand): Promise<T> {
    return command?.repository ? await command.repository.updateOne(
      command.filter,
      command.input,
      command.upsert,
    ) : undefined;
  }
}
