import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ClassType } from 'type-graphql';
import { BaseEntity } from '../entity/base.entity';
import { IPaginatedData } from '../interfaces/IPaginatedData';

export default function PaginatedData<T extends BaseEntity>(
  Type: ClassType<T>,
): any {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedDataClass implements IPaginatedData<T> {
    @Field((type) => [Type]) items: T[];
    @Field((type) => Int) total: number;
    @Field((type) => Int) pages: number;
    @Field((type) => Int) currentPage: number;
  }
  return PaginatedDataClass;
}
