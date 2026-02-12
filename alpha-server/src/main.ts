import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const config = new DocumentBuilder()
    .setTitle('Alpha API') // Set the title of your API
    .setDescription('API documentation for Alpha project') // Set the description of your API
    .setVersion('1.0')
    // .addTag('your-tag') // Optional: organize endpoints by tags
    .addBearerAuth() // Optional: if using bearer token authentication
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // 'api-docs' is the path to access the UI


    app.useGlobalPipes(new ValidationPipe()); // adding dto validation at global level

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
