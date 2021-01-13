import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { AppConfigService } from './service/app-config.serice';
import appConfig from './app.config';
import databaseConfig from './database.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
      validationSchema: Joi.object({
        APP_NAME: Joi.string().default('Contact List'),
        APP_ENV: Joi.string().valid('development', 'production', 'test'),

        APP_PORT: Joi.number().default(4000),
        DB_SERVER: Joi.string().default('localhost'),
        DB_PORT: Joi.number().default(27017),
        DB_DATABASE: Joi.string().default('contact-list'),
      }),
      validationOptions: { abortEary: true },
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
