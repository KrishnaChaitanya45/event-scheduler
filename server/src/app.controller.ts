import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
//? This part is default code and not used in this project ( untouched)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
