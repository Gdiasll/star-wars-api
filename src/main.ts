import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from './config/config.service';
import validationExceptionFactory from './utils/validation/validation-exception.factory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const CONFIGURACOES: ConfigService = app.get('ConfigService');

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: validationExceptionFactory,
      transform: true,
      whitelist: true,
    })
  )

  const config = new DocumentBuilder()
  .setTitle('Star Wars API')
  .setDescription('API com funcionalidades para tratamento dados do star wars')
  .setVersion('1.0.0')
  .build();
  const document = SwaggerModule.createDocument(app, config);

  if (CONFIGURACOES.get('NODE_ENV') === 'development') {
    SwaggerModule.setup('api', app, document);
  }
  
  await app.listen(CONFIGURACOES.get('SERVER_PORT'));
  Logger.log(`API rodando na porta ${CONFIGURACOES.get('SERVER_PORT')}`)
}
bootstrap();
