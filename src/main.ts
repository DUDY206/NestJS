import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    //return object dto with extractly declared properties in class dto
    whitelist: true,
    
    //forbiden request when it has properties not declared in class dtio
    forbidNonWhitelisted: true,

    //transform request object to DTO object
    transform: true,
  }));
  await app.listen(3000);
}
bootstrap();
