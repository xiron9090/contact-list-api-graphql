import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './app-config/app-config.module';
import { DatabseModule } from './databse/databse.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    AppConfigModule,
    DatabseModule,
    //    GraphQLModule.forRoot({
    //     autoSchemaFile: 'src/scheme.gql',
    //    debug: true,
    //   playground: true,
    //}),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
