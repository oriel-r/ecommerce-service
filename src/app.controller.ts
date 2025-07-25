import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiWrappedResponse } from './common/decorators/api-wrapped-response/api-wrapped-response.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
