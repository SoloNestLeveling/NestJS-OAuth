import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Get()
  async search(
    @Query('query') query: string
  ) {
    return this.userService.search(query)
  }
}
