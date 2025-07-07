import { DocumentBuilder } from '@nestjs/swagger';

const swaggerConfig = new DocumentBuilder()
  .setTitle('E-commerce Platform')
  .setDescription("This is a documentation for the API of Codigo Total's E-commerce Platform")
  .setVersion(process.env.VERSION as string)
  .addBearerAuth()
  .build();

export default swaggerConfig;
