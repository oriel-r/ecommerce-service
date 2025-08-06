import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { PerformanceLoggerInterceptor } from './common/interceptors/performance/performance.interceptor';
import { ResponseInterceptor } from './common/interceptors/response/response.interceptor';
import { SwaggerModule } from '@nestjs/swagger';
import swaggerConfig from './config/api-docs';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { appDataSource } from './database/data-source';

async function bootstrap() {
  await appDataSource.initialize();
  await appDataSource.runMigrations();
  
  const app = await NestFactory.create(AppModule, {
    bodyParser: true
  });



  app.useGlobalInterceptors(
    new PerformanceLoggerInterceptor(),
    new ResponseInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  )

  if(process.env.ENVIRONMENT !== 'PRODUCTION') {
    const documentation = () => SwaggerModule.createDocument(app, swaggerConfig)
    SwaggerModule.setup('docs', app,documentation)
  }

  app.enableCors()

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
