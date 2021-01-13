import { Module } from '@nestjs/common';
import mongodbProviders from './providers/mongodb.providers';

@Module({
  providers: [...mongodbProviders],
  exports: [...mongodbProviders],
})
export class DatabseModule {}
