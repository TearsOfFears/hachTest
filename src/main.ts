import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ClassSerializerInterceptor,
  ImATeapotException,
  ValidationPipe,
} from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(process.env.API_PREFIX);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      whitelist: true,
      forbidUnknownValues: true,
    }),
  );
  app.use(cookieParser());
  const enableCORS = app.get(ConfigService).get<string>('NODE_ENV') === 'prod';
  const whiteList = ['http://localhost:3000', 'http://localhost:4173'];
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }
      if (enableCORS && whiteList.includes(origin)) {
        callback(null, true);
      } else if (!enableCORS) {
        callback(null, true);
      } else {
        console.log('blocked cors for:', origin);
        callback(new ImATeapotException('Not allowed by CORS'), false);
      }
    },
    credentials: true,
  });
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
