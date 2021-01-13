import { Field, InputType, Int } from '@nestjs/graphql';
import { IPaginatorParams } from '../interfaces/IPaginatorParams';

@InputType()
export class PaginatorParams implements IPaginatorParams {
  @Field(type => Int) page?: number;
  @Field(type => Int) limit?: number;
}
