import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer, ValidationError } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';
import { ValidationErrorsFormat } from './common/validation-formatter';
import { AllExceptionsFilter } from './common/exceptions-filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));

  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('Products Platform API Doc')
    .setDescription('The Products API description')
    .setVersion('1.0')
    .addTag('products platform')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);

  // binding ValidationPipe at the application level,
  //thus ensuring all endpoints are protected from receiving incorrect data.
  // finally will return a formatted error message
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) =>
        ValidationErrorsFormat(errors),
    }),
  );
  await app.listen(3000);
}
bootstrap();
