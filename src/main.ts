import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PerformanceLoggerInterceptor } from './common/interceptors/performance/performance.interceptor';
import { ResponseInterceptor } from './common/interceptors/response/response.interceptor';
import { SwaggerModule } from '@nestjs/swagger';
import swaggerConfig from './config/api-docs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(
    new PerformanceLoggerInterceptor(),
    new ResponseInterceptor()
  )

  if(process.env.ENVIRONMENT !== 'PRODUCTION') {
    const documentation = () => SwaggerModule.createDocument(app, swaggerConfig)
    SwaggerModule.setup('docs', app,documentation)
  }

  app.enableCors()

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
