import { NestFactory } from '@nestjs/core';
import { AppConfigService } from './app-config/service/app-config.serice';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig: AppConfigService = app.get('AppConfigService');
  await app.listen(appConfig.port);
}
bootstrap();
