import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // 詳細なエラーを無効化する
      // https://docs.nestjs.com/techniques/validation#disable-detailed-errors
      disableErrorMessages: true,
    }),
  );
  await app.listen(8080);
}

bootstrap();
