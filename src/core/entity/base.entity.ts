import { FilterableField } from '@nestjs-query/query-graphql';
import { GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SchemaConstants } from 'src/shared/constants/schema.constans';

@ObjectType()
@Schema(SchemaConstants)
export class BaseEntity extends Document {
  @FilterableField(() => ID)
  readonly id: string;
  @FilterableField(() => GraphQLISODateTime)
  readonly createdAt: Date;

  @FilterableField(() => GraphQLISODateTime)
  readonly updateAt: Date;
}
