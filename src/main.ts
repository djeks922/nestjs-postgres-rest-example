import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidateInputPipe } from './pipes/validate.pipe';
import { ConfigService } from '@nestjs/config';
import { config } from 'aws-sdk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1')
  app.useGlobalPipes(new ValidateInputPipe());
  const configService = app.get(ConfigService)
  config.update({
    accessKeyId: configService.get('S3_KEY'),
    secretAccessKey: configService.get('S3_SECRET'),
    region: configService.get('S3_REGION'),
  })
  await app.listen(3000);
}
bootstrap();
