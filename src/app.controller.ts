import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/list/:page')
  getList(@Param('page') page: number): any {
    return this.appService.getListOfHeroes(page);
  }

  @Get('/hero/:id')
  getHero(@Param('id') id: number): any {
    return this.appService.getHero(id);
  }
}
